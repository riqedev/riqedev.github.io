import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Copy, RotateCcw, Star } from "lucide-react";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { Chip } from "@/components/shared/hud";
import { cn } from "@/lib/utils";

// Fuentes candidatas: solo se cargan en esta página (dev-only, chunk propio).
import "@fontsource/michroma/400.css";
import "@fontsource-variable/unbounded/wght.css";
import "@fontsource-variable/syne/wght.css";
import "@fontsource-variable/bricolage-grotesque/wdth.css";
import "@fontsource-variable/geist/wght.css";
import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource-variable/instrument-sans/wdth.css";
import "@fontsource-variable/sora/wght.css";

/**
 * /lab: laboratorio de wordmark y monograma. Herramienta interna (solo `npm run dev`).
 * Playground con controles + propuestas curadas + monogramas a tamaños reales de uso.
 */

interface FontDef {
  id: string;
  label: string;
  family: string;
  weight: [number, number];
  stretch?: [number, number];
  note: string;
}

const FONTS: FontDef[] = [
  { id: "archivo", label: "Archivo", family: "'Archivo Variable'", weight: [100, 900], stretch: [62, 125], note: "Actual. Grotesca con eje de ancho; expandida evoca el grabado del cuerpo de una cámara." },
  { id: "michroma", label: "Michroma", family: "'Michroma'", weight: [400, 400], note: "Heredera de Microgramma/Eurostile: la letra de la electrónica y las cámaras de los 70–90." },
  { id: "unbounded", label: "Unbounded", family: "'Unbounded Variable'", weight: [200, 900], note: "Geométrica ancha y redondeada. Muy contemporánea, más 'tech' que 'cámara'." },
  { id: "syne", label: "Syne", family: "'Syne Variable'", weight: [400, 800], note: "Ancha y expresiva, de estudio de diseño. Más artística, menos ingeniería." },
  { id: "bricolage", label: "Bricolage Grotesque", family: "'Bricolage Grotesque Variable'", weight: [200, 800], stretch: [75, 100], note: "Grotesca con carácter tipográfico (tinta, cortes). Cálida y editorial." },
  { id: "geist", label: "Geist", family: "'Geist Variable'", weight: [100, 900], note: "Neutral y precisa, de producto. El camino minimal tipo Vercel/Linear." },
  { id: "inter", label: "Inter Display", family: "'Inter Variable'", weight: [100, 900], note: "La fuente de lectura del sitio en tamaño display. Sobria, estilo Apple." },
  { id: "space", label: "Space Grotesk", family: "'Space Grotesk Variable'", weight: [300, 700], note: "Grotesca con raíz monoespaciada. Ingeniera, con algo de rareza." },
  { id: "instrument", label: "Instrument Sans", family: "'Instrument Sans Variable'", weight: [400, 700], stretch: [75, 100], note: "Grotesca limpia con eje de ancho; condensada se acerca al OSD." },
  { id: "sora", label: "Sora", family: "'Sora Variable'", weight: [100, 800], note: "Geométrica suave, buena legibilidad en tamaños chicos (monograma)." },
  { id: "mono", label: "JetBrains Mono", family: "'JetBrains Mono Variable'", weight: [100, 800], note: "La voz del código. Marca 100% ingeniería." },
];

type Case = "upper" | "lower" | "title";
type Dot = "none" | "period" | "circle" | "square" | "blink" | "cursor";
type DotColor = "rec" | "ink";

interface Config {
  font: string;
  weight: number;
  stretch: number;
  tracking: number;
  textCase: Case;
  dot: Dot;
  dotColor: DotColor;
}

const DEFAULT: Config = { font: "archivo", weight: 800, stretch: 125, tracking: -0.045, textCase: "upper", dot: "period", dotColor: "rec" };

/** Dirección recomendada (ver DESIGN.md §2): handle en minúscula, Archivo semiexpandido, punto redondo REC. */
const RECOMMENDED: Config = { font: "archivo", weight: 780, stretch: 112, tracking: -0.04, textCase: "lower", dot: "circle", dotColor: "rec" };

