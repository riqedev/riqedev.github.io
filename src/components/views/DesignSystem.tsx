import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Code2, MousePointerClick, RotateCcw } from "lucide-react";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { Chip, FocusIndicator, FocusPull, Kbd, SignalDot, ViewfinderCorners } from "@/components/shared/hud";
import { SIGNALS, type Signal } from "@/lib/signals";
import { Monogram, RecDot, Wordmark } from "@/components/shared/Wordmark";
import { Button } from "@/components/ui/button";
import { DURATION, EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * /system: spec sheet del design system TAKE 01, construido con los componentes y tokens
 * reales del sitio (si cambia un token, cambia esta página). Fuera del dock y con noindex.
 */

/** Lee el valor computado de una CSS var y lo actualiza al cambiar de tema. */
const useCssVar = (name: string) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    const read = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [name]);
  return value;
};

const Section = ({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-border/70 py-12 md:py-16">
    <div className="mb-8 grid gap-1 md:mb-10">
      <span className="osd text-[10px] text-hud">{label}</span>
      <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Spec = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[11px] text-hud">{children}</span>
);

const Swatch = ({ token, label, note, ring = false }: { token: string; label: string; note?: string; ring?: boolean }) => {
  const value = useCssVar(`--${token}`);
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn("h-16 rounded-lg border border-border", ring && "ring-1 ring-foreground/10 ring-inset")}
        style={{ background: `var(--${token})` }}
      />
      <div className="grid gap-0.5">
        <span className="text-sm font-semibold">{label}</span>
        <span className="font-mono text-[11px] text-muted-foreground">--{token}</span>
        <span className="truncate font-mono text-[10px] text-hud-faint">{value}</span>
        {note && <span className="text-xs text-muted-foreground">{note}</span>}
      </div>
    </div>
  );
};

const PRINCIPLES = [
  {
    title: "El visor no es el contenido",
    body: "Todo lo que rodea al contenido es HUD: tenue, condensado, inmóvil. Si un elemento del HUD llama más la atención que un proyecto, está mal calibrado.",
  },
  {
    title: "Una señal, un significado",
    body: "Rojo es grabar, verde es foco confirmado, azul es archivo, cian es canal abierto, ámbar es calibración. Un color de señal nunca se usa como decoración.",
  },
  {
    title: "Un solo momento por vista",
    body: "El focus pull del hero es el único movimiento orquestado del sitio. El resto responde a la persona: presionar, abrir, filtrar. Nada se mueve solo para lucirse.",
  },
  {
    title: "Fiel a la cámara",
    body: "El HUD copia el visor real de la Sony α6400: REC, batería, F2.8, ±0.0, indicador de foco (●). Nada de HUD dentro del HUD: el contenido nunca lleva marcos de visor propios.",
  },
];

const TYPE_SPECIMENS = [
  {
    role: "Display",
    spec: "Archivo · wdth 112 · wght 780 · tracking -0.04em · leading 0.9",
    use: "Solo el wordmark y titulares de marca (NO●SIGNAL, TAKE 01). Una vez por pantalla.",
    sample: <Wordmark className="text-5xl md:text-7xl" />,
  },
  {
    role: "Heading",
    spec: "Inter · wght 600 · tracking -0.025em · opsz auto",
    use: "Títulos de sección y de proyecto.",
    sample: <span className="text-3xl font-semibold tracking-tight">Selected Works</span>,
  },
  {
    role: "Body",
    spec: "Inter · wght 400 · leading 1.65 · máx. 64ch · negritas 600",
    use: "Prosa: bio, descripciones de proyectos.",
    sample: (
      <p className="max-w-prose leading-relaxed text-muted-foreground">
        Desarrollo el stack completo: desde interfaces web en React hasta la lógica de backend en Python y Node.js,
        con foco en dashboards en tiempo real.
      </p>
    ),
  },
  {
    role: "OSD",
    spec: "Archivo · wdth 84 · wght 540 · tracking 0.08em · mayúsculas · tabular-nums",
    use: "La voz de la cámara: HUD, etiquetas, chips, botones de sistema.",
    sample: <span className="osd text-lg">ISO AUTO 1/2000 ƒ/2.8 [ 100% ]</span>,
  },
  {
    role: "Mono",
    spec: "JetBrains Mono · wght 400–700",
    use: "Código, logs, nombres de archivo, datos.",
    sample: <span className="font-mono text-base">&gt; tail -f /var/log/career.log</span>,
  },
];

