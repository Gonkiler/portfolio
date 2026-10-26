# Gameplay y mecánicas

Cómo se juega a Ether: el núcleo de la experiencia, el modo supervivencia, los objetivos, la progresión y las reglas que lo sostienen.

## Gameplay

### Núcleo

- **Jugador 3D.** Se puede investigar libremente el territorio e interactuar con parte del entorno. Para incentivar la exploración, por los niveles se esconden pequeños objetos y easter eggs que amplían lo que la historia no explica de forma explícita.
- **Combate simple: ataque, esquiva y habilidad.** El esquive (*dash*) y el combate deben sentirse cómodos y satisfactorios, como en un roguelike o un hack and slash. La habilidad consume una energía que se recarga atacando a los enemigos y se usa exclusivamente para curarse. Las habilidades elementales son pasivas.
- **Mando o teclado.** Se puede jugar con teclado y ratón o con mando, para que el jugador de PC esté cómodo y el jugador casual tenga un control intuitivo.

### Modos de juego

Además del modo aventura, Ether tiene un **modo supervivencia**, donde sale a relucir la parte más roguelike del juego.

El jugador está en una arena cuadrada. Los enemigos aparecen cuando se activa la ronda; al derrotarlos a todos, la aparición se detiene y el jugador decide cuándo empieza la siguiente. Cada ronda aumentan el número de enemigos, su ritmo de aparición y sus características, mientras el jugador mantiene en su mayoría las suyas.

Para equilibrarlo hay dos sistemas: **monedas**, que sueltan los enemigos y se gastan en una tienda que aparece entre rondas, y **tótems**, objetos que se rompen a golpes y dan una bonificación o disparan una acción.

| Tótem | Aspecto | Efecto | Dónde aparece |
|---|---|---|---|
| Supervivencia | Verde, con una calavera; oscila en vertical | Inicia una ronda nueva | Solo en el modo supervivencia |
| Teletransporte | Figura del protagonista rodeada de aros azules; sube, baja y rota | Lleva al jugador a otra zona. En la vertical slice, del tutorial al modo supervivencia | Ruinas Elementum |
| Daño | Rojizo, espada y flecha hacia arriba | Aumenta el daño del jugador, solo en el modo en que se consume | Recompensa cada cierto número de rondas, tienda (150 monedas) y algunas zonas de la aventura |
| Vida | Verde, cruz y flecha hacia arriba | +5 de vida base (la vida inicial es 20, así que es un 25 %) | Tienda (150 monedas) |
| Velocidad | Amarillo, bota con estela y flecha hacia arriba | Velocidad adicional durante esa ronda | Tienda (100 monedas) |

El tótem de daño se da como recompensa y el de vida no porque se quiere incentivar la supervivencia a través del combate. Los enemigos tienen un margen entre ataques y no registran el golpe salvo que el jugador pase un tiempo dentro de su área. Un jugador experto que esquive y golpee con constancia no necesita vida extra; quien vea que no le alcanza con la curación puede comprarla.

### Objetivos

Un juego con tanta libertad de exploración necesita objetivos en los que centrarse.

**Zona inicial (tutorial).** El jugador aprende las mecánicas básicas en un entorno controlado, y el experimentado puede completarlas rápido:

- Moverse
- Esquivar (*dashear*)
- Derrotar a un enemigo
- Curarse

Después se añade un puzle sencillo que enseña las bases de los puzles elementales:

- Destruir cuatro pilares elementales

**Mazmorras elementales** (fuego, aire, tierra y agua). Todas comparten un bucle común: entrar, explorar, resolver puzles y derrotar al jefe.

- Desbloquear la sala del jefe
- Derrotar al jefe de la mazmorra
- (Opcional) Resolver todos los rompecabezas de la mazmorra

Siempre hay un puzle que bloquea la sala del jefe; el resto son opcionales. Los puzles cambian en cada mazmorra (de combate, de mover piezas, de activar elementos), de modo que la estructura resulta familiar sin hacerse repetitiva.

**Modo supervivencia.** El objetivo natural es aguantar el mayor número de rondas. Para las pruebas con usuarios se fijaron objetivos acotados:

- Llegar hasta la ronda 10
- Recolectar 300 monedas
- Derrotar a 200 enemigos

### Progresión

En el tutorial no se puede avanzar de zona, ni llegar a las Ruinas Elementum, sin completar los objetivos.

A partir de ahí la progresión se refleja en las Ruinas Elementum. Cada mazmorra completada hace aparecer sus símbolos en las ruinas; cuando están las cuatro, se activa un teletransporte hacia la siguiente zona, con un jefe final, más allá de una puerta sellada.

Derrotar al guardián de una mazmorra otorga además una pasiva:

