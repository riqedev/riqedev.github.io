// src/components/sections/Hero.tsx
import { BlurFade } from "@/components/ui/blur-fade";

export const Hero = () => {
  return (
    <section className="relative h-[70vh] w-full flex flex-col justify-end border-b border-zinc-800 pb-12">
      {/* Metadatos: Referencia directa a fotografía/cine */}
      <div className="absolute top-0 left-0 flex w-full justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-mono">
        <span>ENQ_ARCHIVE_2026</span>
        <span>CHILE // 38.7397° S, 72.5901° W</span>
        <span>ISO 100 // F/2.8</span>
      </div>

      <div className="space-y-4">
        <BlurFade delay={0.2} inView>
          <h1 className="text-7xl md:text-9xl font-bold tracking-[ -0.05em] leading-[0.8]">
            riqe<span className="text-zinc-600">.</span>
          </h1>
        </BlurFade>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <BlurFade delay={0.4} inView>
            <p className="max-w-md text-xl md:text-2xl font-light leading-snug text-zinc-400">
              Desarrollador Fullstack con enfoque en{" "}
              <span className="text-zinc-100 font-medium">diseño de alta fidelidad</span> y arquitectura de software.
            </p>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-zinc-700 hover:bg-zinc-100 hover:text-black transition-all duration-300 rounded-full text-sm font-medium">
                Ver Galería
              </button>
              <button className="px-6 py-2 bg-zinc-100 text-black hover:bg-zinc-300 transition-all duration-300 rounded-full text-sm font-medium">
                Contacto
              </button>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};