const TYPE_SCALE = [
  { token: "text-[10px]", px: "10", use: "OSD del HUD (mobile), chips" },
  { token: "text-[11px]", px: "11", use: "OSD del HUD (desktop), mono secundaria" },
  { token: "text-xs", px: "12", use: "Logs, metadatos" },
  { token: "text-sm", px: "14", use: "UI, botones" },
  { token: "text-base", px: "16", use: "Prosa" },
  { token: "text-2xl / 3xl", px: "24 / 30", use: "Headings" },
  { token: "display", px: "6.5–12vw", use: "Wordmark" },
];

const EASINGS = [
  { name: "--ease-out", curve: EASE_OUT, use: "Entradas, presión, todo lo que responde a la persona." },
  { name: "--ease-in-out", curve: EASE_IN_OUT, use: "Movimiento en pantalla: el círculo del cambio de tema." },
];

const DURATIONS = [
  { token: "press", ms: DURATION.press * 1000, use: "scale(0.97) al presionar" },
  { token: "ui", ms: DURATION.ui * 1000, use: "Tooltips, chips, filas" },
  { token: "modal", ms: DURATION.modal * 1000, use: "Diálogos, entrada de cards" },
  { token: "hero", ms: DURATION.hero * 1000, use: "Focus pull. Uno por vista." },
];

