// src/components/sections/SkillsBento.tsx
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Code2, Camera, Film, Terminal } from "lucide-react";

const features = [
  {
    Icon: Code2,
    name: "Software Architecture",
    description: "Especialista en React, TypeScript y entornos escalables con Node.js.",
    href: "#",
    cta: "Stack Técnico",
    className: "col-span-3 lg:col-span-2 lg:row-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent" />,
  },
  {
    Icon: Camera,
    name: "Visual Eye",
    description: "Aficionado a la fotografía analógica y composición visual.",
    href: "#",
    cta: "Portfolio",
    className: "col-span-3 lg:col-span-1 lg:row-span-1",
    background: <div className="absolute inset-0 bg-zinc-900" />,
  },
  {
    Icon: Film,
    name: "Cinematic Narrative",
    description: "Fan del cine, aplicando storytelling en interfaces digitales.",
    href: "#",
    cta: "Intereses",
    className: "col-span-3 lg:col-span-1 lg:row-span-1",
    background: <div className="absolute inset-0 bg-zinc-900" />,
  },
  {
    Icon: Terminal,
    name: "Certificaciones",
    description: "C1 Advanced English y múltiples especializaciones en UI/UX y Desarrollo.",
    href: "#",
    cta: "Ver Credenciales",
    className: "col-span-3 lg:col-span-3 lg:row-span-1",
    background: <div className="absolute inset-0 bg-zinc-900" />,
  },
];

export const SkillsBento = () => {
  return (
    <section id="skills" className="w-full">
      <div className="flex flex-col mb-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">// TECHNICAL_CAPABILITIES</span>
        <h2 className="text-4xl font-bold tracking-tighter text-white">Habilidades & Curaduría</h2>
      </div>

      {/* Importante: El componente BentoGrid de Magic UI usa CSS Grid.
          Asegúrate de que tus BentoCard tengan el estilo minimalista (bordes rectos).
      */}
      <BentoGrid className="grid-cols-3">
        {features.map((feature) => (
          <BentoCard
            key={feature.name}
            {...feature}
            className={feature.className + " rounded-none border-zinc-800 bg-zinc-950"}
          />
        ))}
      </BentoGrid>
    </section>
  );
};
