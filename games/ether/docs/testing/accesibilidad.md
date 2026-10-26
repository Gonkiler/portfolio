# Pautas de accesibilidad

Qué medidas de accesibilidad se contemplaron durante el desarrollo de Ether y en qué estado quedó cada una en la vertical slice.

## Principios

Se revisaron los principios generales de diseño accesible de las WCAG 2.2, según los cuales el sistema debe ser:

- **Perceptible.** La información y los componentes de la interfaz se presentan de maneras que los usuarios puedan percibir.
- **Operable.** Los componentes de la interfaz y la navegación se pueden manejar.
- **Comprensible.** La información y el funcionamiento de la interfaz se entienden.
- **Robusto.** La interacción es compatible con productos de apoyo.

También se tuvieron en cuenta las necesidades de usuario de la norma EN 301 549, entre ellas el uso sin visión, con visión limitada, sin percepción del color, sin audición, con audición limitada, sin capacidad vocal y con capacidad cognitiva limitada.

Las medidas concretas se tomaron de la guía «Accesibilidad para desarrolladores» de Ga11y Videojuegos Accesibles, de la Fundación ONCE en colaboración con AEVI, que las clasifica por dificultad de implementación. Se consideraron las de los dos niveles más sencillos (1 y 2 estrellas) que encajaban con el juego.

## Medidas de accesibilidad

### Dificultad de 1 estrella

| Medida | Aplicación en Ether | Estado |
|---|---|---|
| Dirección con cruceta | Moverse con la cruceta en lugar del joystick. Choca con el cambio de forma elemental, que ya usa la cruceta: habría que pasarlo al joystick, lo que anula el propósito | Descartada por ahora |
| Duración de notificación | La lista de objetivos del tutorial se muestra un tiempo limitado y puede fijarse con un botón. Se podría hacer configurable ese tiempo o mantenerla hasta que el jugador la cierre | Parcial |
| Estamina | Opción para mantener siempre al máximo los recursos limitados, que en Ether son la vida y la energía. Es sencilla de implementar | Pendiente |
| Iconos representativos | Los iconos del juego identifican lo que representan. Se preguntará de forma explícita a los usuarios en próximas iteraciones para confirmarlo | Cubierta |
| Modificadores | Cambiar la forma de pulsar: por ejemplo, atacar manteniendo el botón en lugar de presionarlo cada vez | Pendiente |
| Notificaciones hápticas | Vibración del mando al recibir daño o al cambiar de forma. Es de las primeras que se quieren incorporar | Pendiente |
| Recordatorios contextuales | Mensajes que recuerden cómo interactuar al acercarse a un objeto interactivo | Pendiente |
| Volúmenes | Ajuste de volumen por canal. El juego todavía no tiene sonido; se añadirá como menú cuando lo tenga | Pendiente |

### Dificultad de 2 estrellas

| Medida | Aplicación en Ether | Estado |
|---|---|---|
| Anticaídas | Ya hay barreras en los bordes que impiden caer del nivel. Faltaría hacerlas visibles con algún elemento o textura | Parcial |
| Atajos | Usar el botón de acción derecho del mando para rotar por las formas elementales en ciclo y sacar el cambio de forma de la cruceta | Pendiente |
| Idioma | Hay pocos textos, todos en el HUD y los menús, y no hay diálogos, así que es fácil de incorporar. Prevista para la siguiente iteración | Pendiente |
| Interacción con códigos de color | El color es clave en mecánicas como los pilares elementales, pero cada elemento se representa además con su símbolo | Cubierta en parte |
| Notificaciones visuales | Avisar en pantalla cuando ocurre algo en el mundo, como la apertura de la puerta del tutorial al completar los objetivos | Pendiente |
| Personalización de controles | Reasignar los controles o elegir modos preestablecidos. La implementación resultó más compleja de lo previsto y no dio tiempo antes de cerrar el prototipo | Pendiente |
| Realización de acciones simplificadas | Cambiar automáticamente a la forma correcta al resolver un puzle elemental | Pendiente |
| Tutoriales | El tutorial actual no explica las mecánicas: deja que se aprendan jugando. Se añadiría una sección de guías consultable en cualquier momento, inspirada en la de *Genshin Impact* | Parcial |

## Próximas fases

Para las siguientes fases de desarrollo está previsto implementar:

- Estamina
- Modificadores
- Notificaciones hápticas
- Recordatorios contextuales
- Volúmenes
- Idioma
- Interacción con códigos de color
- Modo daltónico
- Realización de acciones simplificadas
- Tutoriales

El resto de medidas no se descartan: son más complicadas de implementar o no se consideran de necesidad inmediata.
