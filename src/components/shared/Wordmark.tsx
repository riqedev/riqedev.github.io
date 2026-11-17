import { cn } from "@/lib/utils";

/**
 * Punto REC: círculo dibujado (no el glifo de la fuente) del grosor del trazo, para que
 * sea idéntico en cualquier tamaño y contexto. Se lee primero como punto final y, junto
 * al HUD, como el LED de grabación. Es el único rojo de la marca.
 */
export const RecDot = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cn("ml-[0.05em] inline-block size-[0.16em] shrink-0 rounded-full bg-rec align-baseline", className)}
  />
);

/** Wordmark oficial: `riqedev` + punto REC, en la voz Display. */
export const Wordmark = ({ className }: { className?: string }) => (
  <span className={cn("display whitespace-nowrap", className)}>
    riqedev
    <RecDot />
  </span>
);

/** Monograma oficial: `r` + punto REC. Para dock, favicon y avatares. */
export const Monogram = ({ className }: { className?: string }) => (
  <span className={cn("display inline-flex items-baseline leading-none", className)} aria-hidden="true">
    r
    <RecDot />
  </span>
);
