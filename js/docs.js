import {
  loadGame, loadGames, fetchHtml, escapeHtml, gameUrl, docsUrl,
  docFileUrl, docPages, fixRelativeUrls, PAGE_STATUSES
} from './core.js';
import { initLayout, showPageError } from './layout.js';

const STATUS_NOTICES = {
  'pendiente': 'Esta página todavía no se ha redactado. Lo que ves es la plantilla con los apartados previstos.',
  'borrador': 'Esta página es un borrador y puede cambiar.'
};

function readParams() {
  const params = new URLSearchParams(globalThis.location.search);
  return { gameId: params.get('game'), pageKey: params.get('page') };
}

function pageStatus(page) {
  return PAGE_STATUSES[page.status] ? page.status : 'pendiente';
}

function renderSidebar(game, current) {
  const phases = game.docs.map(phase => {
    const links = phase.pages.map(page => {
      const active = phase === current.phase && page === current.page;
      return '<li><a href="' + docsUrl(game.id, phase.id, page.id) + '"' +
        (active ? ' class="active" aria-current="page"' : '') + '>' +
        '<span class="doc-dot doc-dot-' + pageStatus(page) + '"></span>' +
        escapeHtml(page.title) + '</a></li>';
    }).join('');

    return '<div class="docs-phase">' +
      '<div class="docs-phase-title">' + escapeHtml(phase.title) +
      (phase.label ? ' <span>' + escapeHtml(phase.label) + '</span>' : '') + '</div>' +
      '<ul>' + links + '</ul></div>';
  }).join('');

  document.getElementById('docs-sidebar').innerHTML =
    '<a class="project-back" href="' + gameUrl(game.id) + '">&larr; ' + escapeHtml(game.title) + '</a>' +
    '<div class="docs-sidebar-title">Documentación</div>' + phases +
    '<div class="docs-legend">' +
    Object.entries(PAGE_STATUSES).map(([status, label]) =>
      '<span><span class="doc-dot doc-dot-' + status + '"></span>' + label + '</span>'
    ).join('') + '</div>';
}

async function renderContent(game, current) {
  const status = pageStatus(current.page);
  const fileUrl = docFileUrl(game, current.phase, current.page);
  const content = document.getElementById('docs-content');

  document.getElementById('docs-breadcrumb').innerHTML =
    escapeHtml(game.title) + ' / ' + escapeHtml(current.phase.title) +
    ' <span class="status-badge">' + PAGE_STATUSES[status] + '</span>';

  const notice = document.getElementById('docs-notice');
  notice.textContent = STATUS_NOTICES[status] || '';
  notice.hidden = !STATUS_NOTICES[status];

  try {
    content.innerHTML = globalThis.marked.parse(await fetchHtml(fileUrl));
    fixRelativeUrls(content, fileUrl);
  } catch (error) {
    console.error(error);
    content.innerHTML = '<h1>' + escapeHtml(current.page.title) + '</h1>' +
      '<p>No se ha encontrado el fichero <code>' + escapeHtml(fileUrl) + '</code>.</p>';
  }
}

function renderPager(game, pages, index) {
  const link = (entry, className, label) => entry
    ? '<a class="docs-pager-link ' + className + '" href="' + docsUrl(game.id, entry.phase.id, entry.page.id) + '">' +
      '<span>' + label + '</span>' + escapeHtml(entry.page.title) + '</a>'
    : '<span></span>';

  document.getElementById('docs-pager').innerHTML =
    link(pages[index - 1], 'prev', 'Anterior') + link(pages[index + 1], 'next', 'Siguiente');
}

async function initPage() {
  const games = await loadGames().catch(() => []);
  await initLayout(games);

  const { gameId, pageKey } = readParams();
  let game;
  try {
    game = await loadGame(gameId);
  } catch (error) {
    console.error(error);
    showPageError('No existe ningún juego con ese identificador.');
    return;
  }

  const pages = docPages(game);
  if (!pages.length) {
    showPageError(game.title + ' todavía no tiene documentación.');
    return;
  }

  const found = pages.findIndex(({ phase, page }) => phase.id + '/' + page.id === pageKey);
  const index = Math.max(found, 0);
  const current = pages[index];

  document.title = current.page.title + ' - ' + game.title + ' - Poza Studios';
  renderSidebar(game, current);
  renderPager(game, pages, index);
  await renderContent(game, current);
}

document.addEventListener('DOMContentLoaded', initPage);
