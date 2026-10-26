# Arte y vídeo

La identidad visual de Ether y cómo se ha construido.

> Los bocetos, renders y capturas que acompañan a cada apartado están en el [documento original del TFG](https://oa.upm.es/80460/).

## Objetivos

Se eligen objetos y modelos de estilo low-poly para mantener un aspecto sencillo en todo el juego. El low-poly es fácil de modelar y de trabajar por su baja cantidad de polígonos, y el resultado es estéticamente agradable.

## Arte y animación 2D

### Interfaz

**Controles.** La pantalla de controles representa los dos dispositivos con un icono de teclado y la silueta de un mando. Se lee de dos maneras:

- **Transversal:** el nombre de cada control está a la izquierda de su tecla, y se lee en línea.
- **Asociación:** como el mando no puede mostrarse igual, cada control lleva un número que se repite sobre el botón correspondiente en la imagen del mando.

**Selector elemental.** Pasó por dos versiones. La primera era un círculo con el símbolo del elemento activo. La segunda añade alrededor una rueda con el resto de elementos, para mostrar que existen y que se puede cambiar entre ellos. La posición de cada elemento en la rueda coincide con el botón de la cruceta que lo activa: el de arriba, con la cruceta arriba. En teclado esa asociación no es directa, así que se numera desde arriba en el sentido de las agujas del reloj (1 arriba, 2 derecha, 3 abajo, 4 izquierda).

| Elemento | Color | Símbolo |
|---|---|---|
| Ether | Morado | Círculo con una línea horizontal |
| Fuego | Rojo | Triángulo hacia arriba |
| Tierra | Verde | Triángulo hacia abajo con una línea |
| Aire | Naranja | Triángulo hacia arriba con una línea |
| Agua | Azul | Triángulo hacia abajo |

**Barra de vida.** Se compone de dos imágenes, un marco vacío y otro lleno; en Unity el relleno se ajusta al porcentaje de vida. La versión 0.2, de los primeros prototipos, era roja y con un extremo en diagonal. La versión 1.0, la del prototipo final, es verde y rectangular.

**Objetivos y otros iconos.**

- Marco donde se escriben y actualizan los objetivos
- Casillas vacía y marcada para el estado de cada objetivo
- Icono de lista del HUD
- Calavera para los enemigos derrotados en el modo supervivencia
- Icono de monedas

### Logotipo

El concepto del logo se alcanzó por prueba y error. Al principio iba a ser un logo gráfico, pero después se pensó que un texto tipográfico simple encajaría mejor. Se hizo un pequeño estudio de tipografías que transmitieran compostura y firmeza, pero también movimiento, probando a unir las letras y a añadir un círculo que diera estructura.

Se eligió la tipografía **AronBlack Italic**, y con ella se desarrollaron las siguientes versiones:

1. Texto en minúsculas dentro de un círculo morado.
2. Círculo con una división vertical.
3. Letras de colores según los elementos.
4. **Versión final:** simplificada, en negro.

### Animaciones 2D

Al abrir el menú de pausa se reproduce un fundido a gris: aparecen los botones y el fondo se oscurece poco a poco. La animación es muy sencilla, con un único estado en el Animator de Unity y sin parámetros ni capas.

## Arte y animación 3D

### Entorno

Todos los elementos 3D del juego se han creado desde cero en Blender, salvo la tienda de campaña, que procede del paquete gratuito *Low Poly Tropical Island Lite* de la Unity Asset Store.

**Modo aventura: nivel tutorial**

1. **Campamento (zona inicial).** Árboles, rocas, pilares, un pequeño pilar elemental, vallas, un montón de huesos y la tienda de campaña.
2. **Zona intermedia.** Espacios abiertos que favorecen la exploración y dejan sitio para esquivar y moverse rápido. Incluye un mirador, un círculo de árboles y una zona de ritual.
3. **Zona superior.** Tres enemigos para practicar el combate. Al completar los objetivos se abre la puerta del fondo.
4. **Ruinas Elementum.** Una plataforma central y cuatro laterales con pilares elementales, rodeadas de agua para que toda la atención se concentre en ellas. Un primer boceto las distribuía en vertical, con los símbolos sobre una puerta; el prototipo final las distribuye en horizontal. Al activar los pilares aparece el tótem de teletransporte en el centro.

Assets creados: valla y valla rota, pilar, calavera y huesos, pilar elemental en sus cuatro variantes (aire, tierra, fuego y agua), dos rocas, las Ruinas Elementum, el tótem de teletransporte y dos árboles.

**Modo supervivencia**

Una arena de combate cuadrada hundida en un terreno de arena. Assets propios del modo: los tótems de daño, vida y supervivencia.

### Personajes

**Salter**

*Bocetos de diseño.* Se partió de rasgos generales (guantes, capa, capucha) y se optó por un diseño sencillo con elementos que le dieran carisma.

| Versión | Qué introduce | Valoración |
|---|---|---|
| V1 | Elementos básicos: chaqueta de manga corta, guantes, capucha y un círculo para el elemento en la espalda | |
| V2 | Color y detalles: el elemento se señala visualmente en el traje | |
| V2.1 | Variaciones por elemento: líneas de energía y símbolo del elemento en la espalda | Las líneas iban a dar problemas con la geometría en Blender |
| V2.2 | Cuadrados en lugar de líneas | Mejor para animar y mantiene la claridad del elemento, pero queda más feo |
| V3 (final) | Sin líneas: solo el símbolo y detalles de color | Más claridad y mejor para animar, a costa de tener menos elementos que representen el elemento seleccionado |

*Modelado.* Primero se modeló el cuerpo sin túnica; después se añadió la túnica en una versión previa, y por último las cinco formas finales: ether, fuego, tierra, aire y agua. Cada forma cambia el color de los detalles de la túnica y el símbolo de la espalda.

*Animaciones.*

- **T-pose.** Postura base, cómoda para colocar los huesos que mueven al personaje.
- **Idle.** Simula la respiración: pasa de una pose relajada a estirarse y sacar pecho.
- **Caminar.** Animada siguiendo una hoja de referencia del ciclo de andar.
- **Ataques.** Una secuencia de cuatro, en la que cada ataque termina en el fotograma que inicia el siguiente, de modo que el ciclo puede repetirse:
  1. Movimiento vertical cortante, como un tajo.
  2. Corte descendente.
  3. Corte ascendente con intención de corte horizontal.
  4. Corte descendente desde la posición horizontal hasta la posición inicial.

La máquina de estados en Unity tiene los estados *Idle*, *Walking*, *Running* y los cuatro ataques (*a1* a *a4*). Desde el reposo o caminando, un ataque lleva al Ataque 1; tras cada ataque, si el jugador pide otro se pasa al siguiente (y del cuarto de vuelta al primero), y si no, se vuelve al reposo. Caminando, mantener el botón de esquive lleva a correr.

*Espada.* La espada de Salter posee energía elemental, y su color cambia con la forma en la que se encuentre. Esto resuelve un problema de claridad: los elementos visuales del traje no bastan para distinguir la forma actual, y el color de la espada la hace evidente, también para quien no vea bien los detalles de la vestimenta.

### Enemigos

**Guardia elemental**

*Bocetos.* Se iteró hasta dar con una estructura sólida que reflejara la idea de «robot artificial con energía elemental». El diseño básico («gólem elemental») tuvo una versión articulada y otra plana. Después se trabajó la diferenciación por elemento: el símbolo en el pecho y un punto de color en los brazos, con variantes de iluminación interior, un canal iluminado y un brazalete.

*Modelado.* Cuerpo oscuro con forma de escudo, cabeza en forma de cúpula y brazos separados del cuerpo, con el símbolo del elemento en el pecho.

*Animaciones.*

- **Idle.** Cinco movimientos básicos: desde el reposo, mueve brazos y pecho simulando una respiración mientras levita, y vuelve a bajar.
- **Caminando.** Simula una levitación: el cuerpo sube y baja mientras abre y cierra los brazos, y se inclina al avanzar. Al bajar, los brazos se quedan atrás por el rozamiento y la falta de conexión con el cuerpo.
- **Ataque.** Un golpe directo con un brazo. Aunque parece estático, puede hacerlo en movimiento.

**Bestia elemental: elemental de agua**

Se bocetó cuando todavía se pensaba incluir mazmorras en la vertical slice. La idea quedó para futuros desarrollos, así que solo hubo una iteración de diseño y no se llegó a modelar.

### Objetos coleccionables

En la vertical slice, el único objeto coleccionable son las monedas de oro que sueltan los enemigos al ser derrotados.
