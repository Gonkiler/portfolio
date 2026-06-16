const PROJECT_PAGES = {
  'ether': {
    kicker: 'TFG - Proyecto Final de Grado',
    title: 'ETHER',
    summary: 'Proyecto academico centrado en exploracion, narrativa y diseno de experiencia.',
    ctaText: 'Consultar TFG',
    ctaHref: 'https://oa.upm.es/80460/',
    overview: 'ETHER plantea una experiencia de aventura en un entorno fantastico donde el jugador descubre una historia principal mediante misiones y exploracion guiada.',
    features: [
      'Progresion por hitos narrativos.',
      'Sistema de mision principal y objetivos secundarios.',
      'Focus en inmersion audiovisual y ritmo de juego.'
    ],
    tech: [
      'Unity',
      'C#',
      'Diseno de niveles',
      'Documentacion de TFG'
    ],
    status: 'Finalizado como proyecto de fin de grado.'
  },
  'eclipse-protocol': {
    kicker: 'Nuevo lanzamiento - 2025',
    title: 'ECLIPSE PROTOCOL',
    summary: 'RPG de accion cyberpunk con decisiones que alteran mundo y narrativa.',
    ctaText: 'Ver en portafolio',
    ctaHref: 'index.html#featured',
    overview: 'Un mundo abierto de alta densidad urbana donde las elecciones del jugador influyen en alianzas, recursos y desenlace de la historia.',
    features: [
      'Combate hibrido con sigilo y hacking.',
      'Sistema de reputacion por facciones.',
      'Narrativa ramificada con multiples finales.'
    ],
    tech: [
      'Unreal Engine',
      'AI behavior systems',
      'Open world tooling'
    ],
    status: 'Concepto avanzado y vertical slice en produccion.'
  },
  'fractured-horizon': {
    kicker: 'En desarrollo - Anunciado',
    title: 'FRACTURED HORIZON',
    summary: 'Shooter tactico competitivo con mecanicas de realidad alternativa.',
    ctaText: 'Volver a inicio',
    ctaHref: 'index.html#slider',
    overview: 'Disenado para partidas de alta intensidad y coordinacion en equipo, combinando lectura tactica del mapa y decisiones rapidas.',
    features: [
      'Partidas de hasta 64 jugadores.',
      'Mapas modulares con eventos dinamicos.',
      'Roles especializados por escuadra.'
    ],
    tech: [
      'Netcode dedicado',
      'Matchmaking',
      'Telemetria de gameplay'
    ],
    status: 'Pre-alfa interna.'
  },
  'void-architects': {
    kicker: 'Disponible ahora',
    title: 'VOID ARCHITECTS',
    summary: 'Simulacion estrategica de gestion y expansion galactica.',
    ctaText: 'Ver en portafolio',
    ctaHref: 'index.html#featured',
    overview: 'El jugador administra recursos, investigacion y diplomacia para construir un imperio sostenible en sistemas estelares hostiles.',
    features: [
      'Economia sistemica por colonias.',
      'Politica entre facciones con eventos emergentes.',
      'Escalado de dificultad por eras tecnologicas.'
    ],
    tech: [
      'Simulation systems',
      'Procedural content',
      'Data-driven balancing'
    ],
    status: 'Disponible en acceso anticipado.'
  },
  'deep-resonance': {
    kicker: 'Pre-produccion - 2026',
    title: 'DEEP RESONANCE',
    summary: 'Aventura de misterio submarino con enfoque narrativo y sonoro.',
    ctaText: 'Seguir novedades',
    ctaHref: 'index.html#contact',
    overview: 'Proyecto centrado en la exploracion de ecosistemas abisales y narrativa ambiental en un entorno de tension constante.',
    features: [
      'Exploracion por biomas submarinos.',
      'Mecanicas de gestion de oxigeno y presion.',
      'Historia reactiva al descubrimiento del entorno.'
    ],
    tech: [
      'Audio systems',
      'Atmospheric rendering',
      'Narrative scripting'
    ],
    status: 'En fase de ideacion y prototipado.'
  }
};

function readProjectKey() {
  const params = new URLSearchParams(globalThis.location.search);
  return params.get('project') || 'ether';
}

function renderProjectPage() {
  const key = readProjectKey();
  const project = PROJECT_PAGES[key] || PROJECT_PAGES.ether;

  document.title = project.title + ' - Poza Studios';
  document.getElementById('project-kicker').textContent = project.kicker;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-summary').textContent = project.summary;
  document.getElementById('project-overview').textContent = project.overview;
  document.getElementById('project-status').textContent = project.status;

  const cta = document.getElementById('project-cta');
  cta.querySelector('span').textContent = project.ctaText;
  cta.setAttribute('href', project.ctaHref);

  const featuresList = document.getElementById('project-features');
  featuresList.innerHTML = project.features.map(item => '<li>' + item + '</li>').join('');

  const techList = document.getElementById('project-tech');
  techList.innerHTML = project.tech.map(item => '<li>' + item + '</li>').join('');
}

document.addEventListener('DOMContentLoaded', renderProjectPage);
