import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Code2, Copy, FolderDot, Home, Moon, Radio, Sun, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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

const SECTIONS = [
  { label: "Home", href: "/", icon: Home, key: "1" },
  { label: "Profile", href: "/profile", icon: User, key: "2" },
  { label: "Work", href: "/work", icon: FolderDot, key: "3" },
  { label: "Contact", href: "/contact", icon: Radio, key: "4" },
] as const;

/**
 * MENU (⌘K). Como el botón MENU de la cámara: un solo lugar para saltar a una sección,
 * abrir un proyecto del archivo, usar un canal o cambiar el tema. Sin animación de lista:
 * se usa con teclado y tiene que responder al instante.
 */
const CommandMenuDialog = ({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const isDark =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

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
        <DialogTitle className="sr-only">Menú</DialogTitle>
        <DialogDescription className="sr-only">Busca una sección, un proyecto o un canal de contacto.</DialogDescription>

        <Command loop>
          <div className="osd flex items-center justify-between border-b border-border px-4 py-2 text-[10px] text-hud">
            <span className="flex items-center gap-2">
              <SignalDot signal="warn" /> MENU
            </span>
            <span className="text-hud-faint">riqedev</span>
          </div>
          <CommandInput placeholder="Buscar sección, proyecto o canal..." />
          <CommandList>
            <CommandEmpty>[ NO MATCH ]</CommandEmpty>

            <CommandGroup heading="Ir a">
              {SECTIONS.map((s) => (
                <CommandItem key={s.href} value={`ir ${s.label}`} onSelect={() => run(() => navigate(s.href))}>
                  <s.icon aria-hidden="true" />
                  {s.label}
                  <CommandShortcut className="pointer-coarse:hidden">
                    <Kbd>{s.key}</Kbd>
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Archivo">
              {projectsData.map((p) => (
                <CommandItem
                  key={p.title}
                  value={`${p.title} ${p.tags.join(" ")}`}
                  onSelect={() => run(() => navigate("/work", { state: { open: p.title } }))}
                >
                  <Code2 aria-hidden="true" />
                  <span className="truncate">{p.title}</span>
                  <CommandShortcut className="hidden font-mono text-[11px] sm:flex">{p.tags[0]}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Canales">
              <CommandItem value="copiar correo email" onSelect={copyEmail}>
                {copied ? <Check className="text-af" aria-hidden="true" /> : <Copy aria-hidden="true" />}
                <span aria-live="polite">{copied ? "Correo copiado" : "Copiar correo"}</span>
              </CommandItem>
              {[...CHANNELS.filter((c) => !c.copy), FLICKR].map((c) => (
                <CommandItem
                  key={c.label}
                  value={`abrir ${c.label}`}
                  onSelect={() => run(() => window.open(c.href, "_blank", "noopener,noreferrer"))}
                >
                  <c.icon size={16} aria-hidden="true" />
                  {c.label}
                  <CommandShortcut className="font-mono text-[11px]">↗</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Sistema">
              <CommandItem value="tema theme claro oscuro" onSelect={() => run(() => setTheme(isDark ? "light" : "dark"))}>
                {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
                {isDark ? "Tema claro" : "Tema oscuro"}
              </CommandItem>
            </CommandGroup>
          </CommandList>

          <div className="osd hidden items-center gap-4 border-t border-border px-4 py-2.5 text-[10px] text-hud-faint sm:flex">
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> Navegar
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd> Abrir
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>esc</Kbd> Cerrar
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
