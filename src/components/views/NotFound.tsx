import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { RecDot } from "@/components/shared/Wordmark";
import { useCopy, type Localized } from "@/lib/i18n";

const COPY: Localized<{ body: string }> = {
  es: { body: "La toma que buscas no existe en este rollo. El visor está vacío." },
  en: { body: "The shot you're looking for isn't on this roll. The viewfinder is empty." },
};

export const NotFound = () => {
  const t = useCopy(COPY);
  return (
    <HUDFrame className="justify-center">
      <HUDHeader
        label="ERR_404"
        status="NO SIGNAL"
        signal="rec"
        right={<span className="text-hud-strong">FRAME LOST</span>}
      />

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
          <span className="osd text-[10px] md:text-xs tracking-[0.3em] text-hud">
            // 404 // scene not found
          </span>
          <h1 className="display text-[13vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] text-foreground">
            NO<RecDot className="ml-[0.055em] mr-[0.018em]" />SIGNAL
          </h1>
          <p className="text-xs md:text-sm font-mono text-muted-foreground max-w-md mt-2">
            {t.body}
          </p>
        </div>

        <Link
          to="/"
          className="group osd pressable flex h-9 items-center gap-3 rounded-md border border-border px-4 text-[10px] tracking-[0.2em] text-muted-foreground outline-none hover:border-foreground/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 md:text-xs"
        >
          <ArrowLeft size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Rec from start</span>
        </Link>
      </motion.div>

      <HUDFooter left="BARS & TONE" right="[ 000% ]" />
    </HUDFrame>
  );
};
