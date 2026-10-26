// Fondo animado comun a todas las paginas: reticula triangular tenue y figuras
// geometricas en contorno que flotan, con parallax de scroll y de puntero.
// <body data-background="calm"> lo atenua (p. ej. en el visor de documentacion).

const SHAPES = ['triangle', 'hexagon', 'diamond', 'square', 'circle'];
const PALETTE = [
  { rgb: '143, 178, 230', weight: 0.55 }, // azul claro
  { rgb: '61, 114, 192', weight: 0.3 },   // azul
  { rgb: '245, 246, 247', weight: 0.15 }  // blanco
];
const LATTICE_SPACING = 56;
const MAX_DPR = 2;

function pickColor() {
  let roll = Math.random();
  for (const color of PALETTE) {
    roll -= color.weight;
    if (roll <= 0) return color.rgb;
  }
  return PALETTE[0].rgb;
}

function wrap(value, max) {
  return ((value % max) + max) % max;
}

function tracePolygon(ctx, sides, radius, startAngle) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + (i / sides) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function traceShape(ctx, kind, size) {
  switch (kind) {
    case 'triangle': tracePolygon(ctx, 3, size, -Math.PI / 2); break;
    case 'hexagon': tracePolygon(ctx, 6, size, 0); break;
    case 'diamond': tracePolygon(ctx, 4, size, 0); break;
    case 'square': tracePolygon(ctx, 4, size, Math.PI / 4); break;
    default:
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.85, 0, Math.PI * 2);
  }
}

export function initBackground() {
  if (document.querySelector('.bg-field')) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'bg-field';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intensity = document.body.dataset.background === 'calm' ? 0.55 : 1;

  let width = 0;
  let height = 0;
  let shapes = [];
  let frameId = null;
  let lastTime = 0;
  const pointer = { x: 0, y: 0 };
  const smoothPointer = { x: 0, y: 0 };

  function createShape() {
    const depth = 0.3 + Math.random() * 0.7;
    return {
      kind: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: pickColor(),
      depth,
      size: 8 + depth * 34,
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 4 + depth * 10,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      alpha: (0.1 + depth * 0.22) * intensity,
      inner: Math.random() < 0.25
    };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.max(8, Math.min(28, Math.round((width * height) / 55000)));
    while (shapes.length < target) shapes.push(createShape());
    shapes.length = target;
  }

  function drawLattice(scrollY) {
    // La reticula se desplaza mas despacio que la pagina; las filas se numeran
    // en coordenadas absolutas para que el patron no salte al hacer scroll
    const rowHeight = LATTICE_SPACING * 0.866;
    const offset = scrollY * 0.12;
    const firstRow = Math.floor(offset / rowHeight) - 1;
    const lastRow = firstRow + Math.ceil(height / rowHeight) + 2;
    const cols = Math.ceil(width / LATTICE_SPACING) + 2;

    for (let row = firstRow; row <= lastRow; row++) {
      const y = row * rowHeight - offset;
      const shift = wrap(row, 2) === 0 ? 0 : LATTICE_SPACING / 2;
      for (let col = -1; col < cols; col++) {
        const x = col * LATTICE_SPACING + shift;
        // Cada cierto numero de nodos, una cruz en lugar de un punto
        if (wrap(row * 7 + col * 3, 23) === 0) {
          ctx.strokeStyle = `rgba(143, 178, 230, ${0.16 * intensity})`;
          ctx.beginPath();
          ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y);
          ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(143, 178, 230, ${0.08 * intensity})`;
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }
    }
  }

  function drawShapes(scrollY) {
    const margin = 60;
    const rangeY = height + margin * 2;
    ctx.lineWidth = 1;

    for (const shape of shapes) {
      const x = shape.x + smoothPointer.x * 18 * shape.depth;
      const y = wrap(shape.y - scrollY * 0.25 * shape.depth + smoothPointer.y * 12 * shape.depth + margin, rangeY) - margin;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = `rgba(${shape.color}, ${shape.alpha})`;
      traceShape(ctx, shape.kind, shape.size);
      ctx.stroke();
      if (shape.inner) {
        ctx.strokeStyle = `rgba(${shape.color}, ${shape.alpha * 0.6})`;
        traceShape(ctx, shape.kind, shape.size * 0.55);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const scrollY = window.scrollY;
    drawLattice(scrollY);
    drawShapes(scrollY);
  }

  function update(dt) {
    smoothPointer.x += (pointer.x - smoothPointer.x) * Math.min(1, dt * 2);
    smoothPointer.y += (pointer.y - smoothPointer.y) * Math.min(1, dt * 2);

    for (const shape of shapes) {
      shape.y -= shape.speed * dt;
      shape.rotation += shape.spin * dt;
      if (shape.y < -60) {
        shape.y += height + 120;
        shape.x = Math.random() * width;
      }
    }
  }

  function loop(time) {
    const dt = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    update(dt);
    render();
    frameId = requestAnimationFrame(loop);
  }

  function start() {
    if (frameId !== null || reducedMotion.matches || document.hidden) return;
    lastTime = performance.now();
    frameId = requestAnimationFrame(loop);
  }

  function stop() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
  }

  window.addEventListener('resize', () => {
    resize();
    render();
  });

  window.addEventListener('pointermove', event => {
    pointer.x = (event.clientX / width) * 2 - 1;
    pointer.y = (event.clientY / height) * 2 - 1;
  }, { passive: true });

  // Con movimiento reducido el fondo es estatico, pero acompaña al scroll
  window.addEventListener('scroll', () => {
    if (frameId === null) render();
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) stop();
    else start();
    render();
  });

  resize();
  render();
  start();
}
