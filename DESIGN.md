# riqedev Design System — TAKE 01

> **Engineering through the lens.** La ingeniería es el contenido; la cámara es el marco.

Sistema de marca e interfaz de riqedev. Vive en tres lugares que deben decir lo mismo:

| Dónde | Qué |
| --- | --- |
| `src/index.css` | Fuente de verdad de los tokens (CSS vars + `@theme inline` de Tailwind v4) |
| `/system` | Spec sheet visual con los componentes reales. **Solo en `npm run dev`**: no se publica |
| `/lab` | Laboratorio de wordmark y monograma (fuentes candidatas, señal final, tamaños reales). **Solo en dev** |
| Este archivo | La versión portable: para el blog, una charla, un CV o cualquier pieza nueva de la marca |
| `riqedev-blog` | Aplica la misma marca y tokens (copiados en `src/styles/globals.css`). Si un token cambia acá, se replica allá |

**En el blog** la cámara es todavía más tenue: metadatos en voz OSD, Galería con visor PLAYBACK y 404 `NO●SIGNAL`, sin HUD de visor. Mismo único rojo (solo el punto), links en `--link`, Inter para leer.

---

## 1. Principios

1. **El visor no es el contenido.** Todo lo que rodea al contenido es HUD: tenue, condensado, inmóvil. Si un elemento del HUD llama más la atención que un proyecto, está mal calibrado.
2. **Una señal, un significado.** Cada color de señal tiene exactamente un significado (ver §3). Nunca se usa como decoración.
3. **Un solo momento por vista.** El focus pull del hero es el único movimiento orquestado. El resto responde a la persona (presionar, abrir, filtrar); nada se mueve solo para lucirse.
4. **La cámara es referencia, no copia.** El HUD toma del visor de la Sony α6400 solo lo que se reconoce: `● REC` arriba a la izquierda, `RAW` y `AF-C WIDE` arriba a la derecha, lectura de exposición abajo (`(●)  1/2000  F2.8  ±0.0  ISO AUTO`). Batería, resolución, tarjeta y demás indicadores se omiten: cargan sin aportar. Lo que sí aparece se escribe como la cámara: `F2.8`, no `ƒ/2.8`.
5. **Nada de HUD dentro del HUD.** El visor lo pone la vista. El contenido (wordmark, imágenes, cards) nunca lleva esquinas de visor ni recuadros de AF propios.

Referencia de concepto: visor de una Sony α6400 grabando.

---

## 2. Marca

**Wordmark:** `riqedev` en minúscula + punto REC redondo, en la voz Display (Archivo wdth 112, wght 780, tracking −0.04em). Componente `<Wordmark />` en `src/components/shared/Wordmark.tsx`. El punto es `<RecDot />`: un círculo dibujado de 0.16em (el grosor del trazo) en `--rec`, nunca el glifo "." de la fuente.

**Monograma:** `r` + punto REC (`<Monogram />`). En íconos el glifo se recorta a su tinta y ocupa ~70% de la baldosa en 16/32px y ~60% en 180/192px, con el punto a 0.19em (compensación óptica para que sobreviva a 16px). En el dock va a 26/30px para igualar el peso visual de los íconos de 20px. Dock, favicon (`public/favicon*.png`, `favicon.ico`), `apple-touch-icon.png`. Reemplaza al logo del gato con lentes (`public/Logo.png` queda solo como referencia en `/lab`).

**Aire mínimo:** la altura de la `r` a cada lado. Sin marcos propios: el visor ya lo pone la vista.

**No:** mayúsculas, punto cuadrado, el punto en otro color, marcos de visor o recuadros de AF alrededor, contornos, degradados, sombras, itálicas. El rojo REC no se usa en ningún otro adorno (citas, bordes, links).

**Social card:** `public/og.png` (1200×630), generada desde `design/og.html`.

### Por qué esta marca (decisión 2026-11-17, preset R01 de `/lab`)

**Diagnóstico.** La marca es de una persona que es ingeniero; la fotografía es un hobby que le da carácter. La cámara funciona como **escenario** del portfolio (el HUD, el REC, el PLAYBACK), pero no puede ser la **identidad**: el wordmark y el monograma viajan solos a GitHub, LinkedIn, el blog, una firma o un favicon, sin HUD alrededor. Si la identidad depende de la cámara, fuera del portfolio dice "fotógrafo/filmmaker", que es justo lo que no se quiere.

**Decisiones recomendadas:**

