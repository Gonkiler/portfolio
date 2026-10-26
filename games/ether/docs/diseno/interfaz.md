# Interfaz de usuario

Qué ve el jugador en pantalla y cómo controla el juego.

## Sistema visual

La interfaz de Ether busca una estética simple y clara: la información mínima y necesaria para que el jugador entienda lo que ocurre y pueda centrarse en la acción. Cada pantalla se planteó primero como *wireframe*, un esquema que fija la distribución de los elementos sin entrar en el detalle, y pasó por varios bocetos antes del resultado final.

### HUD

El HUD es la interfaz presente en todo momento durante la partida. Hay dos variantes muy parecidas, una para el modo aventura y otra para el modo supervivencia.

Elementos comunes:

- **Selector elemental y energía** (esquina superior izquierda). Una esfera con el símbolo del elemento seleccionado, que se llena a medida que el jugador consigue energía.
- **Barra de vida y monedas**, junto al selector.
- **Icono de objetivos**, bajo el selector: una lista acompañada de la tecla o botón que la muestra.
- **Lista de objetivos** (esquina inferior derecha). Aparece al pulsar ese botón, con los objetivos del nivel y su estado.

El modo supervivencia añade un **panel de rondas** en la esquina superior derecha, con la ronda actual y el número de enemigos derrotados.

### Menús

**Menú principal.** Muestra el logo de Ether y un modelo 3D representativo del juego, con cinco botones:

- **Jugar:** empieza el nivel tutorial.
- **Continuar:** retoma una partida empezada.
- **Survival:** entra en el modo supervivencia.
- **Opciones:** abre el menú de opciones.
- **Salir:** cierra el juego.

**Menú de pausa.** Los botones se colocan en el centro; la pantalla se oscurece y se ocultan los demás elementos del HUD para centrar la atención. El tiempo del juego se detiene.

- **Continuar:** vuelve a la partida.
- **Menú:** vuelve al menú principal.
- **Controles:** abre el menú de controles.
- **Salir:** cierra el juego.

**Menú de controles.** Como el juego admite dos dispositivos, muestra el mapeado de ambos: el nombre de cada control, a su lado la tecla de teclado y ratón y, a la derecha, una imagen del mando con los botones numerados. Los controles se agrupan por carácter:

- Mecánicas principales
- Movimiento
- Cambio de forma
- HUD y menús

## Sistema de control

El juego se maneja con teclado y ratón o con mando de consola.

| Acción | Teclado y ratón | Mando |
|---|---|---|
| Ataque | Clic izquierdo | Botón de acción izquierdo |
| Esquive (*dash*) | Mayús izquierda | Botón de acción inferior |
| Curación (mantener) | Q | Botón de acción superior |
| Movimiento | W, A, S, D o flechas | Joystick izquierdo |
| Forma de fuego | 1 | Cruceta arriba |
| Forma de tierra | 2 | Cruceta derecha |
| Forma de aire | 3 | Cruceta abajo |
| Forma de agua | 4 | Cruceta izquierda |
| Mostrar objetivos | Tabulador | Create / Select / View |
| Pausa | Escape | Options / Start |

En los menús se navega con el ratón o con el joystick izquierdo, y se confirma con el clic izquierdo o con el botón de acción inferior.

El esquive desplaza al personaje en la dirección en la que esté mirando.