const PRESETS: { id: string; name: string; why: string; config: Config }[] = [
  { id: "R01", name: "Recomendada", why: "riqedev. en minúscula, Archivo 112%, punto redondo: un punto final que también es un LED.", config: RECOMMENDED },
  { id: "R02", name: "Recomendada, punto tinta", why: "La misma, sin acento: para contextos donde el rojo compite (fotos, slides de terceros).", config: { ...RECOMMENDED, dotColor: "ink" } },
  { id: "P01", name: "Actual", why: "Archivo expandido + punto REC cuadrado.", config: DEFAULT },
  { id: "P02", name: "Actual sin señal", why: "Mismo grabado, sin el punto: más sobrio.", config: { ...DEFAULT, dot: "none" } },
  { id: "P03", name: "LED redondo", why: "El REC real de la cámara es un círculo, no un cuadrado.", config: { ...DEFAULT, dot: "circle" } },
  { id: "P04", name: "Eurostile de cámara", why: "Michroma: la letra de las cámaras y la electrónica clásicas.", config: { font: "michroma", weight: 400, stretch: 100, tracking: 0.02, textCase: "upper", dot: "circle", dotColor: "rec" } },
  { id: "P05", name: "Minimal producto", why: "Geist minúscula y apretada, punto tinta. Cero ruido.", config: { font: "geist", weight: 700, stretch: 100, tracking: -0.06, textCase: "lower", dot: "period", dotColor: "ink" } },
  { id: "P06", name: "Apple-like", why: "Inter Display en minúscula con REC redondo.", config: { font: "inter", weight: 750, stretch: 100, tracking: -0.055, textCase: "lower", dot: "circle", dotColor: "rec" } },
  { id: "P07", name: "Ancha redonda", why: "Unbounded: presencia fuerte, más digital que óptica.", config: { font: "unbounded", weight: 700, stretch: 100, tracking: -0.04, textCase: "lower", dot: "circle", dotColor: "rec" } },
  { id: "P08", name: "Editorial", why: "Bricolage condensada: con carácter, menos 'tech'.", config: { font: "bricolage", weight: 800, stretch: 75, tracking: -0.04, textCase: "lower", dot: "period", dotColor: "rec" } },
  { id: "P09", name: "OSD", why: "Instrument condensada en mayúsculas: el nombre como lectura del visor.", config: { font: "instrument", weight: 700, stretch: 75, tracking: 0.04, textCase: "upper", dot: "square", dotColor: "rec" } },
  { id: "P10", name: "Ingeniería", why: "JetBrains Mono con cursor: el nombre como prompt.", config: { font: "mono", weight: 800, stretch: 100, tracking: -0.04, textCase: "lower", dot: "cursor", dotColor: "rec" } },
  { id: "P11", name: "Grotesca rara", why: "Space Grotesk: técnica, con detalles propios.", config: { font: "space", weight: 700, stretch: 100, tracking: -0.04, textCase: "lower", dot: "square", dotColor: "rec" } },
  { id: "P12", name: "Estudio", why: "Syne ancha: más diseño gráfico que ingeniería.", config: { font: "syne", weight: 800, stretch: 100, tracking: -0.03, textCase: "upper", dot: "period", dotColor: "rec" } },
];

const STORAGE = "lab-wordmark-v1";

const load = (): { config: Config; stars: string[] } => {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return JSON.parse(raw);
  } catch {
    // Sin storage: arrancamos con el default.
  }
  return { config: DEFAULT, stars: [] };
};

const fontOf = (id: string) => FONTS.find((f) => f.id === id) ?? FONTS[0];

const applyCase = (text: string, c: Case) =>
  c === "upper" ? text.toUpperCase() : c === "lower" ? text.toLowerCase() : text[0].toUpperCase() + text.slice(1).toLowerCase();

const COLORS = {
  dark: { bg: "oklch(0.145 0 0)", ink: "oklch(0.97 0 0)", rec: "oklch(0.65 0.23 27)", mute: "oklch(0.6 0 0)" },
  light: { bg: "oklch(0.985 0.002 264)", ink: "oklch(0.16 0 0)", rec: "oklch(0.58 0.22 27)", mute: "oklch(0.5 0 0)" },
};

/** Renderiza el wordmark según la config. `mode` fija los colores (no depende del tema del sitio). */
const Mark = ({ text = "riqedev", config, mode, size }: { text?: string; config: Config; mode: "dark" | "light"; size: number }) => {
  const f = fontOf(config.font);
  const c = COLORS[mode];
  const dotColor = config.dotColor === "rec" ? c.rec : c.ink;
  const style: CSSProperties = {
    fontFamily: f.family,
    fontWeight: config.weight,
    fontStretch: f.stretch ? `${config.stretch}%` : undefined,
    letterSpacing: `${config.tracking}em`,
    fontSize: size,
    lineHeight: 0.9,
    color: c.ink,
    whiteSpace: "nowrap",
  };
  const shape = (round: boolean, blink = false) => (
    <span
      aria-hidden="true"
      className={cn("ml-[0.06em] inline-block", blink && "animate-pulse")}
      style={{ width: "0.16em", height: "0.16em", background: dotColor, borderRadius: round ? "50%" : 0, verticalAlign: "baseline" }}
    />
  );
  return (
    <span style={style}>
      {applyCase(text, config.textCase)}
      {config.dot === "period" && <span style={{ color: dotColor }}>.</span>}
      {config.dot === "circle" && shape(true)}
      {config.dot === "square" && shape(false)}
      {config.dot === "blink" && shape(true, true)}
      {config.dot === "cursor" && (
        <span className="animate-pulse" style={{ color: dotColor }}>
          _
        </span>
      )}
    </span>
  );
};