1. **Minúscula: `riqedev`.** Es un handle (GitHub, blog), y en minúscula se lee como lo que es: una firma digital, cercana y de oficio. La mayúscula expandida se lee como marca de hardware (el grabado de un cuerpo de cámara), que empuja hacia el nicho equivocado. Además la minúscula tiene silueta reconocible (la `q` baja, la `d` sube); en mayúscula la palabra es un bloque uniforme.
2. **Archivo al 112%, peso ~780, tracking −0.04em.** Mantiene la familia del sistema (Archivo ya es la voz OSD), así que la marca y la interfaz son parientes sin ser iguales. Al 125% en minúscula se vuelve gorda y caricaturesca; al 100% se confunde con cualquier grotesca. 112% es presencia sin gritar. Descartadas: Inter (es la letra de la UI, la marca desaparecería), Geist (asociada al ecosistema Vercel), Space Grotesk y Unbounded (muy vistas en portfolios dev), Michroma (retro-cámara, el nicho otra vez), JetBrains Mono con cursor (cliché de "soy dev").
3. **Punto final redondo, en rojo REC.** Es la decisión clave: el punto se lee **primero como puntuación** (seguro, terminado) y solo dentro del portfolio, junto al HUD, se lee **también como el LED de grabación**. Es un guiño, no una declaración: no exige saber de cámaras para funcionar. El cuadrado se descarta porque se lee como píxel y no existe en ningún REC real. El punto se dibuja (círculo de 0.16em, el grosor del trazo) en vez de usar el glifo de la fuente, para que sea idéntico en cualquier contexto.
4. **¿"Nombre + punto de color" está trillado?** El recurso es común. Lo que lo salva acá es que tiene una segunda lectura propia (REC) y que se usa con disciplina: es el **único** rojo de la marca. Si algún día se siente gastado, la versión con punto en tinta (R02) mantiene la forma sin el acento.
5. **Monograma `r.`** en minúscula con el mismo punto rojo. A 16px sigue siendo distinguible (el punto es el ancla), es coherente con el wordmark y reemplaza al logo actual (gato con lentes) sin perder personalidad. Se descartan `R.` (monograma en R mayúscula es de los más vistos) y `RQ` (pierde la señal).
6. **La cámara queda donde está bien:** en el escenario del portfolio (HUD, REC, PLAYBACK, TAKE 01) y como guiño en la foto de Flickr. No en el logo, no en la firma, no en el avatar.

### Descartado: easter egg riQEDev

Se probó destacar las letras q-e-d (*quod erat demonstrandum*) con hover en el nombre, un `∎ q.e.d.` al cierre del `career.log` y una sección en `/system`. Enrique lo sacó (2026-11-17): se siente trillado y su vínculo real es con la demostración matemática, no con la ingeniería. No reintroducirlo.

**README de perfil** (`riqedev/riqedev`): usa el mismo wordmark, renderizado desde `design/readme-wordmark.html` (dark; los colores light están anotados en el archivo).

---

## 3. Color

Base neutral (shadcn neutral, sin tinte). El 95% de la interfaz son neutros; las señales ocupan puntos, bordes finos y texto corto.

### Neutros

| Token | Nombre | Uso | Dark | Light |
| --- | --- | --- | --- | --- |
| `--background` | Sensor | Fondo de toda vista | `oklch(0.145 0 0)` | `oklch(0.985 0.002 264)` |
| `--card` | Body | Cards, diálogos, dock | `oklch(0.19 0 0)` | `oklch(1 0 0)` |
| `--muted` | Grip | Superficies secundarias | `oklch(0.269 0 0)` | `oklch(0.96 0 0)` |
| `--border` | Hairline | Bordes, divisores | `oklch(1 0 0 / 10%)` | `oklch(0.9 0 0)` |
| `--muted-foreground` | Gris medio | Texto secundario | `oklch(0.72 0 0)` | `oklch(0.48 0 0)` |
| `--foreground` | Tinta | Texto principal | `oklch(0.985 0 0)` | `oklch(0.16 0 0)` |

### Señales

