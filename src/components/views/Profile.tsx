import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, User, ArrowUpRight, Award, Camera, Bike, Keyboard, Rss, Maximize2, type LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { certifications } from "@/types/generalTypes";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { BioPopup } from "@/components/shared/BioPopup";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { DURATION, EASE_OUT } from "@/lib/motion";

const EXPERIENCE_LOGS = [
  {
    timestamp: "2022-10 / 2022-12",
    level: "LOG",
    msg: "Consultant @ DIRITT UCT",
    details: "Innovation workshops for secondary students. Mobile app prototyping, educational focus.",
    status: "COMPLETED",
  },
  {
    timestamp: "2023-01 / 2023-04",
    level: "LOG",
    msg: "Dev Jr @ Kimval Ingeniería",
    details: "Medical teleconsult platform. Full-stack: Java, SQL, ZK Framework.",
    status: "COMPLETED",
  },
  {
    timestamp: "2023-08 / present",
    level: "INFO",
    msg: "Software Engineer @ CTR",
    details: "IoT solutions, React web & React Native mobile. Dashboards, REST APIs, Python/Node.js backend.",
    status: "RUNNING",
  },
];

const CORE_STACK = [
  "Python",
  "Node.js",
  "React",
  "React Native",
  "TypeScript",
  "Java",
  "PHP",
  "SQL",
  "NoSQL",
  "Express",
  "FastAPI",
  "Astro",
];

const TOOLING_STACK = ["TailwindCSS", "Framer Motion", "Vite", "Expo", "Figma", "Git", "Docker", "Vercel", "PM2", "Firebase"];

const HOBBIES: { label: string; icon: LucideIcon; href?: string }[] = [
  { label: "Fotografía", icon: Camera, href: "https://www.flickr.com/photos/breathnshoot/" },
  { label: "Mech Keebs", icon: Keyboard },
  { label: "Ciclismo", icon: Bike },
  { label: "Blog", icon: Rss, href: "https://riqedev-blog.vercel.app/" },
];

/** Tiempo en CTR desde 2023-08, calculado en vivo para que el log no envejezca. */
const uptime = () => {
  const start = new Date(2023, 7, 1);
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return `${Math.floor(months / 12)}y ${months % 12}m`;
};

const getCertIssuer = (link: string) => {
  if (link.includes("udemy.com")) return "Udemy";
  if (link.includes("efset.org")) return "EF SET";
  return "Certificate";
};

