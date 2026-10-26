import {
  loadGame, loadGames, escapeHtml, statusLabel, docsUrl, isWritten, PAGE_STATUSES
} from './core.js';
import { initLayout, showPageError } from './layout.js';

function readGameId() {
  return new URLSearchParams(globalThis.location.search).get('id');
}

function renderList(targetId, items) {
  const list = document.getElementById(targetId);
  list.innerHTML = (items || []).map(item => '<li>' + escapeHtml(item) + '</li>').join('');
  list.closest('.project-detail-card').hidden = !items?.length;
}

function renderActions(game) {
  const docsButton = game.docs?.length
    ? '<a class="btn-primary" href="' + docsUrl(game.id) + '"><span>Ver documentación</span></a>'
    : '';
  const links = (game.links || []).map(link =>
    '<a class="btn-ghost" href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(link.label) + '</a>'
  ).join('');

  document.getElementById('game-actions').innerHTML = docsButton + links;
}

function renderPhase(game, phase, index) {
  const pages = phase.pages || [];
  const written = pages.filter(isWritten).length;
  const percent = pages.length ? Math.round((written / pages.length) * 100) : 0;

  const items = pages.map(page => {
    const status = PAGE_STATUSES[page.status] ? page.status : 'pendiente';
    return '<li><a href="' + docsUrl(game.id, phase.id, page.id) + '">' +
      '<span class="doc-dot doc-dot-' + status + '" title="' + PAGE_STATUSES[status] + '"></span>' +
      escapeHtml(page.title) + '</a></li>';
  }).join('');

  return '<article class="phase-card">' +
    '<div class="phase-head"><span class="phase-num">' + String(index + 1).padStart(2, '0') + '</span>' +
    '<span class="phase-label">' + escapeHtml(phase.label || '') + '</span></div>' +
    '<h3 class="phase-title">' + escapeHtml(phase.title) + '</h3>' +
    '<p class="phase-desc">' + escapeHtml(phase.description || '') + '</p>' +
    '<div class="phase-progress"><div class="phase-progress-bar" style="width:' + percent + '%"></div></div>' +
    '<div class="phase-count">' + written + ' / ' + pages.length + ' páginas</div>' +
    '<ul class="phase-pages">' + items + '</ul>' +
    '</article>';
}

function renderGame(game) {
  document.title = game.title + ' - Poza Studios';
  document.getElementById('game-kicker').textContent = game.tagline || (game.genre || []).join(' · ');
  document.getElementById('game-status-badge').textContent = statusLabel(game);
  document.getElementById('game-title').textContent = game.title.toUpperCase();
  document.getElementById('game-summary').textContent = game.summary || '';
  document.getElementById('game-overview').textContent = game.overview || game.summary || '';
  document.getElementById('game-status').textContent = game.statusNote || statusLabel(game);

  renderActions(game);
  renderList('game-features', game.features);
  renderList('game-tech', game.tech);

  const docsSection = document.getElementById('game-docs');
  docsSection.hidden = !game.docs?.length;
  document.getElementById('game-phases').innerHTML =
    (game.docs || []).map((phase, index) => renderPhase(game, phase, index)).join('');
}

async function initPage() {
  const games = await loadGames().catch(() => []);
  await initLayout(games);

  try {
    renderGame(await loadGame(readGameId()));
  } catch (error) {
    console.error(error);
    showPageError('No existe ningún juego con ese identificador.');
  }
}

document.addEventListener('DOMContentLoaded', initPage);