| Token | Significado | Dónde aparece | Dark | Light |
| --- | --- | --- | --- | --- |
| `--rec` | Grabando / en vivo. Marca. | Punto del wordmark, REC del Home, `NO.SIGNAL`, selección de texto | `oklch(0.65 0.23 27)` | `oklch(0.58 0.22 27)` |
| `--af` | Operativo, en curso | ONLINE, `Status: RUNNING`, cursor `> _`, "copiado" | `oklch(0.76 0.13 152)` | `oklch(0.53 0.12 152)` |
| `--info` | Catálogo, archivo, lectura | CATALOG (Work) | `oklch(0.7 0.15 255)` | `oklch(0.55 0.17 255)` |
| `--link` | Canal abierto, transmisión | OPEN FREQUENCY (Contact) | `oklch(0.82 0.11 205)` | `oklch(0.56 0.1 210)` |
| `--warn` | Calibración, atención, sistema | CALIBRATION (/system) | `oklch(0.84 0.15 85)` | `oklch(0.62 0.15 70)` |

Los semáforos de ventana (`WindowDots`) usan rec/warn/af, pero solo al interactuar con la card; en reposo son grises.

### Texto del HUD

| Token | Uso |
| --- | --- |
| `--hud-strong` (75–78%) | Etiqueta principal del HUD, valores activos |
| `--hud` (58–60%) | Estado, labels de sección |
| `--hud-faint` (42–45%) | Metadatos, valores en reposo |

Antes el HUD usaba `/40` y no se leía. Estos niveles mantienen la jerarquía y pasan contraste para texto pequeño no esencial.

### Sintaxis

`--syntax-key`, `--syntax-string`, `--syntax-punct`, `--syntax-comment`. Tienen variante light propia (los amarillos/verdes fijos de antes desaparecían sobre blanco).

**Regla:** ningún componente usa colores de paleta crudos (`red-500`, `zinc-400`, `emerald-500`). Si hace falta un color nuevo, primero se agrega como token con un significado.

---

## 4. Tipografía

Tres familias, cada una con un trabajo. Todas self-hosted vía Fontsource (sin CDN).

| Rol | Spec | Uso | Clase |
| --- | --- | --- | --- |
| **Display** | Archivo · wdth 112 · wght 780 · tracking −0.04em · leading 0.9 | Wordmark y titulares de marca (NO.SIGNAL, TAKE 01). Una vez por pantalla. | `.display` |
| **Heading** | Inter · wght 600 · tracking-tight · opsz auto | Títulos de sección y proyecto | `font-semibold tracking-tight` |
| **Body** | Inter · wght 400 · leading-relaxed · máx. 64ch · negritas 600 | Prosa y UI | (default, `font-sans`) |
| **OSD** | Archivo · wdth 84 · wght 540 · tracking 0.08em · mayúsculas · tabular-nums | HUD, etiquetas, chips, botones de sistema | `.osd` |
| **Mono** | JetBrains Mono · wght 400–700 | Código, logs, nombres de archivo, datos | `font-mono` |

**Por qué así:** en la primera pasada del upgrade todo era Archivo y en párrafos largos se veía "manchado" (grotesca de titular, formas anchas, negritas pesadas, líneas de ~110 caracteres). Ahora Inter, diseñada para pantalla y cercana al SF Pro del sistema, carga todo lo que se lee. Archivo queda solo para las dos voces de marca, donde su eje de ancho aporta carácter: expandida (grabado del cuerpo de la cámara) y semicondensada (OSD del visor).

### Escala

| Token | px | Uso |
| --- | --- | --- |
| `text-[10px]` | 10 | OSD del HUD (mobile), chips |
| `text-[11px]` | 11 | OSD del HUD (desktop), mono secundaria |
| `text-xs` | 12 | Logs, metadatos |
| `text-sm` | 14 | UI, botones |
| `text-base` | 16 | Prosa |
| `text-2xl` / `3xl` | 24 / 30 | Headings |
| `.display` | 7.5–14vw | Wordmark del hero |

Headings con `text-wrap: balance`, párrafos con `text-wrap: pretty` (global en `index.css`).

---

## 5. Componentes

