import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Project } from "@/types/generalTypes"; // Importación correcta del tipo

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl p-0 overflow-hidden bg-background text-foreground border-border sm:rounded-2xl h-[70vh] flex flex-col md:flex-row gap-0">
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <div className="relative md:w-[60%] h-64 md:h-full bg-muted overflow-hidden group select-none">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-black/60 backdrop-blur-md border-white/10 text-white font-medium text-[10px] rounded-md"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO TÉCNICA */}
        <div className="flex-1 flex flex-col h-full border-t md:border-t-0 md:border-l border-border bg-card relative">
          <DialogHeader className="p-6 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 p-6 md:p-8">
            <div className="space-y-8">
              {/* Descripción */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Project Overview</h4>
                <DialogDescription className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {project.description}
                </DialogDescription>
              </div>

              {/* Stack Completo */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Architecture & Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {/* CORRECCIÓN AQUÍ: key={tag} en lugar de key={tech} */}
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-muted/50 border border-border rounded-md text-xs text-muted-foreground transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer: Acciones */}
          <div className="p-6 border-t border-border flex flex-col sm:flex-row gap-3 shrink-0">
            {project.projectLink && (
              <Button className="flex-1 gap-2" onClick={() => window.open(project.projectLink, "_blank")}>
                <ExternalLink size={16} /> Live Demo
              </Button>
            )}

            {(project.repoLink ?? project.projectLink) && (
              <Button
                variant="outline"
                className="flex-1 gap-2 border-border hover:bg-accent"
                onClick={() => window.open(project.repoLink ?? project.projectLink, "_blank")}
              >
                <Github size={16} /> Repository
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
