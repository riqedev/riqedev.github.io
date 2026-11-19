import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, FolderDot, Radio, Command } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Kbd } from "@/components/shared/hud";
import { Monogram } from "@/components/shared/Wordmark";
import { cn } from "@/lib/utils";
import { useCommandMenu } from "@/lib/command-menu";
import { useLocale, type Localized } from "@/lib/i18n";

const NAV_ITEMS = [
  { type: "logo", label: "HOME", href: "/", key: "1" },
  { type: "icon", icon: User, label: "PROFILE", href: "/profile", key: "2" },
  { type: "icon", icon: FolderDot, label: "WORK", href: "/work", key: "3" },
  { type: "icon", icon: Radio, label: "CONTACT", href: "/contact", key: "4" },
] as const;

const tooltipClass =
  "osd flex items-center gap-2 rounded-xs border-none bg-foreground px-2 py-1 text-[10px] text-background";

/** Atajos 1–4 para saltar de sección. Se ignoran con modificadores, en campos de texto o con un diálogo abierto. */
const useNavShortcuts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.repeat) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']"))
        return;
      if (document.querySelector("[role='dialog']")) return;
      const item = NAV_ITEMS.find((i) => i.key === e.key);
      if (item) navigate(item.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);
};

const COPY: Localized<{ nav: string; menu: string; switchTo: string }> = {
  es: {
    nav: "Principal",
    menu: "Abrir menú",
    switchTo: "Cambiar idioma a English",
  },
  en: {
    nav: "Main",
    menu: "Open menu",
    switchTo: "Switch language to Español",
  },
};

export const AppDock = () => {
  const location = useLocation();
  const { setOpen } = useCommandMenu();
  const { locale, setLocale } = useLocale();
  const t = COPY[locale];
  useNavShortcuts();

  return (
    <nav
      aria-label={t.nav}
      className="fixed bottom-6 left-1/2 z-50 w-auto -translate-x-1/2 sm:bottom-8"
    >
      <TooltipProvider>
        <Dock
          direction="middle"
          data-material
          className="mt-0 gap-1 max-[359px]:gap-0 rounded-2xl border border-border/80 bg-card/75 px-2 py-2 sm:gap-2 sm:px-3 shadow-lg shadow-black/5 backdrop-blur-xl backdrop-saturate-150 md:gap-4 md:px-5 md:py-3 dark:shadow-black/40"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <DockIcon key={item.label} className="size-9 md:size-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      aria-label={item.label.toLowerCase()}
                      aria-current={isActive ? "page" : undefined}
                      aria-keyshortcuts={item.key}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "pressable size-9 rounded-xl hover:bg-transparent md:size-10",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.type === "logo" ? (
                        <Monogram className="-translate-y-[0.07em] text-[26px] md:text-[30px]" />
                      ) : (
                        <item.icon
                          className="size-4 md:size-5"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={10}
                    showArrow={false}
                    className={tooltipClass}
                  >
                    {item.label}
                    <Kbd className="border-background/30">{item.key}</Kbd>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}

          <div
            aria-hidden="true"
            className="mx-1 h-4 w-px self-center bg-border md:h-6"
          />

          <DockIcon className="size-9 md:size-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label={t.menu}
                  aria-keyshortcuts="Meta+K Control+K"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "pressable size-9 rounded-xl text-muted-foreground hover:bg-transparent hover:text-foreground md:size-10",
                  )}
                >
                  <Command className="size-4 md:size-5" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={10}
                showArrow={false}
                className={tooltipClass}
              >
                MENU
                <Kbd className="border-background/30">⌘K</Kbd>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon className="size-9 md:size-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setLocale(locale === "es" ? "en" : "es")}
                  aria-label={t.switchTo}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "osd pressable size-9 rounded-xl text-[11px] text-muted-foreground hover:bg-transparent hover:text-foreground md:size-10 md:text-xs",
                  )}
                >
                  {locale.toUpperCase()}
                </button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={10}
                showArrow={false}
                className={tooltipClass}
              >
                {locale === "es" ? "ES → EN" : "EN → ES"}
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon className="size-9 md:size-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <AnimatedThemeToggler className="pressable size-9 rounded-xl text-muted-foreground hover:bg-transparent hover:text-foreground md:size-10" />
              </TooltipTrigger>
              <TooltipContent
                sideOffset={10}
                showArrow={false}
                className={tooltipClass}
              >
                THEME
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </nav>
  );
};