const CurvePlot = ({ curve }: { curve: readonly [number, number, number, number] }) => {
  const [x1, y1, x2, y2] = curve;
  const s = 100;
  return (
    <svg viewBox="-6 -6 112 112" className="size-24 shrink-0 text-foreground" aria-hidden="true">
      <rect x="0" y="0" width={s} height={s} fill="none" className="stroke-border" />
      <line x1="0" y1={s} x2={x1 * s} y2={s - y1 * s} className="stroke-hud-faint" strokeDasharray="2 2" />
      <line x1={s} y1="0" x2={x2 * s} y2={s - y2 * s} className="stroke-hud-faint" strokeDasharray="2 2" />
      <path
        d={`M0 ${s} C ${x1 * s} ${s - y1 * s}, ${x2 * s} ${s - y2 * s}, ${s} 0`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

const MotionDemo = ({ curve, duration }: { curve: readonly [number, number, number, number]; duration: number }) => {
  const [run, setRun] = useState(0);
  return (
    <button
      type="button"
      onClick={() => setRun((r) => r + 1)}
      className="group relative flex h-10 w-full items-center overflow-hidden rounded-md border border-border px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      aria-label="Reproducir demo de easing"
    >
      <motion.span
        key={run}
        initial={{ x: 0 }}
        animate={{ x: "calc(100cqw - 2.5rem)" }}
        transition={{ duration, ease: curve }}
        className="block size-8 rounded-sm bg-foreground"
      />
      <span className="osd absolute right-3 text-[10px] text-hud opacity-0 transition-opacity group-hover:opacity-100">
        Replay
      </span>
    </button>
  );
};

const NAV = [
  ["principios", "Principios"],
  ["marca", "Marca"],
  ["color", "Color"],
  ["tipografia", "Tipografía"],
  ["componentes", "Componentes"],
  ["movimiento", "Movimiento"],
  ["voz", "Voz"],
] as const;

const DesignSystem = () => {
  const [afKey, setAfKey] = useState(0);
  const [chip, setChip] = useState<string>("ALL");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <HUDFrame>
      <HUDHeader
        label="SPEC SHEET"
        status="CALIBRATION"
        signal="warn"
        right={
          <>
            <span className="text-hud-strong">TAKE 01</span>
            <span>DS v1.0</span>
          </>
        }
      />

      <div className="relative z-10 h-full w-full overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-36 md:px-10">
          {/* Portada */}
          <header className="pb-12 md:pb-16">
            <p className="osd text-[11px] text-hud">riqedev // brand & interface system</p>
            <h1 className="display mt-4 text-[15vw] md:text-8xl">
              TAKE 01
              <RecDot />
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Engineering through the lens. La ingeniería es el contenido; la cámara es el marco. Este sistema define
              cómo se ve, se lee y se mueve todo lo que lleva la marca riqedev: el portfolio, el blog y lo que venga.
            </p>
            <nav aria-label="Secciones" className="mt-8 flex flex-wrap gap-1.5">
              <Link
                to="/lab"
                className="osd pressable rounded-xs border border-foreground/40 px-2 py-1 text-[10px] text-foreground outline-none hover:border-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                Wordmark lab ↗
              </Link>
              {NAV.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="osd pressable rounded-xs border border-border px-2 py-1 text-[10px] text-muted-foreground outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  {label}
                </a>
              ))}
            </nav>
          </header>

          <Section id="principios" label="01 // principios" title="Cuatro reglas antes que cualquier token">
            <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className="bg-card p-6">
                  <span className="font-mono text-[11px] text-hud-faint">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="marca" label="02 // marca" title="Wordmark y monograma">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative flex h-56 items-center justify-center rounded-xl border border-border bg-[oklch(0.145_0_0)] text-[oklch(0.97_0_0)] md:col-span-2">
                <Wordmark className="text-6xl md:text-8xl" />
              </div>
              <div className="relative flex h-56 items-center justify-center gap-6 rounded-xl border border-border bg-[oklch(0.985_0.002_264)] text-[oklch(0.16_0_0)]">
                <span className="grid size-28 place-items-center rounded-[26px] bg-[oklch(0.16_0_0)] text-[oklch(0.97_0_0)]">
                  <Monogram className="text-[64px]" />
                </span>
                <span className="grid size-14 place-items-center rounded-[13px] bg-white shadow-[inset_0_0_0_1px_oklch(0.5_0_0/0.2)]">
                  <Monogram className="text-[32px]" />
                </span>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
              <li>
                <strong className="text-foreground">El punto se lee dos veces.</strong> Primero como punto final;
                junto al HUD, como el LED de REC. Círculo dibujado de 0.16em en <Spec>--rec</Spec>: es el único rojo
                de la marca.
              </li>
              <li>
                <strong className="text-foreground">Minúscula, siempre.</strong> <Spec>riqedev</Spec> es un handle:
                firma digital, no marca de hardware. Monograma <Spec>r●</Spec> para dock, favicon y avatares.
              </li>
              <li>
                <strong className="text-foreground">No:</strong> mayúsculas, punto cuadrado, marcos de visor alrededor,
                contornos, degradados, sombras ni itálicas. La cámara es escenario, no logo.
              </li>
            </ul>
          </Section>

          <Section id="color" label="03 // color" title="Neutros para todo, señales para significar">
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Los valores cambian con el tema (prueba el toggle del dock). El 95% de la interfaz son neutros; las
              señales ocupan puntos, bordes finos y texto corto.
            </p>
            <h3 className="osd mb-4 text-[10px] text-hud">Neutros</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <Swatch token="background" label="Sensor" note="Fondo de toda vista" ring />
              <Swatch token="card" label="Body" note="Cards, diálogos, dock" ring />
              <Swatch token="muted" label="Grip" note="Superficies secundarias" />
              <Swatch token="border" label="Hairline" note="Bordes y divisores" />
              <Swatch token="muted-foreground" label="Gris medio" note="Texto secundario" />
              <Swatch token="foreground" label="Tinta" note="Texto principal" />
            </div>

            <h3 className="osd mt-10 mb-4 text-[10px] text-hud">Señales</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {(Object.keys(SIGNALS) as Signal[]).map((s) => (
                <Swatch key={s} token={s} label={s.toUpperCase()} note={SIGNALS[s].meaning} />
              ))}
            </div>

            <h3 className="osd mt-10 mb-4 text-[10px] text-hud">Texto del HUD</h3>
            <div className="grid gap-3 rounded-xl border border-border p-5 sm:grid-cols-3">
              {[
                ["hud-strong", "Etiqueta principal, valores activos"],
                ["hud", "Estado, labels de sección"],
                ["hud-faint", "Metadatos, valores en reposo"],
              ].map(([t, use]) => (
                <div key={t} className="grid gap-1">
                  <span className="osd text-sm" style={{ color: `var(--${t})` }}>
                    ISO AUTO 1/2000
                  </span>
                  <Spec>--{t}</Spec>
                  <span className="text-xs text-muted-foreground">{use}</span>
                </div>
              ))}
            </div>

            <h3 className="osd mt-10 mb-4 text-[10px] text-hud">Sintaxis</h3>
            <pre className="overflow-x-auto rounded-xl border border-border bg-card p-5 font-mono text-sm">
              <span className="text-syntax-punct">{"{"}</span>
              {"\n  "}
              <span className="text-syntax-key">"name"</span>
              <span className="text-syntax-comment">: </span>
              <span className="text-syntax-string">"riqedev"</span>
              <span className="text-syntax-comment">,</span>
              {"\n  "}
              <span className="text-syntax-comment italic">// --syntax-key · string · punct · comment</span>
              {"\n"}
              <span className="text-syntax-punct">{"}"}</span>
            </pre>
          </Section>

          <Section id="tipografia" label="04 // tipografía" title="Inter para leer, Archivo para la marca">
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Inter (con tamaño óptico) carga todo lo que se lee: prosa, títulos, botones. Archivo, por su eje de
              ancho, aparece solo en dos voces de marca: expandida para el wordmark, semicondensada para el OSD del
              visor. JetBrains Mono queda para lo que es literalmente código.
            </p>
            <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              {TYPE_SPECIMENS.map((t) => (
                <div key={t.role} className="grid gap-4 bg-card p-6 md:grid-cols-[180px_1fr] md:gap-8">
                  <div className="grid content-start gap-1">
                    <span className="osd text-xs text-hud-strong">{t.role}</span>
                    <Spec>{t.spec}</Spec>
                    <span className="text-xs text-muted-foreground">{t.use}</span>
                  </div>
                  <div className="flex min-w-0 items-center overflow-hidden">{t.sample}</div>
                </div>
              ))}
            </div>

            <h3 className="osd mt-10 mb-4 text-[10px] text-hud">Escala</h3>
            <table className="w-full text-left text-sm">
              <thead className="osd text-[10px] text-hud">
                <tr className="border-b border-border">
                  <th className="py-2 font-normal">Token</th>
                  <th className="py-2 font-normal">px</th>
                  <th className="py-2 font-normal">Uso</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {TYPE_SCALE.map((r) => (
                  <tr key={r.token} className="border-b border-border/60">
                    <td className="py-2.5 font-mono text-xs text-foreground">{r.token}</td>
                    <td className="py-2.5 font-mono text-xs tabular-nums">{r.px}</td>
                    <td className="py-2.5">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section id="componentes" label="05 // componentes" title="Piezas del visor">
            <div className="grid gap-4 lg:grid-cols-2">
              <Demo title="HUDHeader + HUDFooter" note="Cada vista declara label, estado y señal.">
                <div className="relative h-40 overflow-hidden rounded-lg border border-border bg-background">
                  <ViewfinderCorners className="inset-2" />
                  <HUDHeader
                    label="ARCHIVE"
                    status="CATALOG"
                    signal="info"
                    right={<span className="text-hud-strong">8/8 FILES</span>}
                  />
                  <HUDFooter left="ROLL 01" right="[ 100% ]" className="flex" />
                </div>
              </Demo>

              <Demo title="Señales" note="Solo REC y ONLINE pulsan: son estados en vivo.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(
                    [
                      ["rec", "REC", true],
                      ["af", "ONLINE", true],
                      ["info", "CATALOG", false],
                      ["link", "OPEN FREQ", false],
                      ["warn", "CALIBRATION", false],
                    ] as const
                  ).map(([s, label, live]) => (
                    <span key={s} className="osd flex items-center gap-2 text-[11px] text-hud">
                      <SignalDot signal={s} live={live} /> {label}
                    </span>
                  ))}
                </div>
              </Demo>

              <Demo title="Chip + Kbd" note="Filtros con aria-pressed. Atajos 1–4, ⌘K y ←/→.">
                <div className="flex flex-wrap items-center gap-1.5">
                  {["ALL 8", "REACT 5", "PYTHON 1"].map((c) => (
                    <Chip key={c} active={chip === c} onClick={() => setChip(c)}>
                      {c}
                    </Chip>
                  ))}
                  <span className="ml-3 flex items-center gap-1.5 text-muted-foreground">
                    <Kbd>1</Kbd>
                    <Kbd>2</Kbd>
                    <Kbd>3</Kbd>
                    <Kbd>4</Kbd>
                    <Kbd>⌘K</Kbd>
                    <Kbd>←</Kbd>
                    <Kbd>→</Kbd>
                  </span>
                </div>
              </Demo>

              <Demo title="Botones" note="Todo lo presionable usa .pressable: scale(0.97) en 160ms.">
                <div className="flex flex-wrap gap-2">
                  <Button className="pressable">Live demo</Button>
                  <Button variant="outline" className="pressable">
                    Source
                  </Button>
                  <Button variant="ghost" className="pressable">
                    <MousePointerClick aria-hidden="true" /> Ghost
                  </Button>
                </div>
              </Demo>

              <TerminalCard title="TerminalCard.tsx" icon={Code2} className="lg:col-span-1">
                <div className="space-y-2 p-5 text-sm text-muted-foreground">
                  <p>
                    Bloque base de Profile, Work y Contact. Los semáforos quedan grises en reposo, como una ventana
                    inactiva, y toman color al pasar el cursor o al enfocar.
                  </p>
                  <Spec>title · icon · headerAction · delay</Spec>
                </div>
              </TerminalCard>

              <Demo title="FocusPull + FocusIndicator" note="El momento del hero: el sujeto entra desenfocado y, al quedar nítido, el indicador (●) del HUD confirma.">
                <FocusDemo key={afKey} onReplay={() => setAfKey((k) => k + 1)} />
              </Demo>
            </div>

            <h3 className="osd mt-10 mb-4 text-[10px] text-hud">Layout</h3>
            <ul className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
              <li>
                <strong className="text-foreground">Zonas reservadas:</strong> <Spec>pt-24</Spec> para el HUD,{" "}
                <Spec>pb-28</Spec> para el dock. Ninguna vista pone contenido fijo ahí.
              </li>
              <li>
                <strong className="text-foreground">Radios:</strong> <Spec>2px</Spec> en chips y etiquetas del HUD
                (piezas de instrumento), <Spec>12px</Spec> en cards, <Spec>16px</Spec> en diálogos y dock.
              </li>
              <li>
                <strong className="text-foreground">Viewport:</strong> <Spec>h-dvh</Spec>, nunca{" "}
                <Spec>h-screen</Spec>. Target: 1512×982 y 390×844.
              </li>
            </ul>
          </Section>

          <Section id="movimiento" label="06 // movimiento" title="Responder, no actuar">
            <div className="grid gap-4 md:grid-cols-2">
              {EASINGS.map((e) => (
                <div key={e.name} className="flex gap-5 rounded-xl border border-border bg-card p-5">
                  <CurvePlot curve={e.curve} />
                  <div className="grid min-w-0 flex-1 content-start gap-2 [container-type:inline-size]">
                    <span className="font-mono text-sm">{e.name}</span>
                    <Spec>cubic-bezier({e.curve.join(", ")})</Spec>
                    <span className="text-xs text-muted-foreground">{e.use}</span>
                    <MotionDemo curve={e.curve} duration={0.6} />
                  </div>
                </div>
              ))}
            </div>
            <table className="mt-8 w-full text-left text-sm">
              <thead className="osd text-[10px] text-hud">
                <tr className="border-b border-border">
                  <th className="py-2 font-normal">Duración</th>
                  <th className="py-2 font-normal">ms</th>
                  <th className="py-2 font-normal">Uso</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {DURATIONS.map((d) => (
                  <tr key={d.token} className="border-b border-border/60">
                    <td className="py-2.5 font-mono text-xs text-foreground">DURATION.{d.token}</td>
                    <td className="py-2.5 font-mono text-xs tabular-nums">{Math.round(d.ms)}</td>
                    <td className="py-2.5">{d.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
              <li>Salir es más rápido que entrar. Nada aparece desde scale(0): mínimo 0.95 + opacidad.</li>
              <li>Las acciones de teclado (1–4, ←/→) no animan. Responden al instante.</li>
              <li>
                Con <Spec>prefers-reduced-motion</Spec> no hay desplazamientos, pulsos ni desenfoque; el foco aparece ya confirmado.
              </li>
            </ul>
          </Section>

          <Section id="voz" label="07 // voz" title="Cómo habla la marca">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="osd text-[11px] text-hud-strong">La cámara habla en inglés</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  HUD, estados y etiquetas de sistema van en inglés, en mayúsculas OSD, como el menú de una cámara:{" "}
                  <Spec>REC</Spec>, <Spec>CATALOG</Spec>, <Spec>NO SIGNAL</Spec>, <Spec>Copy</Spec>.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="osd text-[11px] text-hud-strong">Enrique habla en español</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Bio, descripciones y mensajes para personas van en español, en primera persona, con verbos simples y
                  sin frases de marketing. Si una frase podría estar en cualquier portfolio, se reescribe.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <HUDFooter left="CAL 01" right="[ REF ]" />
    </HUDFrame>
  );
};

const FocusDemo = ({ onReplay }: { onReplay: () => void }) => {
  const [locked, setLocked] = useState(false);
  return (
    <div className="flex h-36 items-center justify-between gap-6 rounded-lg border border-border bg-background px-6">
      <FocusPull onFocused={() => setLocked(true)}>
        <span className="display text-4xl">
          focus
          <RecDot />
        </span>
      </FocusPull>
      <div className="flex flex-col items-end gap-3">
        <span className="osd flex items-center gap-3 text-[11px] text-hud-strong">
          <FocusIndicator locked={locked} /> F2.8
        </span>
        <button
          type="button"
          onClick={onReplay}
          aria-label="Repetir focus pull"
          className="pressable grid size-8 place-items-center rounded-md border border-border text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <RotateCcw size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const Demo = ({ title, note, children }: { title: string; note: string; children: ReactNode }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
    <div className="grid gap-0.5">
      <span className="font-mono text-sm">{title}</span>
      <span className="text-xs text-muted-foreground">{note}</span>
    </div>
    {children}
  </div>
);

export default DesignSystem;
