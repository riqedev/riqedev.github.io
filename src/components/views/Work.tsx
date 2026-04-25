import { useState } from "react";
import { type Project, projectsData } from "@/types/generalTypes";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { FolderGit2, ArrowUpRight, Code2 } from "lucide-react";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HUDFrame } from "@/components/shared/HUDFrame";

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <HUDFrame>
      {/* HUD HEADER */}
      <div className="absolute top-7 sm:top-8 md:top-9 w-full px-7 md:px-9 z-20 flex justify-between items-start text-[0.55rem] md:text-[0.65rem] font-mono tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
        <div className="flex flex-col gap-2 text-left">
          <span className="text-foreground/55 tracking-[0.2em]">ARCHIVE</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-foreground/45">CATALOG</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-foreground/55">{projectsData.length} FILES</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-400 h-full pt-24 pb-24 px-4 md:px-8 flex flex-col gap-4">
        <div className="flex justify-between items-end border-b border-border/50 pb-4 shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Selected Works</h2>
            <p className="text-[10px] md:text-xs text-muted-foreground font-mono mt-1">// 2022 — present</p>
          </div>
          <a
            href="https://github.com/riqedev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-[10px] md:text-xs font-mono bg-muted/20 hover:bg-muted/40 px-2 py-1 rounded transition-colors"
          >
            <FolderGit2 size={12} />
            <span>github / riqedev</span>
          </a>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-8">
            {projectsData.map((project, idx) => (
              <TerminalCard
                key={project.title}
                title={project.title}
                icon={Code2}
                delay={idx * 0.05}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalles de ${project.title}`}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className="cursor-pointer hover:border-primary/50 hover:shadow-lg group h-64 md:h-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-muted overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={`Captura del proyecto ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

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

            {/* Placeholder visual: completar grid (estética "memoria libre") */}
            {projectsData.length < 8 && (
              <div
                aria-hidden="true"
                className="hidden lg:flex flex-col border-2 border-dashed rounded-xl opacity-70 overflow-hidden h-64 md:h-80 bg-muted/5"
              >
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

      {/* HUD FOOTER */}
      <div className="absolute bottom-7 sm:bottom-8 md:bottom-9 w-full px-7 md:px-9 flex justify-between items-end text-[0.55rem] md:text-[0.65rem] font-mono text-muted-foreground/40 uppercase pointer-events-none z-10">
        <span>ROLL 01</span>
        <span>[ 100% ]</span>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </HUDFrame>
  );
};
