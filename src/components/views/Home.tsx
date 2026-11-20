import { useState } from "react";
import { motion } from "motion/react";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { FocusIndicator, FocusPull, Kbd } from "@/components/shared/hud";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { Wordmark } from "@/components/shared/Wordmark";
import { useCommandMenu } from "@/lib/command-menu";

/**
 * HUD con referencia al visor de la Sony α6400: REC arriba a la izquierda, RAW y modo de AF arriba
 * a la derecha, lectura de exposición abajo con el indicador de foco. Es una referencia, no una
 * copia: batería, resolución y demás indicadores se omiten a propósito para no cargar la vista.
 */
export const Home = () => {
  const [focused, setFocused] = useState(false);
  const { setOpen } = useCommandMenu();

  return (
    <HUDFrame className="justify-center">
      <HUDHeader
        label="RIQEDEV"
        status="REC"
        signal="rec"
        live
        center={<span>CHILE // 38.7397° S, 72.5901° W</span>}
        right={
          <>
            <div className="flex items-center gap-3">
              <span className="rounded-xs border border-current/40 px-1.5 py-px text-[9px] text-hud-strong">RAW</span>
            </div>
            <span>AF-C  WIDE</span>
          </>
        }
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center select-none">
        <FocusPull onFocused={() => setFocused(true)}>
          <h1
            className="display cursor-default text-[14vw] text-foreground sm:text-[12.5vw] md:text-[11.5vw] lg:text-[9.5vw] xl:text-[8.25vw] 2xl:text-[7.5vw]"
          >
            <Wordmark />
          </h1>
        </FocusPull>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.modal, ease: EASE_OUT, delay: DURATION.hero * 0.85 }}
          className="osd mt-9 flex flex-col items-center gap-2 text-xs tracking-[0.28em] text-muted-foreground sm:text-sm md:mt-12 md:flex-row md:gap-5 md:text-base lg:text-lg"
        >
          <span>Software Engineer</span>
          <span aria-hidden="true" className="hidden text-hud-faint md:inline">
            //
          </span>
          <span>Full-Stack Developer</span>
        </motion.p>

      </div>

      <HUDFooter
        left={
          <span className="flex items-center gap-4 text-hud-strong">
            <FocusIndicator locked={focused} />
            <span>1/2000</span>
            <span>F2.8</span>
            <span className="text-hud">±0.0</span>
            <span>ISO AUTO</span>
          </span>
        }
        right={
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="osd pointer-events-auto flex items-center gap-2 rounded-xs px-1 py-0.5 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            MENU <Kbd>⌘K</Kbd>
          </button>
        }
      />
    </HUDFrame>
  );
};
