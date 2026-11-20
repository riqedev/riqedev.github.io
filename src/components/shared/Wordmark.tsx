import { cn } from "@/lib/utils";
import { BRAND_GEOMETRY as G, type BrandMark } from "@/lib/brand-geometry";

/**
 * Un trazo de la marca dibujado en em, con la geometría exacta del kit (riqedev-brand): escala con el
 * font-size, se apoya en la línea base y lleva el kerning propio que el texto vivo no puede tener.
 * `fromOrigin` arranca en el origen tipográfico (como el texto); sin él, en la tinta (íconos).
 */
const Mark = ({ mark, className, fromOrigin = true }: { mark: BrandMark; className?: string; fromOrigin?: boolean }) => {
  const [ix0, y0, x1, y1] = mark.box;
  const x0 = fromOrigin ? 0 : ix0;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`${x0} ${y0} ${x1 - x0} ${y1 - y0}`}
      className={cn("shrink-0", className)}
      style={{ width: `${(x1 - x0) / 1000}em`, height: `${(y1 - y0) / 1000}em`, verticalAlign: `${-y1 / 1000}em` }}
    >
      <path fill="currentColor" d={mark.d} />
      <circle className="fill-rec" cx={mark.dot.cx} cy={mark.dot.cy} r={mark.dot.r} />
    </svg>
  );
};

/**
 * Punto de la marca en texto vivo (titulares como NO●SIGNAL): círculo dibujado del grosor del trazo, nunca
 * el glifo ".". Centrado donde Archivo pone su propio punto y bajando lo mismo que las letras redondas.
 * Es el único rojo de la marca.
 */
export const RecDot = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cn("-ml-[0.04em] inline-block size-[0.17em] shrink-0 rounded-full bg-rec align-[-0.012em]", className)}
  />
);

/**
 * Wordmark oficial (R02): `riqedev` + punto, como SVG. Peso 780 sobre claro y 770 sobre oscuro (la tinta
 * clara se ve más gruesa). `small` para anchos bajo 120 px: tracking más abierto y punto de ícono.
 */
export const Wordmark = ({ className, small = false }: { className?: string; small?: boolean }) => (
  <span className={cn("inline-block whitespace-nowrap leading-none", className)}>
    <span className="sr-only">riqedev</span>
    <Mark mark={small ? G.wordmarkSmall : G.wordmark} className="inline dark:hidden" />
    <Mark mark={small ? G.wordmarkSmallDark : G.wordmarkDark} className="hidden dark:inline" />
  </span>
);

/** Monograma oficial: `r` + punto, con la geometría de ícono (punto de 0.19em). Para el dock. */
export const Monogram = ({ className }: { className?: string }) => (
  <span className={cn("inline-flex items-center justify-center", className)} aria-hidden="true">
    <Mark mark={G.monogramIcon} fromOrigin={false} className="block dark:hidden" />
    <Mark mark={G.monogramIconDark} fromOrigin={false} className="hidden dark:block" />
  </span>
);
