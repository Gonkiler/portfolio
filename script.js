const SECTION_FILES = [
  { targetId: 'section-nav', file: 'sections/nav.html' },
  { targetId: 'section-slider', file: 'sections/slider.html' },
  { targetId: 'section-featured', file: 'sections/featured.html' },
  { targetId: 'section-stats', file: 'sections/stats.html' },
  { targetId: 'section-about', file: 'sections/about.html' },
  { targetId: 'section-contact', file: 'sections/contact.html' }
];

const PROJECT_FILES = [
  'sections/projects/eclipse-protocol.html',
  'sections/projects/fractured-horizon.html',
  'sections/projects/void-architects.html',
  'sections/projects/ether.html'
];

async function fetchHtml(file) {
  const response = await fetch(file);
  if (!response.ok) {
    throw new Error('No se pudo cargar: ' + file);
  }
  return response.text();
}

async function loadSections() {
  for (const section of SECTION_FILES) {
    const container = document.getElementById(section.targetId);
    if (!container) continue;
    container.innerHTML = await fetchHtml(section.file);
  }
}

async function loadProjectCards() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const cards = await Promise.all(PROJECT_FILES.map(fetchHtml));
  grid.innerHTML = cards.join('\n');
}

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const counter = document.getElementById('counter');
  const progress = document.getElementById('progress');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const slider = document.getElementById('slider');

  if (!slides.length || !dots.length || !counter || !progress || !prevButton || !nextButton || !slider) {
    return;
  }

  let current = 0;
  let timer = null;
  let progTimer = null;
  const DURATION = 5000;
  let progStart = null;

  function startProgress() {
    if (progTimer) cancelAnimationFrame(progTimer);
    progStart = performance.now();
    progress.style.transition = 'none';
    progress.style.width = '0%';
    requestAnimationFrame(animateProgress);
  }

  function animateProgress(now) {
    const elapsed = now - progStart;
    const pct = Math.min((elapsed / DURATION) * 100, 100);
    progress.style.width = pct + '%';
    if (pct < 100) {
      progTimer = requestAnimationFrame(animateProgress);
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DURATION);
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    startProgress();
    resetTimer();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(Number.parseInt(dot.dataset.index, 10)));
  });

  prevButton.addEventListener('click', () => goTo(current - 1));
  nextButton.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  let touchStartX = null;
  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    touchStartX = null;
  });

  goTo(0);
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

function initExternalLinksBehavior() {
  const links = document.querySelectorAll('#slider a[href], #featured a[href]');

  links.forEach(link => {
    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#')) return;

    let parsedUrl;
    try {
      parsedUrl = new URL(rawHref, globalThis.location.href);
    } catch {
      return;
    }

    if (parsedUrl.origin !== globalThis.location.origin) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

function initFeaturedCardNavigation() {
  document.querySelectorAll('.project-card[data-project-url]').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a, button')) {
        return;
      }

      const targetUrl = card.dataset.projectUrl;
      if (targetUrl) {
        globalThis.location.href = targetUrl;
      }
    });
  });
}

async function initPage() {
  try {
    await loadSections();
    await loadProjectCards();
    initExternalLinksBehavior();
    initFeaturedCardNavigation();
    initSlider();
    initNavScrollEffect();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', initPage);
