import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Letterbox/obturador que cubre la pantalla en cada cambio de ruta.
 * Las dos barras se cierran hasta el centro y se retiran. Es estético, no
 * sincroniza con el swap real del Router (que ocurre instantáneo). Respeta
 * prefers-reduced-motion: no se renderiza nada.
 */
export const ShutterTransition = () => {
  const location = useLocation();
  const reduced = useReducedMotion();

  if (reduced) return null;

  const sweep = {
    duration: 0.65,
    times: [0, 0.45, 0.55, 1],
    ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
  };

  return (
    <div className="fixed inset-0 z-60 pointer-events-none overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={`shutter-top-${location.pathname}`}
          initial={{ y: "-100%" }}
          animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
          exit={{ y: "-100%" }}
          transition={sweep}
          className="absolute top-0 left-0 right-0 h-1/2 bg-background"
        />
        <motion.div
          key={`shutter-bottom-${location.pathname}`}
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "0%", "100%"] }}
          exit={{ y: "100%" }}
          transition={sweep}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-background"
        />
      </AnimatePresence>
    </div>
  );
};
