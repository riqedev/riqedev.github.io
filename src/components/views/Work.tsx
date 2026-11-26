import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FolderGit2, ArrowUpRight, Code2 } from "lucide-react";
import { projectsData } from "@/types/generalTypes";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { Chip } from "@/components/shared/hud";
import { stagger } from "@/lib/motion";
import { useCopy, type Localized } from "@/lib/i18n";

const CATEGORIES = ["REACT", "PYTHON", "JAVA", "PHP"] as const;
type Category = (typeof CATEGORIES)[number];

const getProjectCategory = (tags: readonly string[]): Category | null => {
  const joined = tags.join(" ").toLowerCase();
  // React: matches "react", "reactjs", "react three fiber", "react native"
  if (/react/.test(joined)) return "REACT";
  if (/python|opencv|numpy/.test(joined)) return "PYTHON";
  // \bjava\b evita capturar "javascript"
  if (/\bjava\b|\bzk\b/.test(joined)) return "JAVA";
  if (/\bphp\b|laravel/.test(joined)) return "PHP";
  return null;
};

const COPY: Localized<{ title: string; since: string; filter: string; details: string }> = {
  es: { title: "Proyectos seleccionados", since: "// 2022 — presente", filter: "Filtrar por stack", details: "ver detalles" },
  en: { title: "Selected Works", since: "// 2022 — present", filter: "Filter by stack", details: "view details" },
};

export const Work = () => {
  const t = useCopy(COPY);
  const location = useLocation();
  const navigate = useNavigate();
  // El menú ⌘K puede pedir abrir un proyecto directo: llega como state.open (título).
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    const target = (location.state as { open?: string } | null)?.open;
    const idx = target ? projectsData.findIndex((p) => p.title === target) : -1;
    return idx >= 0 ? idx : null;
  });

  useEffect(() => {
    if ((location.state as { open?: string } | null)?.open) navigate(".", { replace: true, state: null });
  }, [location.state, navigate]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const counts = useMemo(() => {
    const map = new Map<Category, number>();
    CATEGORIES.forEach((c) => map.set(c, 0));
    projectsData.forEach((p) => {
      const cat = getProjectCategory(p.tags);
      if (cat) map.set(cat, (map.get(cat) ?? 0) + 1);
    });
    return map;
  }, []);

  const visibleCategories = useMemo(() => CATEGORIES.filter((c) => (counts.get(c) ?? 0) > 0), [counts]);

  const filteredProjects = useMemo(
    () => (activeCategory ? projectsData.filter((p) => getProjectCategory(p.tags) === activeCategory) : projectsData),
    [activeCategory],
  );

  const showPlaceholder = activeCategory === null && projectsData.length < 8;

  return (
    <HUDFrame>
      <HUDHeader
        label="ARCHIVE"
        status="CATALOG"
        signal="info"
        right={
          <span className="text-hud-strong">
            {filteredProjects.length}/{projectsData.length} FILES
          </span>
        }
      />

      <div className="relative z-10 flex h-full w-full max-w-400 flex-col gap-4 px-4 pt-24 pb-28 md:px-8">
        <div className="flex shrink-0 items-end justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h2>
            <p className="mt-1 font-mono text-[11px] text-hud md:text-xs">{t.since}</p>
          </div>
          <a
            href="https://github.com/riqedev"
            target="_blank"
            rel="noreferrer"
            className="pressable flex items-center gap-2 rounded-xs border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 md:text-xs"
          >
            <FolderGit2 size={12} aria-hidden="true" />
            <span>github/riqedev</span>
          </a>
        </div>

        <div className="shrink-0">
          <ScrollArea className="w-full">
            <div role="group" aria-label={t.filter} className="flex items-center gap-1.5 pb-2">
              <Chip active={activeCategory === null} onClick={() => setActiveCategory(null)}>
                ALL {projectsData.length}
              </Chip>
              {visibleCategories.map((cat) => (
                <Chip key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
                  {cat} {counts.get(cat) ?? 0}
                </Chip>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <ScrollArea fade className="min-h-0 flex-1">
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <span className="font-mono text-xs text-hud">[ NO MATCH IN ROLL ]</span>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="osd text-[10px] text-muted-foreground hover:text-foreground"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pb-12 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project, idx) => (
                <TerminalCard
                  key={project.title}
                  title={project.title}
                  icon={Code2}
                  delay={stagger(idx)}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedIndex(idx);
                    }
                  }}
                  className="h-64 cursor-pointer outline-none hover:border-foreground/25 hover:shadow-(--shadow-card-hover) focus-visible:ring-2 focus-visible:ring-ring/60 md:h-72"
                >
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 overflow-hidden bg-muted">
                      <img
                        src={project.imageUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 ease-(--ease-out) group-hover/card:scale-[1.03]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="self-end rounded-full bg-background/80 p-1.5 text-foreground opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="osd rounded-xs border border-white/15 bg-black/45 px-1.5 py-0.5 text-[9px] text-white/90 backdrop-blur-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {/* el nombre accesible sale del texto visible (título + tags), como pide WCAG 2.5.3 */}
                        <span className="sr-only">, {t.details}</span>
                      </div>
                    </div>
                  </div>
                </TerminalCard>
              ))}

              {showPlaceholder && (
                <div
                  aria-hidden="true"
                  className="hidden h-64 flex-col overflow-hidden rounded-xl border border-dashed border-border md:h-72 xl:flex"
                >
                  <div className="flex h-10 items-center gap-1.5 border-b border-dashed border-border px-4">
                    <span className="size-2 rounded-full bg-muted-foreground/20" />
                    <span className="size-2 rounded-full bg-muted-foreground/20" />
                    <span className="size-2 rounded-full bg-muted-foreground/20" />
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 font-mono">
                    <span className="text-xs text-hud">[ FREE_SLOT ]</span>
                    <span className="text-[10px] text-hud-faint">WAITING_FOR_DATA...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>

      <HUDFooter left="ROLL 01" right="[ 100% ]" />

      <ProjectModal
        projects={filteredProjects}
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </HUDFrame>
  );
};
