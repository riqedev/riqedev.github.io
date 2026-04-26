import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Rss, Copy, Check, ArrowUpRight, Radio, type LucideIcon } from "lucide-react";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { TerminalCard } from "@/components/shared/TerminalCard";

const EMAIL = "philiphcc@gmail.com";

interface Channel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  copy?: boolean;
}

const CHANNELS: Channel[] = [
  { id: "01", label: "EMAIL", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail, copy: true },
  {
    id: "02",
    label: "LINKEDIN",
    value: "/in/enriquefcc",
    href: "https://www.linkedin.com/in/enriquefcc/",
    icon: Linkedin,
  },
  { id: "03", label: "GITHUB", value: "@riqedev", href: "https://github.com/riqedev", icon: Github },
  { id: "04", label: "BLOG", value: "enrique-blog.vercel.app", href: "https://enrique-blog.vercel.app/", icon: Rss },
];

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // navigator.clipboard puede no estar disponible (http, sin permiso); silencioso por diseño.
    }
  };

  return (
    <HUDFrame>
      {/* HUD HEADER */}
      <div className="absolute top-7 sm:top-8 md:top-9 w-full px-7 md:px-9 z-20 flex justify-between items-start text-[0.55rem] md:text-[0.65rem] font-mono tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
        <div className="flex flex-col gap-2 text-left">
          <span className="text-foreground/55 tracking-[0.2em]">TRANSMIT</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-foreground/45">OPEN FREQUENCY</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-foreground/55">{CHANNELS.length} CHANNELS</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-3xl h-full pt-24 pb-24 px-4 md:px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <TerminalCard title="transmission.log" icon={Radio}>
            <div className="p-5 md:p-7 font-mono text-xs md:text-sm space-y-1">
              <div className="text-muted-foreground mb-4">&gt; opening channels...</div>

              {CHANNELS.map((ch, idx) => {
                const Icon = ch.icon;
                const isMail = ch.href.startsWith("mailto:");
                return (
                  <motion.div
                    key={ch.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + idx * 0.08 }}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border/40 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-muted-foreground/50 shrink-0">[{ch.id}]</span>
                      <Icon size={14} className="text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground/80 uppercase tracking-wider text-[10px] shrink-0">
                        {ch.label}
                      </span>
                      <span className="text-foreground/90 truncate select-all">{ch.value}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                      {ch.copy && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          aria-label={copied ? "Email copiado" : "Copiar email"}
                          className="flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border/40 hover:border-border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                        >
                          {copied ? <Check size={11} /> : <Copy size={11} />}
                          <span>{copied ? "OK" : "Copy"}</span>
                        </button>
                      )}
                      <a
                        href={ch.href}
                        target={isMail ? undefined : "_blank"}
                        rel={isMail ? undefined : "noreferrer"}
                        className="flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border/40 hover:border-border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                      >
                        <span>{isMail ? "Send" : "Open"}</span>
                        <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}

              <div className="text-emerald-500 mt-5 animate-pulse">&gt; _</div>
            </div>
          </TerminalCard>
        </motion.div>
      </div>

      {/* HUD FOOTER */}
      <div className="absolute bottom-7 sm:bottom-8 md:bottom-9 w-full px-7 md:px-9 flex justify-between items-end text-[0.55rem] md:text-[0.65rem] font-mono text-muted-foreground/40 uppercase pointer-events-none z-10">
        <span>SIGNAL OK</span>
        <span>[ AWAITING REPLY ]</span>
      </div>
    </HUDFrame>
  );
};
