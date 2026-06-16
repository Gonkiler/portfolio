// Slider logic
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('counter');
const progress = document.getElementById('progress');
let current = 0;
let timer = null;
let progTimer = null;
const DURATION = 5000;
let progStart = null;

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

dots.forEach(dot => {
  dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
});

document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('next').addEventListener('click', () => goTo(current + 1));

// Keyboard nav
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});

// Touch swipe
let touchStartX = null;
document.getElementById('inicio').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('inicio').addEventListener('touchend', e => {
  if (touchStartX === null) return;
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  touchStartX = null;
});

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 60
    ? 'rgba(12,13,18,0.95)'
    : 'rgba(12,13,18,0.75)';
});

// Init
goTo(0);
