import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, User, ArrowUpRight, Award, Camera, Bike, Keyboard, Rss, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { certifications } from "@/types/generalTypes";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { BioPopup } from "@/components/shared/BioPopup";
import { HUDFrame } from "@/components/shared/HUDFrame";

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

const getCertIssuer = (link: string) => {
  if (link.includes("udemy.com")) return "Udemy";
  if (link.includes("efset.org")) return "EF SET";
  return "Certificate";
};

export const Profile = () => {
  const [showBio, setShowBio] = useState(false);

  return (
    <HUDFrame>
      {/* HUD HEADER */}
      <div className="absolute top-7 sm:top-8 md:top-9 w-full px-7 md:px-9 z-20 flex justify-between items-start text-[0.55rem] md:text-[0.65rem] font-mono tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
        <div className="flex flex-col gap-2 text-left">
          <span className="text-foreground/55 tracking-[0.2em]">RIQEDEV</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-foreground/45">ONLINE</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-foreground/55">FULL-STACK</span>
          <span className="opacity-55">v2.0.26</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-400 h-full pt-24 pb-24 px-4 md:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 overflow-y-auto lg:overflow-hidden">
        {/* COL 1: EXPERIENCE LOG */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 lg:h-full min-h-96 lg:min-h-0 flex flex-col mb-4 lg:mb-0"
        >
          <Terminal className="h-full w-full max-w-none bg-card border-border shadow-sm dark:shadow-md text-[10px] md:text-xs font-mono leading-relaxed overflow-hidden">
            <TypingAnimation className="text-muted-foreground mb-4">&gt; tail -f /var/log/career.log</TypingAnimation>

            {EXPERIENCE_LOGS.map((log, idx) => (
              <div key={log.timestamp} className="mb-6">
                <AnimatedSpan delay={1000 + idx * 800} className="text-zinc-500">
                  [{log.timestamp}] [{log.level}]
                </AnimatedSpan>
                <AnimatedSpan delay={1200 + idx * 800} className="text-primary font-bold">
                  ➜ {log.msg}
                </AnimatedSpan>
                <AnimatedSpan
                  delay={1400 + idx * 800}
                  className="text-foreground pl-4 block opacity-90 mt-1 whitespace-normal wrap-break-word"
                >
                  Details: {log.details}
                </AnimatedSpan>
                <AnimatedSpan
                  delay={1600 + idx * 800}
                  className={`pl-4 block mt-1 ${
                    log.status.includes("RUNNING") ? "text-emerald-500" : "text-muted-foreground"
                  }`}
                >
                  &gt; Status: {log.status}
                </AnimatedSpan>
              </div>
            ))}
            <TypingAnimation delay={4500} className="text-emerald-500 mt-4 animate-pulse">
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
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => setShowBio(true)}
                aria-label="Abrir bio completa"
                title="Open in Editor (Read Full Bio)"
              >
                <Maximize2 size={14} />
              </Button>
            }
          >
            <ScrollArea className="lg:h-full p-6 md:p-8">
              <div className="space-y-6 max-w-3xl pb-16">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                    Hola, soy Enrique <span className="text-2xl">👋🏽</span>
                  </h3>
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
                    <span className="text-primary font-medium block mt-2">
                      [ "Siempre busco nuevas formas de mejorar para entregar lo mejor de mí en cada desafío." ]
                    </span>
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    Fuera del código
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <a
                      href="https://www.flickr.com/photos/breathnshoot/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors group/item text-center cursor-pointer"
                    >
                      <Camera size={24} className="text-zinc-500 group-hover/item:text-primary transition-colors" />
                      <span className="text-xs font-medium">Fotografía</span>
                    </a>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/20 text-center cursor-default">
                      <Keyboard size={24} className="text-zinc-500" />
                      <span className="text-xs font-medium">Mech Keebs</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/20 text-center cursor-default">
                      <Bike size={24} className="text-zinc-500" />
                      <span className="text-xs font-medium">Ciclismo</span>
                    </div>
                    <a
                      href="https://riqedev-blog.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors group/item text-center cursor-pointer"
                    >
                      <Rss size={24} className="text-zinc-500 group-hover/item:text-primary transition-colors" />
                      <span className="text-xs font-medium">Blog</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-card via-card/80 to-transparent pointer-events-none z-20"
            />
          </TerminalCard>

          {/* package.json */}
          <TerminalCard
            title="package.json"
            icon={Cpu}
            className="md:col-span-1 lg:row-span-5 relative overflow-hidden"
            delay={0.3}
          >
            <ScrollArea className="lg:h-full p-6">
              <div className="font-mono text-xs md:text-sm leading-relaxed select-text pb-12">
                <span className="text-yellow-400">{"{"}</span>

                <div className="pl-4 mb-3">
                  <div>
                    <span className="text-red-400">"name"</span>
                    <span className="text-zinc-400">: </span>
                    <span className="text-emerald-500">"riqedev"</span>
                    <span className="text-zinc-400">,</span>
                  </div>
                  <div>
                    <span className="text-red-400">"role"</span>
                    <span className="text-zinc-400">: </span>
                    <span className="text-emerald-500">"Software Engineer"</span>
                    <span className="text-zinc-400">,</span>
                  </div>
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500 italic mb-0.5 block">// Core Stack & Languages</span>
                  <span className="text-red-400">"dependencies"</span>
                  <span className="text-zinc-400">:</span> <span className="text-yellow-400">{"["}</span>
                  <div className="pl-4 flex flex-wrap gap-x-3 gap-y-1">
                    {CORE_STACK.map((tech) => (
                      <span key={tech} className="text-emerald-500 hover:text-green-300 transition-colors cursor-default">
                        "{tech}"<span className="text-zinc-400">,</span>
                      </span>
                    ))}
                  </div>
                  <span className="text-yellow-400">{"],"}</span>
                </div>

                <div className="pl-4 mt-2">
                  <span className="text-zinc-500 italic mb-0.5 block">// Tools, Frameworks & UI</span>
                  <span className="text-red-400">"devDependencies"</span>
                  <span className="text-zinc-400">:</span> <span className="text-yellow-400">{"["}</span>
                  <div className="pl-4 flex flex-wrap gap-x-3 gap-y-1">
                    {TOOLING_STACK.map((tech) => (
                      <span key={tech} className="text-emerald-500 hover:text-green-300 transition-colors cursor-default">
                        "{tech}"<span className="text-zinc-400">,</span>
                      </span>
                    ))}
                  </div>
                  <span className="text-yellow-400">{"]"}</span>
                </div>

                <span className="text-yellow-400">{"}"}</span>
              </div>
            </ScrollArea>

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-card via-card/80 to-transparent pointer-events-none z-20"
            />
          </TerminalCard>

          {/* licenses.txt */}
          <TerminalCard
            title="licenses.txt"
            icon={Award}
            className="md:col-span-1 lg:row-span-5 relative overflow-hidden"
            delay={0.4}
          >
            <ScrollArea className="lg:h-full p-0">
              <div className="flex flex-col pb-12">
                {certifications.map((cert) => (
                  <a
                    key={cert.certificationLink}
                    href={cert.certificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 border-b border-border hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="text-xs font-medium text-foreground truncate">{cert.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {getCertIssuer(cert.certificationLink)}
                      </span>
                    </div>
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </ScrollArea>
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-card via-card/80 to-transparent pointer-events-none z-20"
            />
          </TerminalCard>
        </div>
      </div>

      {/* HUD FOOTER */}
      <div className="absolute bottom-7 sm:bottom-8 md:bottom-9 w-full px-7 md:px-9 flex justify-between items-end text-[0.55rem] md:text-[0.65rem] font-mono text-muted-foreground/40 uppercase pointer-events-none z-10">
        <span>AUTOBIO</span>
        <span>[ 100% ]</span>
      </div>

      {showBio && <BioPopup onClose={() => setShowBio(false)} />}
    </HUDFrame>
  );
};