| Pieza | Archivo | Notas |
| --- | --- | --- |
| `HUDFrame` | `shared/HUDFrame.tsx` | Grid técnico + borde de visor + transición de ruta (fade 150/100ms, sin blur) |
| `HUDHeader` / `HUDFooter` | `shared/HUDBar.tsx` | Props: `label`, `status`, `signal`, `live`, `center`, `right`. El footer se oculta en mobile (lo tapaba el dock) |
| `SignalDot` | `shared/hud.tsx` | Solo `live` (REC, ONLINE) pulsa |
| `ViewfinderCorners` | `shared/hud.tsx` | Esquinas de visor; `thick` para el AF |
| `FocusPull` | `shared/hud.tsx` | El momento del hero: el sujeto entra desenfocado (blur 10px) y queda nítido en 800ms |
| `FocusIndicator` | `shared/hud.tsx` | `( )` mientras enfoca, `(●)` al confirmar. Vive en la lectura de exposición del HUD, en color tinta |
| `Chip` | `shared/hud.tsx` | Filtro/toggle con `aria-pressed`. Activo = invertido (tinta sobre sensor) |
| `Kbd` | `shared/hud.tsx` | Atajos: `1–4` en el dock, `⌘K` menú, `←/→` en el modal |
| `CommandMenu` | `layout/CommandMenu.tsx` | MENU (⌘K o botón del dock): secciones, proyectos, canales, tema. cmdk vía shadcn `command` adaptado |
| `TerminalCard` + `WindowDots` | `shared/TerminalCard.tsx` | Bloque base de Profile, Work, Contact. Semáforos grises en reposo |
| `ProjectModal` | `shared/ProjectModal.tsx` | Modo PLAYBACK: contador `100-0001 / 0008`, navegación ←/→. Capturas siempre a color |
| `BioPopup` | `shared/BioPopup.tsx` | README.md completo, Radix Dialog (focus trap, Escape) |
| Íconos de marca | `icons/brand.tsx` | GitHub/LinkedIn en SVG (lucide 1.x eliminó los de marca) |

### Radios

`2px` (`rounded-xs`) en chips y etiquetas del HUD (piezas de instrumento), `12px` en cards, `16px` en diálogos y dock.

### Layout

- Zonas reservadas: `pt-24` para el HUD, `pb-28` para el dock.
- Viewport: `h-dvh`, nunca `h-screen`.
- Targets: 1512×982 (MacBook Pro 14") y 390×844.

### Elevación

Las cards usan la utilidad `.surface`: relleno plano `--card` + sombra en capas (`--shadow-card`, `--shadow-card-hover` al hover). En dark mode la sombra incluye un filo de luz interior de 1px en el borde superior. **Sin degradados en el fondo:** el brillo superior (`--sheen`) se probó y se quitó porque con varias cards en pantalla cada una sumaba una banda y el conjunto se veía sucio. Tampoco velos `from-card` sobre el contenido: el corte inferior de un scroll se hace con `<ScrollArea fade>`, que difumina solo mientras queda contenido y desaparece al llegar al final. Elementos dentro de una card (tiles, filas) van sin relleno propio: borde fino o nada, para no apilar cajas.

### Materiales

El dock es la única superficie translúcida: `bg-card/75 backdrop-blur-xl backdrop-saturate-150`. Con `prefers-reduced-transparency` pasa a sólido (`[data-material]`).

---

## 6. Movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--ease-out` / `EASE_OUT` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entradas, presión, todo lo que responde a la persona |
| `--ease-in-out` / `EASE_IN_OUT` | `cubic-bezier(0.77, 0, 0.175, 1)` | Movimiento en pantalla (círculo del cambio de tema) |
| `DURATION.press` | 160ms | `.pressable`: `scale(0.97)` en `:active` |
| `DURATION.ui` | 200ms | Tooltips, chips, filas |
| `DURATION.modal` | 280ms | Diálogos, entrada de cards |
| `DURATION.hero` | 800ms | Focus pull. Uno por vista. |

Los tokens viven en `src/index.css` (CSS) y `src/lib/motion.ts` (motion/react).

**Reglas:**
- Salir es más rápido que entrar. Nada aparece desde `scale(0)`: mínimo 0.95 + opacidad.
- Las acciones de teclado (1–4, ⌘K, ←/→) no animan la lista ni el contenido.
- Stagger de 30–80ms, no uniforme (`stagger(i)`).
- Tooltips: un solo `TooltipProvider` por grupo (350ms de delay, los vecinos abren al instante).
- Con `prefers-reduced-motion`: sin desplazamientos, pulsos ni desenfoque; el foco aparece ya confirmado.

---

## 7. Voz

- **La cámara habla en inglés.** HUD, estados y etiquetas de sistema en mayúsculas OSD, como el menú de una cámara: `REC`, `CATALOG`, `NO SIGNAL`, `Copy`. El menú ⌘K es la excepción: es para buscar, así que va en español.
- **Enrique habla en español.** Bio, descripciones y mensajes para personas, en primera persona, con verbos simples.
- Sin frases de marketing ("elevar", "potenciar", tríadas). Si una frase podría estar en cualquier portfolio, se reescribe.
- Em-dash solo en copy del HUD/marca (`// 2022 — present`). En prosa nueva, no.
- Nunca se exponen datos crudos de contacto en la UI: nombre de plataforma + acción.
