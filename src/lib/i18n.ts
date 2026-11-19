import { createContext, useContext } from "react";

/**
 * Idioma del sitio. Regla: el HUD, los chips, los botones del visor y los identificadores
 * (career.log, package.json, tags de stack) van siempre en inglés, como el menú de una cámara
 * o el código. Lo que se lee como frase sigue el idioma del lector.
 */
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Debe coincidir con la key del script inline de index.html (aplica `lang` antes del paint). */
export const LOCALE_STORAGE_KEY = "portfolio-locale";

export const LOCALE_NAMES: Record<Locale, string> = { es: "Español", en: "English" };

export const detectLocale = (): Locale => {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // Storage bloqueado: seguimos con el idioma del navegador.
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
};

/** Texto traducible: un valor por idioma. */
export type Localized<T = string> = Record<Locale, T>;

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleState>({ locale: "es", setLocale: () => {} });

export const useLocale = () => useContext(LocaleContext);

/** Devuelve la versión del idioma activo: `const t = useCopy(COPY)`. */
export const useCopy = <T>(copy: Localized<T>): T => copy[useLocale().locale];
