import { Dock, DockIcon } from "@/components/ui/dock";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { User, FolderDot, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NAV_ITEMS = [
  { type: "logo", label: "HOME", href: "/" },
  { type: "icon", icon: User, label: "PROFILE", href: "/profile" },
  { type: "icon", icon: FolderDot, label: "WORK", href: "/work" },
  { type: "icon", icon: Radio, label: "CONTACT", href: "/contact" },
] as const;

export const AppDock = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto">
      <TooltipProvider>
        <Dock
          direction="middle"
          className="bg-card backdrop-blur-md border border-border/80 px-3 md:px-6 py-2 md:py-3 rounded-2xl shadow-sm gap-2 md:gap-4"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <DockIcon key={item.label} className="size-9 md:size-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-9 md:size-10 rounded-xl transition-colors hover:bg-transparent",
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.type === "logo" ? (
                        <img
                          src="/Logo.png"
                          alt="Logo"
                          className={cn(
                            "size-4 md:size-5 object-contain transition-opacity dark:invert",
                            isActive ? "opacity-100" : "opacity-60 hover:opacity-100",
                          )}
                        />
                      ) : (
                        item.icon && <item.icon className="size-4 md:size-5" />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={10}
                    showArrow={false}
                    className="font-mono text-[10px] uppercase tracking-widest bg-foreground text-background border-none rounded-sm px-2 py-0.5"
                  >
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}

          <div className="h-4 md:h-6 w-px bg-border/30 mx-1 self-center" />

          {/* SECCIÓN THEME TOGGLE (ANIMADO) */}
          <DockIcon className="size-9 md:size-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="size-9 md:size-10 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground transition-colors hover:bg-transparent">
                  <AnimatedThemeToggler className="cursor-pointer" />
                </div>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={10}
                showArrow={false}
                className="font-mono text-[10px] uppercase tracking-widest bg-foreground text-background border-none rounded-sm px-2 py-0.5"
              >
                <p>THEME</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
};
