# Descripción del juego

La aventura se desarrolla en un entorno de ruinas antiguas que guardan los secretos de la alquimia y los elementos. Salter, el protagonista, despierta con amnesia en este terreno abandonado. Al investigar la zona descubrirá maneras de usar la alquimia y los poderes elementales, y empezará a recordar su pasado.

> Esta documentación adapta el Game Design Document de Ether (Gonzalo Poza González, enero de 2024), presentado como Trabajo Fin de Grado en la ETSI Informáticos de la Universidad Politécnica de Madrid. El documento original, con todas sus figuras, bocetos y capturas, puede consultarse en el [archivo digital de la UPM](https://oa.upm.es/80460/).

## Concepto

El jugador controla a Salter, que despierta de un sueño sin saber dónde se encuentra e intenta investigar el territorio para descubrir qué hace allí.

El territorio está custodiado por enemigos con los que habrá que combatir para abrirse paso. Durante la exploración, Salter aprende a pelear, a esquivar y a usar sus poderes elementales.

Una vez aprendidas las mecánicas principales, hay que explorar varias zonas, cada una representativa de uno de los cuatro elementos. Completar una zona desbloquea la pasiva de su elemento, que mejora y modifica las habilidades existentes. Completarlas todas abre el paso a la zona del jefe final.

Ether se puede concretar como un juego de exploración, aventura y RPG con un sistema de combate dinámico de estilo roguelike.

## Características

- **Gráficos 3D de tipo low-poly.** Assets simples en número de polígonos, pero con expresividad y carácter.
- **Zonas temáticas diferenciadas.** Las ruinas comparten elementos comunes; la mayor distinción está en las mazmorras elementales.
- **Desarrollo no lineal.** Terminado el tutorial, el jugador elige entre varios caminos, lo que cambia la experiencia al rejugarlo.
- **Combate dinámico.** Toma elementos de la acción y el roguelike para mantener al jugador en constante movimiento.
- **Puzles.** Añaden una capa de complejidad a la exploración de las mazmorras y permiten experimentar más con las mecánicas.

## Género

- **Aventura.** Exploración, investigación e interacción con el entorno.
- **Acción.** El jugador depende de su velocidad, destreza y tiempo de reacción, con el combate como eje.
- **RPG.** El jugador adopta el papel del personaje que controla, con sistemas que permiten personalizar la experiencia.
  - **Roguelike.** Subgénero del rol basado en aventurarse por mazmorras o laberintos.
  - **Hack and slash.** Acción centrada en el combate en tiempo real con armas cuerpo a cuerpo.

## Plataformas

El juego estará disponible en web (Unity Play) y como ejecutable de Windows.

Si las pruebas de usabilidad y experiencia de usuario resultan un éxito, la idea es continuar el desarrollo hasta poder publicarlo en Steam.

## Público objetivo

Ether está dirigido a quienes buscan un juego que despierte las ganas de explorar y derrotar enemigos: algo con lo que despejarse, romper con la rutina y desconectar. Sus dos motivadores principales son la libertad de exploración, sin la sensación de dejarse cosas atrás al avanzar, y un combate dinámico que permite derrotar a los enemigos de formas distintas.

Según los tipos de jugador de Bartle:

| Tipo | Encaje con Ether |
|---|---|
| Explorador | El más afín: la propia exploración y la búsqueda de detalles y easter eggs son la recompensa. |
| Complecionista | Alto: avanzar en la historia exige completar mazmorras. |
| Asesino | Parcial: poca motivación durante la mayor parte del juego, pero satisfacción en las peleas contra el jefe de cada mazmorra. |
| Socializador | Bajo: el juego no tiene multijugador. |

El usuario objetivo debería estar familiarizado con los controles básicos de un videojuego, con teclado y ratón o con mando, e idealmente haber jugado antes a algún roguelike.

**Clasificación por edades.** Se espera una clasificación PEGI 12, por la violencia no realista del sistema de combate, con el descriptor de violencia como único descriptor de contenido. El juego no contiene lenguaje soez, terror, juegos de azar, sexo, drogas, discriminación ni compras dentro del juego.

## Influencias

- **Premisa y arte.** *Tunic* y *The Legend of Zelda* inspiran la idea de buscar la «verdad» en un territorio abandonado habitado por monstruos. De *Tunic* viene además la estética low-poly con modelos 3D.
- **Combate.** El combate dinámico de estilo roguelike bebe de *Hades*, *Moonlighter*, *Cult of the Lamb* y *The Mageseeker: A League of Legends Story*. En los tres últimos la exploración de mazmorras es el medio para otro objetivo, y el combate cambiante aporta frescura entre salas con enemigos parecidos.
- **Cámara.** La vista isométrica viene también de estos juegos. La más parecida a la de Ether es la de *Tunic*: puramente isométrica, evitando la frontalidad.
- **Temática.** El control de los cuatro elementos aparece en *Avatar: The Last Airbender*, en los bastones elementales del mapa Origins de *Call of Duty: Black Ops 2*, en *Spellbreak*, *The Mageseeker* y *Genshin Impact*.
- **El quinto elemento.** De *Black Clover* sale la idea de que el protagonista no controle los cuatro elementos sino el *aether*, el quinto elemento de la alquimia. Esto simplifica el combate, porque no hay que diseñar habilidades únicas para cada forma. También de ahí viene la faceta RPG: modificar las habilidades dándoles propiedades de fuego, agua, aire y tierra.

## Alcance

### Historia

Salter despierta en unas ruinas en medio de un bosque. No sabe cómo ha llegado allí y no recuerda nada de su pasado salvo su nombre. Decide salir a investigar el lugar en busca de respuestas.

Al adentrarse en el bosque encuentra enemigos, a los que va derrotando hasta llegar a una especie de altar. Allí entra brevemente en contacto con los elementos, lo que le hace recordar un episodio de su pasado. Decide entonces que debe dominarlos para seguir recordando.

Salter empieza queriendo saber de su pasado, pero poco a poco verá que todo forma parte de una imagen más grande. Es hijo de la alquimia, y controlar los elementos es fundamental para su objetivo. Por el camino, varios enemigos se interpondrán para impedirle descubrirlo.

La historia se cuenta a través de elementos del entorno y de los encuentros con Celestius y Sulfer. Al final se revela que son sus hermanos, y la historia termina en un combate en el que los tres pelean juntos.

### Mundo

**Lugares importantes**

- **Ruinas iniciales.** Donde empieza la aventura, cerca de una playa o un acantilado, con signos de una civilización previa. Los elementos del entorno dan contexto sin diálogos ni textos, para que el jugador especule sobre lo ocurrido.
- **Bosque.** Zona intermedia entre las ruinas iniciales y las Ruinas Elementum. Sirve de tutorial de las mecánicas básicas y está pensada para que no se sienta como un pasillo. Presenta simbología de los elementos para alimentar el misterio.
- **Ruinas Elementum.** Zona central (*hub*) desde la que se llega a las mazmorras, con el símbolo del ether en el centro. Aquí Salter consigue la runa elementum, que lleva inscrito el mismo símbolo que él lleva en la espalda.
- **Mazmorras elementales.** Cada una termina en una sala de jefe; derrotarlo supone dominar su elemento.

| Mazmorra | Puzles | Ambientación |
|---|---|---|
| Fuego | Relacionados con el combate | Tonos rojos y marrones; zona volcánica con lava y llamas |
| Agua | Combinaciones que se resuelven con pistas del entorno | Azules y turquesas oscuros; zona submarina, «sumergida» |
| Aire | Activar elementos en un tiempo concreto, con aviso sonoro y visual | Blancos, grises y amarillos; un «palacio del Olimpo» |
| Tierra | Destruir pilares elementales en salas con enemigos | Marrones y verdes; cueva oscura con un claro iluminado desde un hueco en el techo |

**Tamaño**

- **Ruinas iniciales.** Pequeñas, del tamaño de una sala.
- **Bosque.** Pequeño o mediano: suficiente para los tutoriales de ataque, esquive y habilidad, sin que el jugador se pierda.
- **Ruinas Elementum.** Pequeñas: los transportadores a las mazmorras y elementos decorativos.
- **Mazmorras elementales.** De medianas a grandes, con múltiples salas, puzles, zonas opcionales y una arena final para el jefe.

**Mecanismo de viaje**

Dentro de las Ruinas Elementum, concentrándose (manteniendo un botón), el jugador viaja a la mazmorra del elemento seleccionado con la runa elementum. Como las Ruinas Elementum son las ruinas del propio ether, y el ether es el elemento por defecto de Salter, canalizándolo puede volver a ellas desde cualquier mazmorra. Es la mecánica clásica de volver a la base para curarse o cuando quedan pocos recursos.

### Personajes

- **Salter, el protagonista.** Despierta con amnesia en unas ruinas. Controla el ether, el quinto elemento de la alquimia, que es su forma base, y puede cambiarla a voluntad para controlar otros elementos. Su nombre viene de la sal, que representa la materia en sentido propio dentro de la *Tria Prima*. Al principio usa los elementos básicos; tras derrotar a Celestius y Sulfer podrá mezclarlos.
- **Celestius, el mago alquímico.** Aparece durante los enfrentamientos con los guardianes elementales. Habla poco, pero se dirige a Salter de forma cercana, casi familiar. Representa el mercurio y los siete metales planetarios.
- **Sulfer, el paladín alquímico.** Como Celestius, trata a Salter con familiaridad. Representa el azufre, el principio vital, y los elementos mundanos.

### Enemigos

- **Bestias elementales.** Enemigos pequeños y sencillos de derrotar, sin habilidades especiales, en los puntos comunes de exploración.
- **Guardias elementales.** Más fuertes, con características elementales. Suelen adelantar algún ataque o comportamiento del guardián de su elemento.
- **Guardianes elementales.** Jefes de las mazmorras. Parecidos a los guardias pero mayores y más complejos, de modo que los guardias parezcan sus súbditos. Tienen un carácter artificial: algo fabricado, no natural.
- **Ausun.** Bestia semejante a un león de Fu, del elemento oro: pelaje blanco con tonos dorados y el símbolo alquímico del oro (un sol) en la frente, que brilla al atacar. Porta un orbe con el mismo símbolo. El nombre combina «Au» (oro) y *sun*.
- **Agmoon.** Su contraparte de plata: pelaje oscuro con tonos azules y morados y el símbolo de la plata (una luna) en la frente. El nombre combina «Ag» (plata) y *moon*.
