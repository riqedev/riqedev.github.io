import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE_OUT } from "@/lib/motion";

/**
 * Semáforos de ventana. En reposo se ven grises (como una ventana inactiva de macOS) y
 * toman color al interactuar con la card: con 8+ cards en pantalla, 24 puntos de color
 * competían con el contenido.
 */
export const WindowDots = ({ className }: { className?: string }) => (
  <div aria-hidden="true" className={cn("flex shrink-0 gap-1.5", className)}>
    <span className="size-2 rounded-full bg-muted-foreground/25 transition-colors duration-200 group-hover/card:bg-rec group-focus-within/card:bg-rec" />
    <span className="size-2 rounded-full bg-muted-foreground/25 transition-colors duration-200 group-hover/card:bg-warn group-focus-within/card:bg-warn" />
    <span className="size-2 rounded-full bg-muted-foreground/25 transition-colors duration-200 group-hover/card:bg-af group-focus-within/card:bg-af" />
  </div>
);

interface TerminalCardProps extends HTMLMotionProps<"div"> {
  title: string;
  children: ReactNode;
  icon?: LucideIcon;
  headerAction?: ReactNode;
  delay?: number;
}

export const TerminalCard = ({
  title,
  children,
  icon: Icon,
  className,
  headerAction,
  delay = 0,
  ...props
}: TerminalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: DURATION.modal, ease: EASE_OUT }}
      className={cn(
        "group/card surface flex flex-col overflow-hidden rounded-xl border border-border transition-[border-color,box-shadow] duration-200",
        className,
      )}
      {...props}
    >
      <div className="relative z-20 flex h-10 shrink-0 items-center justify-between gap-3 border-b border-border px-4">
        <div className="flex min-w-0 items-center gap-3">
          <WindowDots />
          <div className="flex min-w-0 items-center gap-2 text-hud">
            {Icon && <Icon size={13} className="shrink-0" aria-hidden="true" />}
            <span className="truncate font-mono text-[11px] font-medium tracking-wide">{title}</span>
          </div>
        </div>

        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>

      <div className="relative z-10 min-h-0 flex-1">{children}</div>
    </motion.div>
  );
};
