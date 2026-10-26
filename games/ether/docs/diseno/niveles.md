# Diseño de niveles

Cómo se decidió la cámara de Ether, qué se aprendió de otros juegos isométricos y cómo están construidos los dos niveles de la vertical slice.

## Estudio de perspectivas y cámaras

La perspectiva es una de las primeras decisiones de un videojuego: primera persona, como en los *shooters*, o tercera persona, como en *Tunic*.

Dentro de la tercera persona está la vista isométrica, nacida de la proyección isométrica, en la que los ejes forman entre sí ángulos de 120°. Da sensación de amplitud y favorece la exploración, porque abarca grandes superficies.

En Unity la cámara admite dos modos de proyección:

- **Perspectiva.** Añade profundidad: los objetos lejanos se ven pequeños y los cercanos, grandes. Su volumen de visión se abre desde un foco.
- **Ortográfica.** Es una vista plana: el tamaño de los objetos no cambia con la distancia y no hay deformación.

Una misma escena cambia mucho según la proyección. Para Ether se eligió la **proyección ortográfica**, por influencia de otros juegos y porque así el *gameplay* se centra en moverse por el espacio sin tener que manejar la cámara. Con la proyección en perspectiva haría falta un eje más, la rotación de la cámara, para poder contemplar todo el escenario.

## Estudio de referencias

Para aprovechar la vista isométrica se analizó cómo la usa *Ruined King: A League of Legends Story* cuando el personaje se mueve por el mundo fuera del combate:

- **El escenario flota en un espacio vacío.** Más allá de la sala no hay fondo. Para que el jugador no se fije en ese vacío, el detalle se concentra en la sala y la actividad en su centro, de modo que ocupe la mayor parte de la pantalla.
- **Se evitan objetos en las paredes del lado de la cámara**, para mantener la sensación de isometría y la claridad.
- **Cuando hay entorno delante de la cámara**, se compensa: las puertas bajo los arcos se dejan abiertas para que el personaje se vea a través de ellas.
- **Los muros del lado desde el que se mira son más bajos.** Con las mismas proporciones no se vería el pasillo ni al personaje.
- **El muro del fondo recibe más detalle**, para llevar la mirada hacia esa zona.
- **Los muros bajos se decoran** aprovechando el espacio vacío, para dar profundidad y que no parezcan más pequeños.

Son recursos con los que la arquitectura del nivel dirige la atención del jugador. Parte de estas ideas, como la inclinación de la cámara y la importancia de los desniveles, proceden de *An Architectural Approach to Level Design*, y se aplicaron al nivel tutorial, donde se quería jugar con varias alturas.

También sirvieron de referencia para el tipo de cámara y el diseño isométrico a varias alturas *Tunic* y *Pokémon Rubí Omega*.

## Especificación de niveles

### Modo aventura: nivel tutorial

El nivel pasó por varios diseños. Para que el aprendizaje tuviera un ritmo natural, el mapa se dividió en zonas en las que el jugador experimenta las mecánicas básicas y las sensaciones que Ether quiere transmitir.

1. **Zona inicial: campamento.** Simula un lugar cerrado del que apetece salir: paredes altas, vegetación y un bloqueo con vallas en la única parte al mismo nivel que el suelo.
2. **Zona intermedia.** Los espacios se abren y hay menos vegetación, para transmitir libertad e invitar a investigar.
3. **Zona superior.** Pequeña y acotada, con enemigos. Aquí se aprenden las mecánicas básicas y se completan los objetivos.
4. **Bloqueo.** Una puerta cierra el paso hasta que se completan los objetivos, lo que obliga a aprender lo básico antes de avanzar.
5. **Ruinas Elementum.** Zona final del tutorial. Aparece un objetivo nuevo, romper los pilares elementales: unas estructuras de distintos colores que introducen los puzles elementales.

**Bucle de juego.** Inicio del nivel, exploración, derrotar enemigos y puzle; al completar los objetivos, fin del nivel.

El bucle se extrapola a las mazmorras previstas a largo plazo: se entra, se explora, se derrotan enemigos y se resuelven puzles. Lo que bloquea el final ya no es completar objetivos, sino derrotar al jefe.

**Storyboard.** El jugador empieza sin saber nada y decide investigar; explora y encuentra un enemigo agresivo que hace de tutorial; derrota oleadas que le presentan las mecánicas básicas (pegar, esquivar y curarse), y llega a las Ruinas Elementum.

### Modo supervivencia: coliseo

Es el modo más consolidado para experimentar con las mecánicas más allá del tutorial. El coliseo es un área cerrada en la que el jugador debe aguantar el máximo número de rondas. Las hordas crecen en número y en características con cada ronda.

Al final de cada ronda aparecen tótems con bonificaciones: unos como recompensa gratuita y otros a cambio de monedas.

Para que un modo pensado como infinito no lo sea, se le añaden objetivos (ver *Gameplay y mecánicas*). Sirven para dar al jugador la satisfacción de «completarlo» y como medida de la dificultad en las pruebas con usuarios.

**Idea.** Un modo por rondas con dificultad creciente, como *Call of Duty Zombies* o *Vampire Survivors*: una arena cerrada con enemigos que aparecen por los bordes.

**Diseño integrado en mecánicas**

- **Aparición de enemigos.** Que un enemigo apareciera de la nada en el borde quedaba artificial y restaba inmersión. La solución fue dar a las paredes una textura de arena en movimiento y situar los puntos de aparición dentro de los muros. El coliseo parece rodeado por una tormenta de arena de la que salen los enemigos, con lo que se resolvió un problema técnico y además se le dio sentido.
- **Arenas movedizas.** El *dash* provocaba fallos cerca de las paredes y a veces sacaba al jugador del mapa. Se añadió una franja de arenas movedizas, que impiden esquivar mientras se pisan. Arregla el fallo y da profundidad al modo.

**Distribución del mapa.** Una arena central rodeada por la franja de arenas movedizas; una zona de aparición de tótems en la mitad superior; el punto de aparición del jugador en el centro, y obstáculos repartidos por los bordes.

**Bucle de juego.** Iniciar la ronda, derrotar enemigos y conseguir bonificaciones.

**Storyboard.** El protagonista activa el tótem de supervivencia; aparecen los enemigos; al derrotarlos sueltan monedas, y antes de la siguiente ronda vuelven a aparecer los tótems.