| Elemento | Pasiva |
|---|---|
| Fuego | +50 % de daño |
| Tierra | Escudo equivalente al 25 % de la salud tras más de 10 segundos fuera de combate |
| Agua | +50 % de salud base (cuentan también los bonos de vida obtenidos con tótems) |
| Aire | +15 % de velocidad de movimiento |

## Mecánicas

### Movimiento

El jugador se mueve en todas las direcciones y le afecta la gravedad. Como no hay salto, la gravedad solo sirve para subir y bajar por los desniveles del terreno.

- **Movimiento.** Se probó a moverlo únicamente con físicas, pero por la distribución de pesos de los modelos tenía más sentido modificar directamente la velocidad del personaje en cada eje. Así se evitaron las faltas de equilibrio y los choques que mandaban personajes a volar durante el desarrollo.
- **Esquive (*dash*).** Sirve para esquivar ataques y recomponerse en combate. Se implementa modificando la velocidad o la fuerza horizontal. El movimiento es de inicio a fin: no se puede cancelar.

### Habilidades

- **Ataque.** Golpea en un área con forma de cubo frente al personaje. Los ataques de espada suelen simular un cono, pero el cubo encajaba mejor con las animaciones y al jugar no se nota la diferencia. Los ataques se encadenan en un combo de hasta cuatro golpes con animaciones distintas, para que el movimiento resulte fluido.
- **Curación.** El personaje se cura consumiendo la energía que genera al atacar. Para curarse hay que arriesgarse a dañar al enemigo sin recibir daño, lo que fomenta el uso del esquive. Mientras se cura, el personaje no puede moverse.
- **Pasivas elementales.** Se consiguen al completar mazmorras y añaden las mejoras de la tabla anterior en el modo aventura. No pretenden romper el juego.

### Mecánicas de nivel

- **Puzles con pilares elementales.** Dependen de usar la forma elemental que corresponde al elemento del pilar. Suelen consistir en romper todos los pilares para abrir el paso o completar un objetivo.
- **Tótems.** Elementos destruibles que provocan una acción distinta según su tipo (ver la tabla del modo supervivencia).
- **Arenas movedizas.** Impiden hacer *dash* mientras se pisan. Se introdujeron en el modo supervivencia para evitar que el jugador atravesara los muros con el esquive, y de paso suponen un reto en rondas altas. Está previsto usarlas también en la mazmorra de tierra y en su sala de jefe.

### Inteligencia artificial

Los enemigos tienen una inteligencia sencilla, con tres estados:

1. **Reposo.** El enemigo espera hasta que el jugador entra en su campo de visión (FOV), simulado con una esfera a su alrededor.
2. **Persecución.** Sigue al jugador. Si este permanece dentro del rango de ataque (distinto del FOV) durante un tiempo determinado, pasa a atacar.
3. **Ataque.** Reproduce la animación y hace daño. Si pasado el tiempo de enfriamiento el jugador sigue en rango, ataca de nuevo; si no, vuelve a perseguirlo.

Ese tiempo es el enfriamiento (*cooldown*) del ataque, propio de cada enemigo: no se quiere que golpee cada vez que el jugador esté en rango, sino cuando lleve un tiempo dentro.

El comportamiento es ideal para el modo supervivencia, donde cada enemigo que aparece debe ir a por el jugador. En la aventura basta con ajustar el FOV para que solo actúe cuando el jugador entra en su sala, y no lo persiga desde otros puntos del mapa.

## Flujo de pantallas

- **Desde el menú principal:** al modo aventura con «Jugar» (o «Continuar» si hay una partida empezada) y al modo supervivencia con su botón.
- **Desde el modo aventura:** al menú principal desde el menú de pausa, y al modo supervivencia mediante el tótem de teletransporte que aparece en las Ruinas Elementum al completar el tutorial.
- **Desde el modo supervivencia:** al menú principal desde el menú de pausa.

En ambos modos se puede consultar la pantalla de controles desde la pausa.

## Trucos y easter eggs

> Este apartado revela detalles de la historia.

- El símbolo del centro de las Ruinas Elementum es el mismo que lleva el protagonista en la capa en su forma base (ether).
- En el campamento del inicio hay tres «asientos»: hubo tres personas allí, aunque ahora solo esté Salter.
- Ausun y Agmoon, representaciones del oro y la plata, apuntan a una expansión en busca de Celestius, el hermano que controla los siete metales planetarios.
- Los nombres de los tres hermanos, Sulfer, Celestius y Salter, vienen de las tres bases de la alquimia (*Tria Prima*): azufre, mercurio y sal.
- El origen del nombre de Salter indica que al final podrá unirse a sus hermanos para controlar toda la alquimia.
- Que Salter represente la materia en sentido propio anticipa que podrá combinar los elementos básicos en mezclas elementales (futura expansión).
