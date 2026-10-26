# Poza Studios

Web del estudio de videojuegos Poza Studios: portfolio de juegos y documentación abierta de cómo se ha hecho cada uno (GDD, documento técnico, testing y lanzamiento).

Es un sitio estático sin paso de compilación. Todo el contenido sale de ficheros JSON y Markdown, así que añadir un juego o rellenar documentación no requiere tocar HTML ni JavaScript.

Para el funcionamiento interno, los flujos entre páginas y cómo cambiar funcionalidades, consulta la [guía de mantenimiento](MANTENIMIENTO.md).

## Verla en local

Las páginas cargan su contenido con `fetch`, por lo que hay que servirlas por HTTP (abrir `index.html` con doble clic no funciona). Por ejemplo, con la extensión **Live Server** de VS Code, o con:

```
npx serve .
```

## Estructura

```
index.html            Home: slider, juegos, Dev Blog, cifras y estudio
game.html             Ficha de un juego            (game.html?id=ether)
docs.html             Visor de documentación       (docs.html?game=ether&page=diseno/descripcion)
blog.html             Dev Blog: listado y entradas (blog.html, blog.html?post=gdd-ether)
data/
  games.json          Lista de juegos publicados en la web, en el orden en que se muestran
  blog.json           Índice de entradas del Dev Blog
blog/
  <id>.md             Texto de cada entrada del Dev Blog
games/
  _plantilla/         Punto de partida para un juego nuevo
  ether/
    game.json         Datos del juego e índice de su documentación
    cover.png         Portada
    docs/<fase>/<pagina>.md
sections/             Fragmentos HTML de la home, la cabecera y el pie
css/  js/             Estilos y lógica
```

## Añadir un juego

1. Copia `games/_plantilla` a `games/<id>`. El `<id>` solo admite minúsculas, números y guiones (`mi-juego`).
2. Rellena `games/<id>/game.json` y pon la portada en esa carpeta.
3. Añade el `<id>` a `data/games.json`.

Con eso el juego aparece en la home, en el pie, y tiene su ficha y su documentación.

### Campos de `game.json`

| Campo | Uso |
|---|---|
| `title`, `tagline`, `genre` | Nombre, frase corta y géneros |
| `status` | `concepto`, `pre-produccion`, `en-desarrollo`, `publicado`, `finalizado` o `pausado`. Los tres primeros cuentan como «En desarrollo» en las cifras de la home |
| `statusNote` | Texto libre del apartado «Estado» de la ficha |
| `featured` | `true` para que salga en el slider de la home |
| `cover` | Imagen de portada, relativa a la carpeta del juego. Vacío usa un fondo genérico |
| `summary`, `overview` | Descripción corta (tarjetas y slider) y larga (ficha) |
| `features`, `tech` | Listas de la ficha |
| `links` | Enlaces externos `{ "label", "url" }`. El primero se muestra también en el slider |
| `docs` | Fases de la documentación y sus páginas |

## Documentación de un juego

`docs` es una lista de fases (Diseño, Desarrollo, Testing, Lanzamiento) y cada fase una lista de páginas. Cada página es un fichero Markdown en `games/<id>/docs/<id-fase>/<id-pagina>.md`.

La plantilla sigue la estructura del GDD de Ether: la fase de Diseño tiene una página por capítulo (descripción del juego, gameplay y mecánicas, interfaz de usuario, arte y vídeo, sonido y música, diseño de niveles y bibliografía) y la de Testing recoge el capítulo de calidad (evaluación planificada, evaluación realizada y pautas de accesibilidad), además de un registro de errores. Cada `.md` de la plantilla trae ya los apartados y una frase guía en cada uno.

- **Rellenar una página:** edita su `.md` y cambia su `status` en `game.json` a `borrador` o `completo`. Mientras esté en `pendiente` se muestra como plantilla sin redactar.
- **Añadir una página o una fase:** añade la entrada en `docs` y crea el `.md` correspondiente.
- **Imágenes:** guárdalas junto al `.md` y enlázalas con ruta relativa, `![Mapa](mapa.png)`.

El progreso de cada fase en la ficha del juego y la cifra de «páginas documentadas» de la home se calculan a partir de esos `status`.

## Publicar en el Dev Blog

Las novedades del estudio se publican como entradas del Dev Blog. La home muestra las tres más recientes y `blog.html` las lista todas.

1. Añade la entrada a `data/blog.json`:

   ```json
   {
     "id": "mi-entrada",
     "date": "2026-10-20",
     "tag": "Devlog",
     "game": "ether",
     "title": "Título de la entrada",
     "summary": "Resumen de una o dos frases para la tarjeta y la cabecera."
   }
   ```

2. Escribe el texto en `blog/<id>.md`, sin título: la página ya muestra `title` y `summary` como cabecera.

`id` solo admite minúsculas, números y guiones. `game` es opcional: asocia la entrada a un juego y añade un botón a su ficha. Las rutas relativas del `.md` (imágenes y enlaces) se resuelven desde la carpeta `blog/`, así que un enlace a la ficha de Ether se escribe `../game.html?id=ether`.
