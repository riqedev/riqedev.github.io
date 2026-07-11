import { motion } from "motion/react";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";

export const Home = () => {
  return (
    <HUDFrame className="justify-center">
      <HUDHeader
        label="RIQEDEV"
        status="REC"
        dotClassName="bg-red-500"
        center={<span>CHILE // 38.7397° S, 72.5901° W</span>}
        right={
          <>
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
          </>
        }
      />

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

      <HUDFooter left="AF-C  WIDE" right="[ 100% ]" />
    </HUDFrame>
  );
};
