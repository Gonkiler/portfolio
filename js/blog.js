import {
  loadGames, loadPosts, fetchHtml, escapeHtml, formatDate,
  gameUrl, postUrl, postFileUrl, fixRelativeUrls
} from './core.js';
import { initLayout, renderPostCard, showPageError } from './layout.js';

function readPostId() {
  return new URLSearchParams(globalThis.location.search).get('post');
}

function renderList(root, posts, games) {
  document.title = 'Dev Blog - Poza Studios';

  const cards = posts.length
    ? '<div class="post-grid">' + posts.map(post => renderPostCard(post, games)).join('') + '</div>'
    : '<p class="post-empty">Todavía no hay entradas en el Dev Blog.</p>';

  root.innerHTML =
    '<header class="blog-header">' +
    '<div class="section-label">Diario del estudio</div>' +
    '<h1 class="section-title">DEV BLOG</h1>' +
    '<p class="blog-intro">Novedades, avances de desarrollo y decisiones de diseño de los juegos de Poza Studios.</p>' +
    '</header>' +
    '<section class="paper blog-list">' + cards + '</section>';
}

function pagerLink(post, className, label) {
  if (!post) return '<span></span>';
  return '<a class="post-pager-link ' + className + '" href="' + postUrl(post.id) + '">' +
    '<span>' + label + '</span>' + escapeHtml(post.title) + '</a>';
}

async function renderPost(root, post, posts, games) {
  document.title = post.title + ' - Dev Blog - Poza Studios';

  const index = posts.indexOf(post);
  const game = games.find(candidate => candidate.id === post.game);
  const gameMeta = game ? '<span class="post-game">' + escapeHtml(game.title) + '</span>' : '';
  const gameButton = game
    ? '<a class="btn-primary" href="' + gameUrl(game.id) + '"><span>Ver ' + escapeHtml(game.title) + '</span></a>'
    : '';

  root.innerHTML =
    '<a class="project-back" href="blog.html">&larr; Dev Blog</a>' +
    '<article class="paper post-article">' +
    '<header class="post-header">' +
    '<div class="post-meta"><span class="post-tag">' + escapeHtml(post.tag) + '</span>' +
    '<time datetime="' + escapeHtml(post.date) + '">' + formatDate(post.date) + '</time>' + gameMeta + '</div>' +
    '<h1 class="post-heading">' + escapeHtml(post.title) + '</h1>' +
    '<p class="post-lede">' + escapeHtml(post.summary) + '</p>' +
    '</header>' +
    '<div class="post-body" id="post-body"></div>' +
    (gameButton ? '<div class="post-footer">' + gameButton + '</div>' : '') +
    '</article>' +
    // Las entradas van de la mas reciente a la mas antigua
    '<div class="post-pager">' +
    pagerLink(posts[index + 1], 'prev', 'Entrada anterior') +
    pagerLink(posts[index - 1], 'next', 'Entrada siguiente') +
    '</div>';

  const body = document.getElementById('post-body');
  const fileUrl = postFileUrl(post);
  try {
    body.innerHTML = globalThis.marked.parse(await fetchHtml(fileUrl));
    fixRelativeUrls(body, fileUrl);
  } catch (error) {
    console.error(error);
    body.innerHTML = '<p>No se ha encontrado el fichero <code>' + escapeHtml(fileUrl) + '</code>.</p>';
  }
}

async function initPage() {
  const [games, posts] = await Promise.all([
    loadGames().catch(() => []),
    loadPosts().catch(() => [])
  ]);
  await initLayout(games);

  const root = document.getElementById('blog-root');
  const postId = readPostId();

  if (!postId) {
    renderList(root, posts, games);
    return;
  }

  const post = posts.find(candidate => candidate.id === postId);
  if (!post) {
    showPageError('No existe ninguna entrada con ese identificador.');
    return;
  }
  await renderPost(root, post, posts, games);
}

document.addEventListener('DOMContentLoaded', initPage);
