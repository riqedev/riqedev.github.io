import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Barras de HUD compartidas por todas las vistas. Centralizan posicionamiento,
 * tipografía mono y z-index para que las 5 vistas no diverjan al editarse.
 * El contenido específico (badges, coords, contadores) se inyecta por props.
 */

interface HUDHeaderProps {
  /** Etiqueta principal, arriba a la izquierda (RIQEDEV / ARCHIVE / TRANSMIT…). */
  label: string;
  /** Texto de estado junto al punto pulsante (REC / ONLINE / CATALOG…). */
  status: string;
  /** Clase de color del punto de estado, ej. "bg-red-500". */
  dotClassName: string;
  /** Contenido centrado (solo Home: coordenadas). Oculto en <md. */
  center?: ReactNode;
  /** Cluster derecho (badges, contadores, versión…). */
  right?: ReactNode;
}

export const HUDHeader = ({ label, status, dotClassName, center, right }: HUDHeaderProps) => (
  <div className="absolute top-7 sm:top-8 md:top-9 w-full px-7 md:px-9 z-20 flex justify-between items-start text-[0.55rem] md:text-[0.65rem] font-mono tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
    <div className="flex flex-col gap-2 text-left">
      <span className="text-foreground/55 tracking-[0.2em]">{label}</span>
      <div className="flex items-center gap-2">
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotClassName)} />
        <span className="text-foreground/45">{status}</span>
      </div>
    </div>

    {center && (
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block text-center opacity-40">{center}</div>
    )}

    {right && <div className="flex flex-col items-end gap-1 text-right">{right}</div>}
  </div>
);

interface HUDFooterProps {
  left: ReactNode;
  right: ReactNode;
}

export const HUDFooter = ({ left, right }: HUDFooterProps) => (
  <div className="absolute bottom-7 sm:bottom-8 md:bottom-9 w-full px-7 md:px-9 flex justify-between items-end text-[0.55rem] md:text-[0.65rem] font-mono text-muted-foreground/40 uppercase pointer-events-none z-10">
    <span>{left}</span>
    <span>{right}</span>
  </div>
);
