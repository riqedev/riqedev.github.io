import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { SIGNALS, type Signal } from "@/lib/signals";
import { useCopy } from "@/lib/i18n";

/**
 * Primitivas del visor. Son las piezas mínimas del lenguaje TAKE 01 y se documentan
 * en DESIGN.md. Si una vista necesita algo "tipo HUD", se arma con esto.
 */


export const SignalDot = ({ signal, live = false, className }: { signal: Signal; live?: boolean; className?: string }) => (
  <span
    aria-hidden="true"
    className={cn("inline-block size-1.5 shrink-0 rounded-full", SIGNALS[signal].className, live && "animate-pulse", className)}
  />
);

/** Las 4 esquinas reforzadas de un visor. Se posiciona sobre su contenedor relativo. */
export const ViewfinderCorners = ({
  size = "size-4",
  thick = false,
  className,
}: {
  size?: string;
  thick?: boolean;
  className?: string;
}) => {
  const t = thick ? "border-t-2" : "border-t";
  const b = thick ? "border-b-2" : "border-b";
  const l = thick ? "border-l-2" : "border-l";
  const r = thick ? "border-r-2" : "border-r";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 text-primary/30", className)}>
      <span className={cn("absolute -top-px -left-px border-current", t, l, size)} />
      <span className={cn("absolute -top-px -right-px border-current", t, r, size)} />
      <span className={cn("absolute -bottom-px -left-px border-current", b, l, size)} />
      <span className={cn("absolute -right-px -bottom-px border-current", b, r, size)} />
    </div>
  );
};

/**
 * Focus pull: el sujeto entra desenfocado y se vuelve nítido. Es el único momento
 * orquestado del sitio. `onFocused` avisa cuando terminó (para encender el indicador de foco).
 */
export const FocusPull = ({
  children,
  onFocused,
  className,
}: {
  children: ReactNode;
  onFocused?: () => void;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, filter: "blur(10px)", scale: 1.015 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: DURATION.hero, ease: EASE_OUT }}
      onAnimationComplete={onFocused}
    >
      {children}
    </motion.div>
  );
};

/**
 * Indicador de foco de Sony: `(●)` con AF-C confirmado. Mientras busca foco solo se ven
 * los paréntesis. Va en el HUD (no alrededor del sujeto) para no duplicar el visor.
 */
export const FocusIndicator = ({ locked, className }: { locked: boolean; className?: string }) => {
  const t = useCopy({ es: { locked: "Foco confirmado", seeking: "Enfocando" }, en: { locked: "Focus locked", seeking: "Focusing" } });
  return (
  <span className={cn("inline-flex items-center font-mono text-[0.95em] tracking-normal", className)}>
    <span aria-hidden="true">(</span>
    <span
      aria-hidden="true"
      className={cn(
        "mx-px inline-block size-[0.55em] rounded-full bg-current transition-opacity duration-150",
        locked ? "opacity-100" : "opacity-0",
      )}
    />
    <span aria-hidden="true">)</span>
    <span className="sr-only">{locked ? t.locked : t.seeking}</span>
  </span>
  );
};

interface ChipProps extends ComponentProps<"button"> {
  active?: boolean;
}

/** Chip de filtro / toggle. Siempre `aria-pressed`. */
export const Chip = ({ active = false, className, ...props }: ChipProps) => (
  <button
    type="button"
    aria-pressed={active}
    className={cn(
      "osd pressable h-6 shrink-0 whitespace-nowrap rounded-xs border px-2 text-[10px] outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
      active
        ? "border-foreground/60 bg-foreground text-background"
        : "border-border text-hud hover:border-foreground/30 hover:text-foreground",
      className,
    )}
    {...props}
  />
);

/** Tecla de atajo. */
export const Kbd = ({ children, className }: { children: ReactNode; className?: string }) => (
  <kbd
    className={cn(
      "inline-flex h-4 min-w-4 items-center justify-center rounded-xs border border-current/25 px-1 font-mono text-[9px] leading-none opacity-70",
      className,
    )}
  >
    {children}
  </kbd>
);
