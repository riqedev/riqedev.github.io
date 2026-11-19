import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Code2,
  Copy,
  FolderDot,
  Home,
  Languages,
  Moon,
  Radio,
  Sun,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd, SignalDot } from "@/components/shared/hud";
import { useTheme } from "@/components/theme-provider";
import { CHANNELS, EMAIL, FLICKR } from "@/lib/channels";
import { CommandMenuContext } from "@/lib/command-menu";
import { projectsData } from "@/types/generalTypes";
import { useLocale, type Localized } from "@/lib/i18n";

const SECTIONS = [
  { label: "Home", href: "/", icon: Home, key: "1" },
  { label: "Profile", href: "/profile", icon: User, key: "2" },
  { label: "Work", href: "/work", icon: FolderDot, key: "3" },
  { label: "Contact", href: "/contact", icon: Radio, key: "4" },
] as const;

const COPY: Localized<
  Record<
    | "title"
    | "description"
    | "placeholder"
    | "goTo"
    | "archive"
    | "channels"
    | "system"
    | "copy"
    | "copied"
    | "light"
    | "dark"
    | "language"
    | "navigate"
    | "open"
    | "close",
    string
  >
> = {
  es: {
    title: "Menú",
    description: "Busca una sección, un proyecto o un canal de contacto.",
    placeholder: "Buscar sección, proyecto o canal...",
    goTo: "Ir a",
    archive: "Archivo",
    channels: "Canales",
    system: "Sistema",
    copy: "Copiar correo",
    copied: "Correo copiado",
    light: "Tema claro",
    dark: "Tema oscuro",
    language: "Ver en English",
    navigate: "Navegar",
    open: "Abrir",
    close: "Cerrar",
  },
  en: {
    title: "Menu",
    description: "Search for a section, a project or a contact channel.",
    placeholder: "Search sections, projects or channels...",
    goTo: "Go to",
    archive: "Archive",
    channels: "Channels",
    system: "System",
    copy: "Copy email",
    copied: "Email copied",
    light: "Light theme",
    dark: "Dark theme",
    language: "Ver en Español",
    navigate: "Navigate",
    open: "Open",
    close: "Close",
  },
};

/**
 * MENU (⌘K). Como el botón MENU de la cámara: un solo lugar para saltar a una sección,
 * abrir un proyecto del archivo, usar un canal o cambiar el tema. Sin animación de lista:
 * se usa con teclado y tiene que responder al instante.
 */
const CommandMenuDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = COPY[locale];
  const [copied, setCopied] = useState(false);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Sin permiso de portapapeles: no hacemos nada, el canal sigue disponible en /contact.
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => {
          // En táctil no enfocamos el buscador: abriría el teclado y taparía medio menú. Se navega
          // tocando; quien quiera buscar toca el campo. El foco queda en el diálogo (Esc y trap siguen).
          if (window.matchMedia("(pointer: coarse)").matches) {
            e.preventDefault();
            (e.currentTarget as HTMLElement | null)?.focus();
          }
        }}
        className="top-[18dvh] translate-y-0 gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 shadow-2xl sm:max-w-xl"
      >
        <DialogTitle className="sr-only">{t.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {t.description}
        </DialogDescription>

        <Command loop>
          <div className="osd flex items-center justify-between border-b border-border px-4 py-2 text-[10px] text-hud">
            <span className="flex items-center gap-2">
              <SignalDot signal="warn" /> MENU
            </span>
            <span className="text-hud-faint">riqedev</span>
          </div>
          <CommandInput placeholder={t.placeholder} />
          <CommandList>
            <CommandEmpty>[ NO MATCH ]</CommandEmpty>

            <CommandGroup heading={t.goTo}>
              {SECTIONS.map((s) => (
                <CommandItem
                  key={s.href}
                  value={`ir go ${s.label}`}
                  onSelect={() => run(() => navigate(s.href))}
                >
                  <s.icon aria-hidden="true" />
                  {s.label}
                  <CommandShortcut className="pointer-coarse:hidden">
                    <Kbd>{s.key}</Kbd>
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading={t.archive}>
              {projectsData.map((p) => (
                <CommandItem
                  key={p.title}
                  value={`${p.title} ${p.tags.join(" ")}`}
                  onSelect={() =>
                    run(() => navigate("/work", { state: { open: p.title } }))
                  }
                >
                  <Code2 aria-hidden="true" />
                  <span className="truncate">{p.title}</span>
                  <CommandShortcut className="hidden font-mono text-[11px] sm:flex">
                    {p.tags[0]}
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading={t.channels}>
              <CommandItem
                value="copiar correo copy email"
                onSelect={copyEmail}
              >
                {copied ? (
                  <Check className="text-af" aria-hidden="true" />
                ) : (
                  <Copy aria-hidden="true" />
                )}
                <span aria-live="polite">{copied ? t.copied : t.copy}</span>
              </CommandItem>
              {[...CHANNELS.filter((c) => !c.copy), FLICKR].map((c) => (
                <CommandItem
                  key={c.label}
                  value={`abrir open ${c.label}`}
                  onSelect={() =>
                    run(() =>
                      window.open(c.href, "_blank", "noopener,noreferrer"),
                    )
                  }
                >
                  <c.icon size={16} aria-hidden="true" />
                  {c.label}
                  <CommandShortcut className="font-mono text-[11px]">
                    ↗
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading={t.system}>
              <CommandItem
                value="tema theme claro oscuro light dark"
                onSelect={() => run(() => setTheme(isDark ? "light" : "dark"))}
              >
                {isDark ? (
                  <Sun aria-hidden="true" />
                ) : (
                  <Moon aria-hidden="true" />
                )}
                {isDark ? t.light : t.dark}
              </CommandItem>
              <CommandItem
                value="idioma language english español"
                onSelect={() =>
                  run(() => setLocale(locale === "es" ? "en" : "es"))
                }
              >
                <Languages aria-hidden="true" />
                {t.language}
              </CommandItem>
            </CommandGroup>
          </CommandList>

          <div className="osd hidden items-center gap-4 border-t border-border px-4 py-2.5 text-[10px] text-hud-faint sm:flex">
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> {t.navigate}
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd> {t.open}
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>esc</Kbd> {t.close}
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export const CommandMenuProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandMenuContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandMenuDialog open={open} setOpen={setOpen} />
    </CommandMenuContext.Provider>
  );
};
