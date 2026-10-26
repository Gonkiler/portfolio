export function initSlider() {
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

  // Con un unico slide no hay nada que rotar
  if (slides.length === 1) {
    slides[0].classList.add('active');
    slider.classList.add('slider-single');
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
