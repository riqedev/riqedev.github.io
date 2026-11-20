/** Cada señal del visor tiene un único significado en todo el sitio (ver /system). */
export const SIGNALS = {
  rec: { className: "bg-rec", meaning: "Grabando / en vivo. Situacional del TAKE 01 (REC, NO●SIGNAL)." },
  af: { className: "bg-af", meaning: "Operativo, en curso. Es la luz del punto de la marca." },
  info: { className: "bg-info", meaning: "Catálogo, archivo, lectura." },
  link: { className: "bg-link", meaning: "Canal abierto, transmisión." },
  warn: { className: "bg-warn", meaning: "Calibración, atención, sistema." },
} as const;

export type Signal = keyof typeof SIGNALS;
