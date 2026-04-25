import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface BioPopupProps {
  onClose: () => void;
}

export const BioPopup = ({ onClose }: BioPopupProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bio-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute inset-0 cursor-default"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-card text-card-foreground border border-border rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-border bg-muted/30">
            <h2 id="bio-title" className="text-xl font-bold text-foreground">
              Ingeniero & Creativo
            </h2>
            <button
              onClick={onClose}
              aria-label="Cerrar bio"
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative">
            <div className="max-h-[70vh] md:max-h-[60vh] overflow-y-auto p-5 md:p-8 space-y-8 text-muted-foreground leading-relaxed">
              <section>
                <h3 className="text-foreground font-semibold mb-4 text-lg">Mi rol como Ingeniero Civil Informático</h3>
                <p className="mb-4">
                  Además del desarrollo técnico, me involucro activamente en aspectos clave como la{" "}
                  <strong className="text-foreground">planificación estratégica</strong>, la{" "}
                  <strong className="text-foreground">comunicación efectiva</strong> y la{" "}
                  <strong className="text-foreground">gestión de recursos</strong>. A lo largo de mi experiencia, he
                  cultivado habilidades de <strong className="text-foreground">liderazgo</strong> que me permiten
                  trabajar de forma colaborativa, impulsar equipos y mantener siempre el enfoque en la calidad y los
                  objetivos del proyecto.
                </p>
                <p className="italic text-muted-foreground/80 border-l-2 border-primary pl-4">
                  "Siempre estoy en busca de nuevas formas de mejorar mis habilidades y conocimientos para entregar lo
                  mejor de mí en cada proyecto, desafío o meta que me proponga"
                </p>
              </section>

              <section>
                <h3 className="text-foreground font-semibold mb-4 text-lg">Intereses y pasatiempos</h3>
                <p>
                  Más allá del trabajo, me interesa mantener un equilibrio personal. La{" "}
                  <strong className="text-foreground">fotografía</strong> es una de mis pasiones: disfruto capturar
                  momentos auténticos a través del lente. También comparto mi día a día con dos gatas (compañeras fieles
                  en casa) y encuentro en la <strong className="text-foreground">bicicleta</strong> una excelente forma
                  de desconectar y liberar el estrés.
                </p>
                <p className="mt-4">
                  Últimamente me he sumergido en el mundo de los{" "}
                  <strong className="text-foreground">teclados mecánicos personalizados</strong>, una afición que
                  combina precisión, diseño y la satisfacción de construir algo único desde cero. Además, disfruto
                  compartir ideas y aprendizajes en mi <strong className="text-foreground">blog personal</strong>, donde
                  escribo sobre tecnología, desarrollo y otros temas que me apasionan.
                </p>
                <p className="mt-6">
                  Puedes ver algunas de mis fotografías en{" "}
                  <a
                    href="https://www.flickr.com/photos/breathnshoot/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    Flickr
                  </a>{" "}
                  y explorar mis artículos en mi{" "}
                  <a
                    href="https://enrique-blog.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    Blog Personal
                  </a>
                  .
                </p>
              </section>
            </div>

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-card via-card/80 to-transparent pointer-events-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
