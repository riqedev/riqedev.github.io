# riqedev.github.io

Portfolio personal de Enrique (**riqedev**), Software Engineer. Publicado en [riqedev.github.io](https://riqedev.github.io).

**TAKE 01: Engineering through the lens.** La interfaz se comporta como el visor de una cámara grabando: un HUD tenue enmarca el contenido, y el contenido es la ingeniería (experiencia, proyectos, stack, contacto).

## Stack

- Vite 8 (Rolldown) + React 19 + TypeScript 5.9 (strict)
- Tailwind CSS 4.3, tokens en `src/index.css`
- shadcn/ui sobre `radix-ui` (Dialog, Tooltip, ScrollArea, Slot) + cmdk para el menú ⌘K
- motion 14 (`motion/react`), lucide-react 1.x
- Inter, Archivo y JetBrains Mono self-hosted con Fontsource
- Deploy en GitHub Pages vía GitHub Actions

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de producción
npm run lint
npm run typecheck
```

Rutas internas, solo disponibles con `npm run dev` (no se publican):

- `/system`: spec sheet del design system, construido con los componentes reales.
- `/lab`: laboratorio de wordmark y monograma.

## Estructura

```
src/
  components/
    views/       Home, Profile, Work, Contact, NotFound (+ DesignSystem, WordmarkLab en dev)
    shared/      HUDFrame, HUDBar, primitivas del visor (hud.tsx), TerminalCard, ProjectModal
    layout/      AppDock, CommandMenu (⌘K)
    ui/          componentes shadcn/magicui adaptados
  lib/           tokens de movimiento, señales, canales de contacto
  types/         datos de proyectos y certificaciones
public/          assets estáticos, og.png, capturas de proyectos (WebP)
design/          fuentes HTML de la imagen OG y del wordmark del README de perfil
```

## Design system

Las reglas de marca, color, tipografía, componentes, movimiento y voz están en [`DESIGN.md`](./DESIGN.md).

Atajos del sitio: `1–4` para navegar, `⌘K` para abrir el menú, `←/→` para recorrer proyectos en el modal.