const Surface = ({ mode, children, className }: { mode: "dark" | "light"; children: ReactNode; className?: string }) => (
  <div
    className={cn("flex items-center justify-center overflow-hidden rounded-xl border border-border", className)}
    style={{ background: COLORS[mode].bg }}
  >
    {children}
  </div>
);

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => String(v),
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  disabled?: boolean;
}) => (
  <label className={cn("grid gap-1.5", disabled && "pointer-events-none opacity-35")}>
    <span className="osd flex justify-between text-[10px] text-hud">
      {label} <span className="text-hud-strong">{format(value)}</span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="accent-foreground"
    />
  </label>
);

const MONOGRAMS: { label: string; text: string; dot: "trailing" | "corner" | "none" }[] = [
  { label: "R.", text: "R", dot: "trailing" },
  { label: "r.", text: "r", dot: "trailing" },
  { label: "R + REC", text: "R", dot: "corner" },
  { label: "RQ", text: "RQ", dot: "none" },
  { label: "rq.", text: "rq", dot: "trailing" },
];

const Monogram = ({ text, dot, config, mode, px }: { text: string; dot: "trailing" | "corner" | "none"; config: Config; mode: "dark" | "light"; px: number }) => {
  const f = fontOf(config.font);
  const c = COLORS[mode];
  const recColor = config.dotColor === "rec" ? c.rec : c.ink;
  const glyph = config.textCase === "lower" ? text.toLowerCase() : text === "rq" ? "RQ" : text;
  return (
    <div
      className="relative grid shrink-0 place-items-center overflow-hidden"
      style={{ width: px, height: px, borderRadius: px * 0.22, background: mode === "dark" ? "oklch(0.2 0 0)" : "oklch(1 0 0)", boxShadow: "inset 0 0 0 1px oklch(0.5 0 0 / 0.2)" }}
    >
      <span
        style={{
          fontFamily: f.family,
          fontWeight: config.weight,
          fontStretch: f.stretch ? `${Math.min(config.stretch, text.length > 1 ? 100 : config.stretch)}%` : undefined,
          letterSpacing: `${config.tracking}em`,
          fontSize: px * (text.length > 1 ? 0.42 : 0.6),
          lineHeight: 1,
          color: c.ink,
        }}
      >
        {glyph}
        {dot === "trailing" && config.dot !== "none" && (config.dot === "period" || config.dot === "cursor" ? (
          <span style={{ color: recColor }}>.</span>
        ) : (
          <span
            aria-hidden="true"
            className="ml-[0.06em] inline-block"
            style={{ width: "0.16em", height: "0.16em", background: recColor, borderRadius: config.dot === "square" ? 0 : "50%" }}
          />
        ))}
      </span>
      {dot === "corner" && (
        <span className="absolute rounded-full" style={{ width: px * 0.12, height: px * 0.12, top: px * 0.16, right: px * 0.16, background: recColor }} />
      )}
    </div>
  );
};

