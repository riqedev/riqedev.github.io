import { useEffect, useState, type ReactNode } from "react";
import { LOCALE_STORAGE_KEY, LocaleContext, detectLocale, type Locale } from "@/lib/i18n";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  // `lang` correcto para lectores de pantalla, traducción del navegador y separación silábica.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Sin storage: el cambio vale solo para esta visita.
    }
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}
