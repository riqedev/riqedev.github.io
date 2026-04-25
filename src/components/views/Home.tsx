import { motion } from "motion/react";
import { HUDFrame } from "@/components/shared/HUDFrame";

export const Home = () => {
  return (
    <HUDFrame className="justify-center">
      {/* HUD HEADER */}
      <div className="absolute top-7 sm:top-8 md:top-9 w-full px-7 md:px-9 z-20 flex justify-between items-start text-[0.55rem] md:text-[0.65rem] font-mono tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
        <div className="flex flex-col gap-2 text-left">
          <span className="text-foreground/55 tracking-[0.2em]">RIQEDEV</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-foreground/45">REC</span>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block text-center opacity-40">
          <span>CHILE // 38.7397° S, 72.5901° W</span>
        </div>

        <div className="flex flex-col items-end gap-1 text-right">
          <div className="flex items-center gap-3">
            <span className="border border-foreground/15 px-1.5 py-0.5 rounded-[2px] text-foreground/55 text-[9px]">
              RAW
            </span>
            <span className="hidden sm:inline">
              ISO <span className="text-foreground/55">AUTO</span>
            </span>
          </div>
          <div className="flex gap-3 opacity-55">
            <span>1/2000</span>
            <span>ƒ/2.8</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center select-none px-6"
      >
        <h1 className="text-[15vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] 2xl:text-[7vw] leading-[0.8] font-bold tracking-tighter text-foreground">
          RIQEDEV<span className="text-primary">.</span>
        </h1>

        <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center gap-3 md:gap-6 text-muted-foreground tracking-[0.2em] md:tracking-[0.3em] font-light uppercase">
          <span className="hover:text-foreground transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">
            Software Engineer
          </span>
          <span className="text-muted-foreground text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl hidden md:inline">
            //
          </span>
          <span className="hover:text-foreground transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">
            Full-Stack Developer
          </span>
        </div>
      </motion.div>

      {/* HUD FOOTER */}
      <div className="absolute bottom-7 sm:bottom-8 md:bottom-9 w-full px-7 md:px-9 flex justify-between items-end text-[0.55rem] md:text-[0.65rem] font-mono text-muted-foreground/40 uppercase pointer-events-none z-10">
        <span>AF-C  WIDE</span>
        <span>[ 100% ]</span>
      </div>
    </HUDFrame>
  );
};
