// src/components/views/Work.tsx
import { useState } from "react";
import { projectsData } from "@/types/generalTypes";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { FolderGit2, ArrowUpRight, Code2 } from "lucide-react";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[number] | null>(null);

  return (
    <section className="relative h-screen w-full flex flex-col items-center overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* GRID BACKGROUND: Textura técnica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* VIEWFINDER UI: Esquinas de encuadre */}
      <div className="absolute inset-2 sm:inset-3 md:inset-4 border-[0.5px] border-border/30 pointer-events-none z-10 select-none">
        <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-primary/30" />
        <div className="absolute -top-px -right-px w-4 h-4 border-t border-r border-primary/30" />
        <div className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-primary/30" />
        <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-primary/30" />
      </div>

      {/* HEADER BAR: Datos técnicos */}
      <div className="absolute top-7 sm:top-8 md:top-9 w-full px-7 md:px-9 z-20 flex justify-between items-start text-[0.55rem] md:text-[0.65rem] font-mono tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
        {/* Left */}
        <div className="flex flex-col gap-2 text-left">
          <span className="text-foreground/55 tracking-[0.2em]">ARCHIVE</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-foreground/45">CATALOG</span>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-foreground/55">{projectsData.length} FILES</span>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-400 h-full pt-24 pb-24 px-4 md:px-8 flex flex-col gap-4">
        {/* Internal Header for Context */}
        <div className="flex justify-between items-end border-b border-border/50 pb-4 shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Selected Works</h2>
            <p className="text-[10px] md:text-xs text-muted-foreground font-mono mt-1">// 2022 — present</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-[10px] md:text-xs font-mono bg-muted/20 px-2 py-1 rounded">
            <FolderGit2 size={12} />
            <span>github / riqedev</span>
          </div>
        </div>

        {/* GRID DE PROYECTOS (Scrollable) */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-8">
            {projectsData.map((project, idx) => (
              <TerminalCard
                key={project.title}
                title={project.title}
                icon={Code2}
                delay={idx * 0.05}
                layoutId={`card-${project.title}`}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer hover:border-primary/50 hover:shadow-lg group h-70 md:h-80"
              >
                {/* CONTENIDO INTERNO DE LA VENTANA */}
                <div className="relative w-full h-full">
                  {/* Imagen */}
                  <div className="absolute inset-0 bg-muted overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  {/* Info superpuesta */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300">
                      <div className="bg-background/80 backdrop-blur-md p-1.5 rounded-full text-foreground shadow-sm">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono uppercase bg-black/40 backdrop-blur-md border border-white/10 px-1.5 py-0.5 rounded text-white/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TerminalCard>
            ))}

            {/* Placeholder vacío para completar grid (Estilo "Memoria Libre") */}
            {projectsData.length < 8 && (
              <div className="hidden lg:flex flex-col border-2 border-dashed rounded-xl opacity-70 overflow-hidden h-70 md:h-80 bg-muted/5">
                <div className="h-9 border-b border-border/40 bg-muted/10 flex items-center px-3 gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground/60">[ FREE_SLOT ]</span>
                  <span className="text-[10px] font-mono text-muted-foreground/40">WAITING_FOR_DATA...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* FOOTER INFO */}
      <div className="absolute bottom-7 sm:bottom-8 md:bottom-9 w-full px-7 md:px-9 flex justify-between items-end text-[0.55rem] md:text-[0.65rem] font-mono text-muted-foreground/40 uppercase pointer-events-none z-10">
        <span>ROLL 01</span>
        <span>[ 100% ]</span>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
