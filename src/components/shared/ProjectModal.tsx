import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GithubIcon } from "@/components/icons/brand";
import { Kbd } from "@/components/shared/hud";
import type { Project } from "@/types/generalTypes";

interface ProjectModalProps {
  projects: readonly Project[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(4, "0");

/**
 * Modo PLAYBACK: como revisar tomas en la cámara. ←/→ recorren el rollo filtrado
 * sin animación (acción de teclado = respuesta instantánea).
 */
export const ProjectModal = ({ projects, index, onIndexChange, onClose }: ProjectModalProps) => {
  // Recordamos la última toma abierta para que el diálogo pueda animar su salida.
  const [shown, setShown] = useState(index);
  if (index !== null && index !== shown) setShown(index);
  const current = index ?? shown;
  const project = current !== null ? projects[current] : null;
  const total = projects.length;

  useEffect(() => {
    if (index === null || total < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onIndexChange]);

  if (!project || current === null) return null;

  const liveUrl = project.projectLink || null;
  // Si projectLink ya apunta a GitHub y no hay repoLink, evitamos duplicar el botón.
  const repoUrl =
    "repoLink" in project && project.repoLink
      ? project.repoLink
      : liveUrl && liveUrl.includes("github.com")
        ? liveUrl
        : null;
  const showLive = liveUrl !== null && !liveUrl.includes("github.com");

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[88dvh] flex-col gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 sm:max-w-6xl md:h-[72vh] md:flex-row"
      >
        {/* PLAYBACK: imagen */}
        <div className="relative aspect-video shrink-0 overflow-hidden bg-muted select-none md:aspect-auto md:h-full md:w-[60%]">
          <img
            key={project.imageUrl}
            src={project.imageUrl}
            alt={`Captura del proyecto ${project.title}`}
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-black/55 via-transparent to-black/70" />

          <div className="osd absolute inset-x-5 top-5 flex items-center justify-between text-[10px] text-white/80 md:inset-x-7 md:top-6">
            <span className="flex items-center gap-1.5">
              <Play size={10} className="fill-current" aria-hidden="true" />
              PLAYBACK
            </span>
            <span>
              100-{pad(current + 1)} <span className="text-white/50">/ {pad(total)}</span>
            </span>
          </div>

          <div className="absolute bottom-5 left-5 flex flex-wrap gap-1.5 md:bottom-6 md:left-7">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="osd rounded-xs border border-white/15 bg-black/50 px-1.5 py-0.5 text-[9px] text-white/90 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex min-h-0 flex-1 flex-col border-t border-border md:border-t-0 md:border-l">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-5 md:p-6">
            <DialogTitle className="text-2xl font-semibold tracking-tight md:text-3xl">
              {project.title}
            </DialogTitle>
            <DialogPrimitive.Close
              aria-label="Cerrar"
              className="pressable -mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <X size={16} aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-7 p-5 md:p-6">
              <section>
                <h3 className="osd mb-2 text-[10px] text-hud">Overview</h3>
                <DialogDescription className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.description}
                </DialogDescription>
              </section>

              <section>
                <h3 className="osd mb-3 text-[10px] text-hud">Stack</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-xs border border-border bg-muted/40 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </ScrollArea>

          <div className="flex shrink-0 flex-col gap-3 border-t border-border p-5 md:p-6">
            {(showLive || repoUrl) && (
              <div className="flex flex-col gap-2 sm:flex-row">
                {showLive && liveUrl && (
                  <Button asChild className="pressable flex-1">
                    <a href={liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink aria-hidden="true" /> Live demo
                    </a>
                  </Button>
                )}
                {repoUrl && (
                  <Button asChild variant="outline" className="pressable flex-1">
                    <a href={repoUrl} target="_blank" rel="noreferrer">
                      <GithubIcon size={15} /> Source
                    </a>
                  </Button>
                )}
              </div>
            )}
            {!showLive && !repoUrl && (
              <p className="font-mono text-[11px] text-hud">// Proyecto privado: sin demo ni repositorio público.</p>
            )}

            {total > 1 && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onIndexChange((current - 1 + total) % total)}
                  className="osd pressable flex items-center gap-1.5 rounded-xs px-1 py-1 text-[10px] text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <ChevronLeft size={12} aria-hidden="true" /> Prev <Kbd className="hidden md:inline-flex">←</Kbd>
                </button>
                <button
                  type="button"
                  onClick={() => onIndexChange((current + 1) % total)}
                  className="osd pressable flex items-center gap-1.5 rounded-xs px-1 py-1 text-[10px] text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <Kbd className="hidden md:inline-flex">→</Kbd> Next <ChevronRight size={12} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