export const Profile = () => {
  const [showBio, setShowBio] = useState(false);

  return (
    <HUDFrame>
      <HUDHeader
        label="RIQEDEV"
        status="ONLINE"
        signal="af"
        live
        right={
          <>
            <span className="text-hud-strong">FULL-STACK</span>
            <span>v2.1.26</span>
          </>
        }
      />

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-400 h-full pt-24 pb-28 px-4 md:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 overflow-y-auto lg:overflow-hidden">
        {/* COL 1: EXPERIENCE LOG */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: DURATION.modal, ease: EASE_OUT }}
          className="lg:col-span-4 lg:h-full flex flex-col mb-4 lg:mb-0"
        >
          <Terminal
            title="career.log"
            className="h-auto lg:h-full w-full max-w-none max-h-none lg:max-h-screen text-[11px] md:text-xs font-mono leading-relaxed"
          >
            <TypingAnimation duration={35} className="text-muted-foreground mb-4">&gt; tail -f /var/log/career.log</TypingAnimation>

            {EXPERIENCE_LOGS.map((log, idx) => (
              <div key={log.timestamp} className="mb-6">
                <AnimatedSpan delay={1000 + idx * 800} className="text-hud">
                  [{log.timestamp}] [{log.level}]
                </AnimatedSpan>
                <AnimatedSpan delay={1200 + idx * 800} className="text-foreground font-bold">
                  ➜ {log.msg}
                </AnimatedSpan>
                <AnimatedSpan
                  delay={1400 + idx * 800}
                  className="text-muted-foreground pl-4 block mt-1 whitespace-normal wrap-break-word"
                >
                  Details: {log.details}
                </AnimatedSpan>
                <AnimatedSpan
                  delay={1600 + idx * 800}
                  className={`pl-4 block mt-1 ${
                    log.status.includes("RUNNING") ? "text-af" : "text-hud"
                  }`}
                >
                  &gt; Status: {log.status}
                </AnimatedSpan>
              </div>
            ))}
            <AnimatedSpan className="text-hud mt-2">
              {`> uptime: ${uptime()} @ CTR`}
            </AnimatedSpan>
            <TypingAnimation delay={4500} className="text-af mt-2 animate-pulse">
              &gt; _
            </TypingAnimation>
          </Terminal>
        </motion.div>

        {/* COL 2: DASHBOARD */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:grid-rows-12 lg:h-full lg:overflow-hidden">
          {/* README.md */}
          <TerminalCard
            title="README.md"
            icon={User}
            className="md:col-span-2 lg:row-span-7 relative group overflow-hidden"
            delay={0.2}
            headerAction={
              <Button
                variant="ghost"
                size="icon"
                className="pressable size-7 text-muted-foreground hover:text-foreground"
                onClick={() => setShowBio(true)}
                aria-label="Abrir bio completa"
                title="Abrir README completo"
              >
                <Maximize2 size={14} />
              </Button>
            }
          >
            <ScrollArea fade className="lg:h-full p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,64ch)_minmax(0,1fr)] lg:gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/profile/portrait.webp"
                      alt="Enrique"
                      width={56}
                      height={56}
                      className="size-12 shrink-0 rounded-full ring-1 ring-border ring-offset-2 ring-offset-card md:size-14"
                    />
                    <div className="grid gap-1">
                      <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                        Hola, soy Enrique <span className="text-2xl">👋🏽</span>
                      </h3>
                      <p className="font-mono text-[11px] text-hud">Software Engineer @ CTR // Chile</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    <strong>Ingeniero Civil Informático</strong> con mención en <strong>desarrollo de software</strong>,
                    con +3 años de experiencia en el diseño e implementación de soluciones tecnológicas innovadoras,
                    especializado en proyectos de IoT y automatización industrial. He liderado iniciativas para la
                    integración de dispositivos conectados, el análisis de datos en tiempo real y el desarrollo de
                    sistemas escalables, contribuyendo a la optimización de procesos industriales y la mejora de la
                    eficiencia operativa.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Actualmente me desempeño como <strong>ingeniero de software</strong>, uniendo el desarrollo digital
                    con la operación industrial. Desarrollo el stack completo: desde interfaces web en{" "}
                    <strong>React</strong> y aplicaciones móviles con <strong>React Native</strong>, hasta la lógica de
                    backend en <strong>Python</strong>, <strong>Node.js</strong> y <strong>PHP</strong>. Paso gran
                    parte del tiempo diseñando dashboards en tiempo real, APIs RESTful y sistemas que automatizan
                    procesos industriales complejos.
                    <span className="text-foreground/80 italic block mt-3 border-l-2 border-foreground/25 pl-3">
                      "Siempre busco nuevas formas de mejorar para entregar lo mejor de mí en cada desafío."
                    </span>
                  </p>
                </div>

                <div className="pt-6 border-t border-border lg:pt-0 lg:border-t-0 lg:border-l lg:pl-8">
                  <h4 className="osd text-[10px] text-hud mb-4">
                    Fuera del código
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                    {HOBBIES.map((h) => {
                      const inner = (
                        <>
                          {h.href && (
                            <ArrowUpRight
                              size={12}
                              aria-hidden="true"
                              className="absolute top-2 right-2 text-hud-faint transition-colors group-hover/item:text-foreground"
                            />
                          )}
                          <h.icon size={22} aria-hidden="true" className="text-muted-foreground transition-colors group-hover/item:text-foreground" />
                          <span className="text-xs font-medium">{h.label}</span>
                        </>
                      );
                      const base =
                        "group/item relative flex flex-col items-center gap-2 rounded-lg border border-border/70 p-3 text-center";
                      return h.href ? (
                        <a
                          key={h.label}
                          href={h.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`${base} transition-[transform,border-color,background-color] duration-200 ease-(--ease-out) outline-none hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring/60`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div key={h.label} className={base}>
                          {inner}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollArea>

          </TerminalCard>

          {/* package.json */}
          <TerminalCard
            title="package.json"
            icon={Cpu}
            className="md:col-span-1 lg:row-span-5 relative overflow-hidden"
            delay={0.3}
          >
            <ScrollArea fade className="lg:h-full p-6">
              <div className="font-mono text-xs md:text-sm leading-relaxed select-text">
                <span className="text-syntax-punct">{"{"}</span>

                <div className="pl-4 mb-3">
                  <div>
                    <span className="text-syntax-key">"name"</span>
                    <span className="text-syntax-comment">: </span>
                    <span className="text-syntax-string">"riqedev"</span>
                    <span className="text-syntax-comment">,</span>
                  </div>
                  <div>
                    <span className="text-syntax-key">"role"</span>
                    <span className="text-syntax-comment">: </span>
                    <span className="text-syntax-string">"Software Engineer"</span>
                    <span className="text-syntax-comment">,</span>
                  </div>
                </div>

                <div className="pl-4">
                  <span className="text-syntax-comment italic mb-0.5 block">// Core Stack & Languages</span>
                  <span className="text-syntax-key">"dependencies"</span>
                  <span className="text-syntax-comment">:</span> <span className="text-syntax-punct">{"["}</span>
                  <div className="pl-4 flex flex-wrap gap-x-3 gap-y-1">
                    {CORE_STACK.map((tech) => (
                      <span key={tech} className="text-syntax-string">
                        "{tech}"<span className="text-syntax-comment">,</span>
                      </span>
                    ))}
                  </div>
                  <span className="text-syntax-punct">{"],"}</span>
                </div>

                <div className="pl-4 mt-2">
                  <span className="text-syntax-comment italic mb-0.5 block">// Tools, Frameworks & UI</span>
                  <span className="text-syntax-key">"devDependencies"</span>
                  <span className="text-syntax-comment">:</span> <span className="text-syntax-punct">{"["}</span>
                  <div className="pl-4 flex flex-wrap gap-x-3 gap-y-1">
                    {TOOLING_STACK.map((tech) => (
                      <span key={tech} className="text-syntax-string">
                        "{tech}"<span className="text-syntax-comment">,</span>
                      </span>
                    ))}
                  </div>
                  <span className="text-syntax-punct">{"]"}</span>
                </div>

                <span className="text-syntax-punct">{"}"}</span>
              </div>
            </ScrollArea>

          </TerminalCard>

          {/* licenses.txt */}
          <TerminalCard
            title="licenses.txt"
            icon={Award}
            headerAction={<span className="font-mono text-[11px] text-hud-faint tabular-nums">{certifications.length} files</span>}
            className="md:col-span-1 lg:row-span-5 relative overflow-hidden"
            delay={0.4}
          >
            <ScrollArea fade className="lg:h-full p-0">
              <div className="flex flex-col">
                {certifications.map((cert) => (
                  <a
                    key={cert.certificationLink}
                    href={cert.certificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 border-b border-border hover:bg-muted/20 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/60"
                  >
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="text-xs font-medium text-foreground truncate">{cert.name}</span>
                      <span className="osd w-fit rounded-xs border border-border px-1.5 py-px text-[9px] text-hud">
                        {getCertIssuer(cert.certificationLink)}
                      </span>
                    </div>
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-foreground shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </ScrollArea>
          </TerminalCard>
        </div>
      </div>

      <HUDFooter left="AUTOBIO" right="[ 100% ]" />

      <BioPopup open={showBio} onOpenChange={setShowBio} />
    </HUDFrame>
  );
};
