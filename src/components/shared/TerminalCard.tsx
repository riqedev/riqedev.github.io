import { ReactNode } from "react";
import { cn } from "@/lib/utils";
// CORRECCIÓN AQUÍ: Agregamos 'type' porque LucideIcon no existe en el JS final, solo en TS
import { type LucideIcon } from "lucide-react";
import { motion, type HTMLMotionProps } from "framer-motion";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm dark:shadow-md transition-all duration-300",
        className,
      )}
      {...props}
    >
      {/* HEADER TIPO TERMINAL */}
      <div className="flex items-center justify-between px-4 py-3 bg-background/50 dark:bg-background/10 border-b border-border shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          {/* Semáforos */}
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 " />
            <div className="w-2 h-2 rounded-full bg-yellow-500 " />
            <div className="w-2 h-2 rounded-full bg-emerald-500 " />
          </div>

          {/* Título e Icono */}
          <div className="flex items-center gap-2 ml-2 text-muted-foreground">
            {Icon && <Icon size={14} />}
            <span className="text-xs font-mono font-medium uppercase tracking-wider truncate max-w-[150px]">
              {title}
            </span>
          </div>
        </div>

        {headerAction && <div>{headerAction}</div>}
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 min-h-0 relative z-10 bg-background/50 dark:bg-background/10">{children}</div>
    </motion.div>
  );
};
