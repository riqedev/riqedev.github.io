// src/components/sections/ProjectGrid.tsx
import { useState } from "react";
import { projectsData } from "@/types/generalTypes"; // O donde tengas tu data
import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { ProjectModal } from "@/components/shared/ProjectModal";

export const ProjectGrid = () => {
  // Estado para controlar qué proyecto está abierto
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null);

  return (
    <section id="projects" className="w-full min-h-[50vh]">
      {" "}
      {/* min-h para evitar saltos */}
      {/* Header de la sección */}
      <div className="flex items-end justify-between mb-8 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 block mb-2">// INDEX_01</span>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Selected Works</h2>
        </div>
        <span className="text-xs font-mono text-zinc-600 hidden md:block">[{projectsData.length} FILES FOUND]</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsData.map((project, idx) => (
          <BlurFade key={project.title} delay={0.1 + idx * 0.05} inView>
            <div onClick={() => setSelectedProject(project)}>
              {" "}
              {/* CLICK HANDLER */}
              <MagicCard
                className="group cursor-pointer overflow-hidden bg-[#0f0f0f] border-zinc-800 rounded-lg aspect-[4/3] flex flex-col justify-between p-0 hover:border-zinc-600 transition-colors"
                gradientColor="#262626"
              >
                {/* Imagen */}
                <div className="h-full w-full relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {/* Overlay sutil al hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                      View System Details
                    </span>
                  </div>
                </div>

                {/* Mini info en la card (solo título y categoría principal) */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex justify-between items-end">
                    <h3 className="text-sm font-bold text-zinc-100">{project.title}</h3>
                    <span className="text-[10px] text-zinc-400 font-mono">{project.tags[0]}</span>
                  </div>
                </div>
              </MagicCard>
            </div>
          </BlurFade>
        ))}
      </div>
      {/* Renderizamos el Modal fuera del loop */}
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
