import { fetchHtml, escapeHtml, gameUrl, docsUrl, postUrl, formatDate } from './core.js';
import { initBackground } from './background.js';

const LAYOUT_FILES = [
  { targetId: 'section-nav', file: 'sections/nav.html' },
  { targetId: 'section-contact', file: 'sections/contact.html' }
];

export async function loadSections(sections) {
  for (const section of sections) {
    const container = document.getElementById(section.targetId);
    if (!container) continue;
    container.innerHTML = await fetchHtml(section.file);
  }
}

function initNavScrollEffect() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.style.background = window.scrollY > 60
      ? 'rgba(12,13,18,0.95)'
      : 'rgba(12,13,18,0.75)';
  });
}

function renderFooterGames(games) {
  const gamesList = document.getElementById('footer-games');
  const docsList = document.getElementById('footer-docs');

  if (gamesList) {
    gamesList.innerHTML = games.map(game =>
      '<li><a href="' + gameUrl(game.id) + '">' + escapeHtml(game.title) + '</a></li>'
    ).join('');
  }

  if (docsList) {
    docsList.innerHTML = games.filter(game => game.docs?.length).map(game =>
      '<li><a href="' + docsUrl(game.id) + '">' + escapeHtml(game.title) + '</a></li>'
    ).join('');
  }
}

export async function initLayout(games) {
  initBackground();
  await loadSections(LAYOUT_FILES);
  renderFooterGames(games);
  initNavScrollEffect();
}

// Tarjeta de entrada del Dev Blog, usada en la home y en el listado del blog
export function renderPostCard(post, games = []) {
  const game = games.find(candidate => candidate.id === post.game);
  const gameTag = game ? '<span class="post-game">' + escapeHtml(game.title) + '</span>' : '';

  return '<a class="post-card" href="' + postUrl(post.id) + '">' +
    '<div class="post-meta"><span class="post-tag">' + escapeHtml(post.tag) + '</span>' +
    '<time datetime="' + escapeHtml(post.date) + '">' + formatDate(post.date) + '</time>' + gameTag + '</div>' +
    '<h3 class="post-title">' + escapeHtml(post.title) + '</h3>' +
    '<p class="post-summary">' + escapeHtml(post.summary) + '</p>' +
    '<span class="text-link">Leer entrada</span>' +
    '</a>';
}

export function showPageError(message) {
  const main = document.querySelector('main');
  if (!main) return;
  main.innerHTML =
    '<a class="project-back" href="index.html">&larr; Volver al inicio</a>' +
    '<section class="project-hero"><h1 class="project-title">NO ENCONTRADO</h1>' +
    '<p class="project-summary">' + escapeHtml(message) + '</p></section>';
}