const WordmarkLab = () => {
  const [config, setConfig] = useState<Config>(() => load().config);
  const [stars, setStars] = useState<string[]>(() => load().stars);
  const [copied, setCopied] = useState(false);
  const font = fontOf(config.font);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ config, stars }));
    } catch {
      // Sin storage: el lab funciona igual, solo no recuerda.
    }
  }, [config, stars]);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    document.title = "Wordmark lab - riqedev";
    return () => meta.remove();
  }, []);

  const set = <K extends keyof Config>(k: K, v: Config[K]) => setConfig((c) => ({ ...c, [k]: v }));

  const pickFont = (id: string) => {
    const f = fontOf(id);
    setConfig((c) => ({
      ...c,
      font: id,
      weight: Math.min(Math.max(c.weight, f.weight[0]), f.weight[1]),
      stretch: f.stretch ? Math.min(Math.max(c.stretch, f.stretch[0]), f.stretch[1]) : 100,
    }));
  };

  const toggleStar = (id: string) => setStars((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const copySpec = async () => {
    const spec = { actual: config, favoritas: stars.map((id) => PRESETS.find((p) => p.id === id)).filter(Boolean) };
    try {
      await navigator.clipboard.writeText(JSON.stringify(spec, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Sin portapapeles.
    }
  };

  return (
    <HUDFrame>
      <HUDHeader
        label="LAB"
        status="WORDMARK"
        signal="warn"
        right={
          <>
            <span className="text-hud-strong">{font.label}</span>
            <span>{stars.length} FAV</span>
          </>
        }
      />

      <div className="relative z-10 h-full w-full overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-36 md:px-10">
          <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="osd text-[11px] text-hud">riqedev // wordmark & monograma</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">Wordmark lab</h1>
              <button
                type="button"
                onClick={() => setConfig(RECOMMENDED)}
                className="osd pressable mt-3 flex h-7 items-center gap-2 rounded-xs border border-foreground/40 px-2.5 text-[10px] text-foreground outline-none hover:border-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                ★ Cargar recomendada (R01)
              </button>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Ajusta fuente, peso, ancho, tracking y la señal final. Marca con estrella las propuestas que te gusten y
                usa "Copiar spec" para pasarme tu selección.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfig(DEFAULT)}
                className="osd pressable flex h-8 items-center gap-2 rounded-md border border-border px-3 text-[10px] text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <RotateCcw size={12} aria-hidden="true" /> Reset
              </button>
              <button
                type="button"
                onClick={copySpec}
                className="osd pressable flex h-8 items-center gap-2 rounded-md bg-foreground px-3 text-[10px] text-background outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                {copied ? "Copiado" : "Copiar spec"}
              </button>
            </div>
          </header>

          {/* PLAYGROUND */}
          <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="surface grid content-start gap-6 rounded-xl border border-border p-5">
              <div className="grid gap-2">
                <span className="osd text-[10px] text-hud">Fuente</span>
                <div className="flex flex-wrap gap-1.5">
                  {FONTS.map((f) => (
                    <Chip key={f.id} active={config.font === f.id} onClick={() => pickFont(f.id)}>
                      {f.label}
                    </Chip>
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{font.note}</p>
              </div>

              <Slider label="Peso" value={config.weight} min={font.weight[0]} max={font.weight[1]} step={10} onChange={(v) => set("weight", v)} disabled={font.weight[0] === font.weight[1]} />
              <Slider
                label="Ancho"
                value={font.stretch ? config.stretch : 100}
                min={font.stretch?.[0] ?? 100}
                max={font.stretch?.[1] ?? 100}
                step={1}
                onChange={(v) => set("stretch", v)}
                format={(v) => `${v}%`}
                disabled={!font.stretch}
              />
              <Slider label="Tracking" value={config.tracking} min={-0.1} max={0.15} step={0.005} onChange={(v) => set("tracking", v)} format={(v) => `${v.toFixed(3)}em`} />

              <div className="grid gap-2">
                <span className="osd text-[10px] text-hud">Caja</span>
                <div className="flex flex-wrap gap-1.5">
                  {(["upper", "lower", "title"] as const).map((c) => (
                    <Chip key={c} active={config.textCase === c} onClick={() => set("textCase", c)} className="normal-case">
                      {c === "upper" ? "RIQEDEV" : c === "lower" ? "riqedev" : "Riqedev"}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <span className="osd text-[10px] text-hud">Señal final</span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      ["none", "Sin"],
                      ["period", "Punto"],
                      ["circle", "LED ●"],
                      ["square", "LED ■"],
                      ["blink", "REC parpadeo"],
                      ["cursor", "Cursor _"],
                    ] as const
                  ).map(([d, l]) => (
                    <Chip key={d} active={config.dot === d} onClick={() => set("dot", d)}>
                      {l}
                    </Chip>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {(
                    [
                      ["rec", "Rojo REC"],
                      ["ink", "Tinta"],
                    ] as const
                  ).map(([d, l]) => (
                    <Chip key={d} active={config.dotColor === d} onClick={() => set("dotColor", d)} disabled={config.dot === "none"}>
                      {l}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid content-start gap-4">
              <div className="grid gap-4 xl:grid-cols-2">
                <Surface mode="dark" className="h-56">
                  <Mark config={config} mode="dark" size={64} />
                </Surface>
                <Surface mode="light" className="h-56">
                  <Mark config={config} mode="light" size={64} />
                </Surface>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Context label="Header README // 36px">
                  <Surface mode="dark" className="h-24">
                    <Mark config={config} mode="dark" size={36} />
                  </Surface>
                </Context>
                <Context label="Nav // 20px">
                  <Surface mode="light" className="h-24">
                    <Mark config={config} mode="light" size={20} />
                  </Surface>
                </Context>
                <Context label="Firma // 14px">
                  <Surface mode="dark" className="h-24 flex-col gap-1">
                    <Mark config={config} mode="dark" size={14} />
                    <span className="font-mono text-[10px]" style={{ color: COLORS.dark.mute }}>
                      Software Engineer
                    </span>
                  </Surface>
                </Context>
              </div>
            </div>
          </section>

          {/* MONOGRAMAS */}
          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">Monograma</h2>
            <p className="mt-1 mb-6 max-w-2xl text-sm text-muted-foreground">
              Con la fuente y ajustes actuales, a los tamaños donde vive un logo: 128 (perfil), 64 (dock retina), 32 y 16
              (favicon). Comparado con el logo actual.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {(["dark", "light"] as const).map((mode) => (
                <Surface key={mode} mode={mode} className="flex-col items-stretch gap-5 p-6">
                  {MONOGRAMS.map((m) => (
                    <div key={m.label} className="flex items-center gap-4">
                      <span className="w-16 shrink-0 font-mono text-[11px]" style={{ color: COLORS[mode].mute }}>
                        {m.label}
                      </span>
                      {[128, 64, 32, 16].map((px) => (
                        <Monogram key={px} text={m.text} dot={m.dot} config={config} mode={mode} px={px} />
                      ))}
                    </div>
                  ))}
                  <div className="flex items-center gap-4">
                    <span className="w-16 shrink-0 font-mono text-[11px]" style={{ color: COLORS[mode].mute }}>
                      actual
                    </span>
                    {[128, 64, 32, 16].map((px) => (
                      <div
                        key={px}
                        className="grid shrink-0 place-items-center"
                        style={{ width: px, height: px, borderRadius: px * 0.22, background: mode === "dark" ? "oklch(0.2 0 0)" : "oklch(1 0 0)", boxShadow: "inset 0 0 0 1px oklch(0.5 0 0 / 0.2)" }}
                      >
                        <img src="/Logo.png" alt="" style={{ width: px * 0.6, height: px * 0.6, filter: mode === "dark" ? "invert(1)" : undefined }} />
                      </div>
                    ))}
                  </div>
                </Surface>
              ))}
            </div>
          </section>

          {/* PROPUESTAS */}
          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">Propuestas</h2>
            <p className="mt-1 mb-6 max-w-2xl text-sm text-muted-foreground">
              Doce direcciones distintas. Clic en una para cargarla en el playground y afinarla; la estrella la guarda en
              tu selección.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {PRESETS.map((p) => {
                const starred = stars.includes(p.id);
                return (
                  <div key={p.id} className="surface group/p relative overflow-hidden rounded-xl border border-border">
                    <button
                      type="button"
                      onClick={() => setConfig(p.config)}
                      className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                      aria-label={`Cargar propuesta ${p.id}: ${p.name}`}
                    >
                      <div className="grid grid-cols-2">
                        <div className="flex h-28 items-center justify-center" style={{ background: COLORS.dark.bg }}>
                          <Mark config={p.config} mode="dark" size={p.config.font === "michroma" ? 19 : 24} />
                        </div>
                        <div className="flex h-28 items-center justify-center" style={{ background: COLORS.light.bg }}>
                          <Mark config={p.config} mode="light" size={p.config.font === "michroma" ? 19 : 24} />
                        </div>
                      </div>
                      <div className="grid gap-1 p-4">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <span className="font-mono text-[11px] font-normal text-hud">{p.id}</span>
                          {p.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{p.why}</span>
                        <span className="font-mono text-[10px] text-hud-faint">
                          {fontOf(p.config.font).label} {p.config.weight}
                          {fontOf(p.config.font).stretch ? ` // ${p.config.stretch}%` : ""} // {p.config.dot}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStar(p.id)}
                      aria-pressed={starred}
                      aria-label={starred ? `Quitar ${p.id} de favoritas` : `Marcar ${p.id} como favorita`}
                      className="pressable absolute right-3 bottom-3 grid size-8 place-items-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      <Star size={15} aria-hidden="true" className={cn(starred && "fill-warn text-warn")} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <HUDFooter left="LAB 01" right="[ DEV ONLY ]" />
    </HUDFrame>
  );
};

const Context = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="grid gap-2">
    <span className="osd text-[10px] text-hud">{label}</span>
    {children}
  </div>
);

export default WordmarkLab;
