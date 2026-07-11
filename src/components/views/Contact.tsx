import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Rss, Copy, Check, ArrowUpRight, Radio, type LucideIcon } from "lucide-react";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { TerminalCard } from "@/components/shared/TerminalCard";

const EMAIL = "philiphcc@gmail.com";

interface Channel {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  copy?: boolean;
}

const CHANNELS: Channel[] = [
  { id: "01", label: "Email", href: `mailto:${EMAIL}`, icon: Mail, copy: true },
  { id: "02", label: "LinkedIn", href: "https://www.linkedin.com/in/enriquefcc/", icon: Linkedin },
  { id: "03", label: "GitHub", href: "https://github.com/riqedev", icon: Github },
  { id: "04", label: "Blog", href: "https://riqedev-blog.vercel.app/", icon: Rss },
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
      <HUDHeader
        label="TRANSMIT"
        status="OPEN FREQUENCY"
        dotClassName="bg-cyan-400"
        right={<span className="text-foreground/55">{CHANNELS.length} CHANNELS</span>}
      />

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
                    className="flex items-center justify-between gap-3 py-3 border-b border-border/40 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-muted-foreground/50 shrink-0">[{ch.id}]</span>
                      <Icon size={14} className="text-muted-foreground shrink-0" />
                      <span className="text-foreground/90 uppercase tracking-wider text-[11px] sm:text-xs">
                        {ch.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {ch.copy && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          aria-label={copied ? "Copiado" : "Copiar"}
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
                        aria-label={`${isMail ? "Enviar correo" : "Abrir"} ${ch.label}`}
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

      <HUDFooter left="SIGNAL OK" right="[ AWAITING REPLY ]" />
    </HUDFrame>
  );
};
