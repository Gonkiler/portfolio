import {
  loadGames, loadPosts, escapeHtml, statusLabel, isUpcoming,
  gameUrl, assetUrl, docPages, isWritten
} from './core.js';
import { initLayout, loadSections, renderPostCard } from './layout.js';
import { initSlider } from './slider.js';

const SECTION_FILES = [
  { targetId: 'section-slider', file: 'sections/slider.html' },
  { targetId: 'section-games', file: 'sections/games.html' },
  { targetId: 'section-devblog', file: 'sections/devblog.html' },
  { targetId: 'section-stats', file: 'sections/stats.html' },
  { targetId: 'section-about', file: 'sections/about.html' }
];

const SLIDE_BACKGROUNDS = 4;
const HOME_POSTS = 3;

const CARD_FALLBACK =
  '<div class="project-card-bg" style="background: linear-gradient(180deg, #0D1A2E 0%, #2D5DA1 100%);"></div>' +
  '<div class="card-geo"><svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="white" stroke-width="1"/>' +
  '<polygon points="100,40 160,70 160,130 100,160 40,130 40,70" stroke="white" stroke-width="0.5"/>' +
  '<circle cx="100" cy="100" r="30" stroke="white" stroke-width="0.5"/></svg></div>';

// "Eclipse Protocol" -> ECLIPSE<br><em>PROTOCOL</em>
function slideTitle(title) {
  const [first, ...rest] = title.toUpperCase().split(' ');
  if (!rest.length) return escapeHtml(first);
  return escapeHtml(first) + '<br /><em>' + escapeHtml(rest.join(' ')) + '</em>';
}

function renderSlide(game, index) {
  const link = (game.links || [])[0];
  const ghost = link
    ? '<a href="' + escapeHtml(link.url) + '" class="btn-ghost" target="_blank" rel="noopener noreferrer">' + escapeHtml(link.label) + '</a>'
    : '';
  const visual = game.cover
    ? '<div class="slide-visual"><img src="' + escapeHtml(assetUrl(game, game.cover)) + '" alt="" /></div>'
    : '';

  return '<div class="slide slide-' + ((index % SLIDE_BACKGROUNDS) + 1) + '">' +
    '<div class="slide-bg"></div>' +
    '<div class="slide-stripe"></div><div class="slide-accent"></div>' + visual +
    '<div class="slide-content">' +
    '<span class="slide-tag">' + escapeHtml(game.tagline || statusLabel(game)) + '</span>' +
    '<h1 class="slide-title">' + slideTitle(game.title) + '</h1>' +
    '<p class="slide-desc">' + escapeHtml(game.summary) + '</p>' +
    '<div class="slide-actions">' +
    '<a href="' + gameUrl(game.id) + '" class="btn-primary"><span>Ver juego</span></a>' + ghost +
    '</div></div></div>';
}

function renderSlider(games) {
  const slidesContainer = document.getElementById('slides');
  const dotsContainer = document.getElementById('slider-dots');
  if (!slidesContainer || !dotsContainer) return;

  const featured = games.filter(game => game.featured);
  const slides = featured.length ? featured : games.slice(0, 1);

  slidesContainer.outerHTML = slides.map(renderSlide).join('');
  dotsContainer.innerHTML = slides.map((game, index) =>
    '<button class="dot" data-index="' + index + '" aria-label="' + escapeHtml(game.title) + '"></button>'
  ).join('');
}

function renderGameCard(game) {
  const url = gameUrl(game.id);
  const cover = game.cover
    ? '<img class="project-card-image" src="' + escapeHtml(assetUrl(game, game.cover)) + '" alt="' + escapeHtml(game.title) + '" loading="lazy" />' +
      '<div class="project-card-bg"></div>'
    : CARD_FALLBACK;

  return '<div class="project-card" data-project-url="' + url + '">' + cover +
    '<div class="project-card-overlay"></div>' +
    '<span class="status-badge project-card-status">' + escapeHtml(statusLabel(game)) + '</span>' +
    '<div class="project-card-info">' +
    '<div class="project-genre">' + escapeHtml((game.genre || []).join(' · ')) + '</div>' +
    '<div class="project-name">' + escapeHtml(game.title.toUpperCase()) + '</div>' +
    '<p class="project-desc">' + escapeHtml(game.summary) + '</p>' +
    '<a href="' + url + '" class="project-link">Explorar juego</a>' +
    '</div></div>';
}

function renderGames(games) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = games.map(renderGameCard).join('');

  grid.querySelectorAll('.project-card[data-project-url]').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a, button')) return;
      globalThis.location.href = card.dataset.projectUrl;
    });
  });
}

function renderDevBlog(posts, games) {
  const list = document.getElementById('devblog-list');
  if (!list) return;

  list.innerHTML = posts.length
    ? posts.slice(0, HOME_POSTS).map(post => renderPostCard(post, games)).join('')
    : '<p class="post-empty">Todavía no hay entradas en el Dev Blog.</p>';
}

function renderStats(games) {
  const strip = document.getElementById('stats-strip');
  if (!strip) return;

  const pages = games.flatMap(docPages);
  const stats = [
    { value: games.length, label: games.length === 1 ? 'Juego' : 'Juegos' },
    { value: games.filter(isUpcoming).length, label: 'En desarrollo' },
    { value: games.filter(game => ['publicado', 'finalizado'].includes(game.status)).length, label: 'Terminados' },
    { value: pages.filter(({ page }) => isWritten(page)).length, label: 'Páginas documentadas' }
  ];

  strip.innerHTML = stats.map(stat =>
    '<div class="stat-item"><div class="stat-number">' + stat.value + '</div>' +
    '<div class="stat-label">' + stat.label + '</div></div>'
  ).join('');
}

async function initPage() {
  try {
    const [games, posts] = await Promise.all([loadGames(), loadPosts().catch(() => [])]);
    await Promise.all([initLayout(games), loadSections(SECTION_FILES)]);
    renderSlider(games);
    renderGames(games);
    renderDevBlog(posts, games);
    renderStats(games);
    initSlider();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', initPage);
