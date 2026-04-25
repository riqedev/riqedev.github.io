import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marco visual común a las tres vistas: grid técnico de fondo + esquinas de visor.
 * Las views proyectan encima sus barras de HUD (header/footer) y el contenido principal.
 */
export const HUDFrame = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section
    className={cn(
      "relative h-screen w-full flex flex-col items-center overflow-hidden bg-background text-foreground transition-colors duration-500",
      className,
    )}
  >
    {/* Grid técnico de fondo */}
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
    />

    {/* Visor: borde tenue + 4 esquinas reforzadas */}
    <div
      aria-hidden="true"
      className="absolute inset-2 sm:inset-3 md:inset-4 border-[0.5px] border-border/30 pointer-events-none z-10 select-none"
    >
      <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-primary/30" />
      <div className="absolute -top-px -right-px w-4 h-4 border-t border-r border-primary/30" />
      <div className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-primary/30" />
      <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-primary/30" />
    </div>

    {children}
  </section>
);
