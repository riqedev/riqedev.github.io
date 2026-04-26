import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { HUDFrame } from "@/components/shared/HUDFrame";

export const NotFound = () => {
  return (
    <HUDFrame className="justify-center">
      {/* HUD HEADER */}
      <div className="absolute top-7 sm:top-8 md:top-9 w-full px-7 md:px-9 z-20 flex justify-between items-start text-[0.55rem] md:text-[0.65rem] font-mono tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
        <div className="flex flex-col gap-2 text-left">
          <span className="text-foreground/55 tracking-[0.2em]">ERR_404</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-foreground/45">NO SIGNAL</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-foreground/55">FRAME LOST</span>
        </div>
      </div>

      {/* SMPTE-style barras de color (referencia técnica clásica de TV) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
      >
        {["#c8c800", "#00c8c8", "#00c800", "#c800c8", "#c80000", "#0000c8", "#c8c8c8"].map((c) => (
          <div key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center select-none px-6 gap-8"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase">
            // 404 // scene not found
          </span>
          <h1 className="text-[18vw] sm:text-[16vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] font-bold tracking-tighter text-foreground">
            NO<span className="text-primary">.</span>SIGNAL
          </h1>
          <p className="text-xs md:text-sm font-mono text-muted-foreground max-w-md mt-2">
            La toma que buscas no existe en este rollo. El visor está vacío.
          </p>
        </div>

        <Link
          to="/"
          className="group flex items-center gap-3 px-4 py-2 border border-border/60 hover:border-primary/60 hover:text-primary text-muted-foreground rounded-md font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Rec from start</span>
        </Link>
      </motion.div>

      {/* HUD FOOTER */}
      <div className="absolute bottom-7 sm:bottom-8 md:bottom-9 w-full px-7 md:px-9 flex justify-between items-end text-[0.55rem] md:text-[0.65rem] font-mono text-muted-foreground/40 uppercase pointer-events-none z-10">
        <span>BARS &amp; TONE</span>
        <span>[ 000% ]</span>
      </div>
    </HUDFrame>
  );
};
