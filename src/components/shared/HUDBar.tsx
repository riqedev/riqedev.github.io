import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SignalDot } from "@/components/shared/hud";
import type { Signal } from "@/lib/signals";

/**
 * Barras de HUD compartidas por todas las vistas. Centralizan posicionamiento,
 * tipografía OSD y z-index para que las vistas no diverjan al editarse.
 * El contenido específico (badges, coords, contadores) se inyecta por props.
 */

interface HUDHeaderProps {
  /** Etiqueta principal, arriba a la izquierda (RIQEDEV / ARCHIVE / TRANSMIT…). */
  label: string;
  /** Texto de estado junto al punto de señal (REC / ONLINE / CATALOG…). */
  status: string;
  /** Señal semántica del estado. Ver SIGNALS en hud.tsx. */
  signal: Signal;
  /** Pulsa el punto. Reservado para estados "en vivo" (REC, ONLINE). */
  live?: boolean;
  /** Contenido centrado (solo Home: coordenadas). Oculto en <md. */
  center?: ReactNode;
  /** Cluster derecho (badges, contadores, versión…). */
  right?: ReactNode;
}

export const HUDHeader = ({ label, status, signal, live = false, center, right }: HUDHeaderProps) => (
  <div className="osd pointer-events-none absolute top-7 z-20 flex w-full items-start justify-between px-7 text-[10px] text-hud-faint sm:top-8 md:top-9 md:px-9 md:text-[11px]">
    <div className="flex flex-col gap-1.5 text-left">
      <span className="tracking-[0.2em] text-hud-strong">{label}</span>
      <div className="flex items-center gap-2">
        <SignalDot signal={signal} live={live} />
        <span className="text-hud">{status}</span>
      </div>
    </div>

    {center && <div className="absolute left-1/2 hidden -translate-x-1/2 text-center md:block">{center}</div>}

    {right && <div className="flex flex-col items-end gap-1.5 text-right">{right}</div>}
  </div>
);

interface HUDFooterProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
}

/** En mobile el dock ocupa el borde inferior: el footer se oculta para no quedar tapado. */
export const HUDFooter = ({ left, right, className }: HUDFooterProps) => (
  <div
    className={cn(
      "osd pointer-events-none absolute bottom-7 z-10 hidden w-full items-end justify-between px-7 text-[10px] text-hud-faint sm:bottom-8 sm:flex md:bottom-9 md:px-9 md:text-[11px]",
      className,
    )}
  >
    <span>{left}</span>
    <span>{right}</span>
  </div>
);
