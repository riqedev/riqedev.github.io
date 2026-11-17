import type { Transition } from "motion/react";

/**
 * Espejo en TS de los tokens de movimiento de index.css (--ease-out, --ease-in-out).
 * Todo lo animado con motion/react debe salir de aquí para que la UI tenga un solo pulso.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export const DURATION = {
  /** Feedback de presión, hovers */
  press: 0.16,
  /** Tooltips, chips, popovers pequeños */
  ui: 0.2,
  /** Modales, entradas de contenido */
  modal: 0.28,
  /** Momento orquestado (hero, AF lock). Uno por vista, como máximo. */
  hero: 0.8,
} as const;

/** Entrada estándar de contenido: sube 8px y aparece. Nunca desde scale(0). */
export const enter = (delay = 0): { initial: object; animate: object; transition: Transition } => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.modal, ease: EASE_OUT, delay },
});

/** Stagger no uniforme (30–80ms) para grupos: los primeros ítems más separados. */
export const stagger = (index: number) => Math.min(index, 6) * 0.045 + (index > 0 ? 0.02 : 0);
