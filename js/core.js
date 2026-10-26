const GAMES_INDEX = 'data/games.json';
const BLOG_INDEX = 'data/blog.json';
const ID_PATTERN = /^[a-z0-9-]+$/;

export const GAME_STATUSES = {
  'concepto': { label: 'Concepto', upcoming: true },
  'pre-produccion': { label: 'Preproducción', upcoming: true },
  'en-desarrollo': { label: 'En desarrollo', upcoming: true },
  'publicado': { label: 'Publicado', upcoming: false },
  'finalizado': { label: 'Finalizado', upcoming: false },
  'pausado': { label: 'En pausa', upcoming: false }
};

export const PAGE_STATUSES = {
  'pendiente': 'Pendiente',
  'borrador': 'Borrador',
  'completo': 'Completo'
};

async function fetchOk(file) {
  const response = await fetch(file);
  if (!response.ok) {
    throw new Error('No se pudo cargar: ' + file);
  }
  return response;
}

export async function fetchHtml(file) {
  return (await fetchOk(file)).text();
}

export async function fetchJson(file) {
  return (await fetchOk(file)).json();
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function statusLabel(game) {
  return (GAME_STATUSES[game.status] || { label: game.status || '' }).label;
}

export function isUpcoming(game) {
  return Boolean(GAME_STATUSES[game.status]?.upcoming);
}

export function gameUrl(id) {
  return 'game.html?id=' + encodeURIComponent(id);
}

export function docsUrl(id, phaseId, pageId) {
  let url = 'docs.html?game=' + encodeURIComponent(id);
  if (phaseId && pageId) {
    url += '&page=' + encodeURIComponent(phaseId + '/' + pageId);
  }
  return url;
}

export function assetUrl(game, file) {
  return 'games/' + game.id + '/' + file;
}

export function docFileUrl(game, phase, page) {
  return assetUrl(game, page.file || 'docs/' + phase.id + '/' + page.id + '.md');
}

export function docPages(game) {
  return (game.docs || []).flatMap(phase =>
    (phase.pages || []).map(page => ({ phase, page }))
  );
}

export function isWritten(page) {
  return page.status === 'borrador' || page.status === 'completo';
}

export async function loadGame(id) {
  if (!ID_PATTERN.test(id || '')) {
    throw new Error('Identificador de juego no valido: ' + id);
  }
  const game = await fetchJson('games/' + id + '/game.json');
  game.id = id;
  return game;
}

export async function loadGames() {
  const ids = await fetchJson(GAMES_INDEX);
  const results = await Promise.allSettled(ids.map(loadGame));

  return results.flatMap(result => {
    if (result.status === 'fulfilled') return [result.value];
    console.error(result.reason);
    return [];
  });
}

export function postUrl(id) {
  return 'blog.html?post=' + encodeURIComponent(id);
}

export function postFileUrl(post) {
  return 'blog/' + post.id + '.md';
}

// Entradas del Dev Blog, de la mas reciente a la mas antigua
export async function loadPosts() {
  const posts = await fetchJson(BLOG_INDEX);
  return posts
    .filter(post => ID_PATTERN.test(post.id || ''))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Las rutas relativas de un .md se resuelven desde la carpeta de ese .md
export function fixRelativeUrls(container, fileUrl) {
  const base = new URL(fileUrl, globalThis.location.href);

  container.querySelectorAll('img[src]').forEach(image => {
    image.src = new URL(image.getAttribute('src'), base).href;
  });

  container.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) return;
    const url = new URL(href, base);
    link.href = url.href;
    if (url.origin !== globalThis.location.origin) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
}

export function formatDate(isoDate) {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
