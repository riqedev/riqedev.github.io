import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, ArrowUpRight, Radio } from "lucide-react";
import { CHANNELS, EMAIL } from "@/lib/channels";
import { DURATION, EASE_OUT, stagger } from "@/lib/motion";
import { HUDFrame } from "@/components/shared/HUDFrame";
import { HUDHeader, HUDFooter } from "@/components/shared/HUDBar";
import { TerminalCard } from "@/components/shared/TerminalCard";

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
        signal="link"
        right={<span className="text-hud-strong">{CHANNELS.length} CHANNELS</span>}
      />

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-3xl h-full pt-24 pb-28 px-4 md:px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.modal, ease: EASE_OUT }}
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
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + stagger(idx), duration: DURATION.ui, ease: EASE_OUT }}
                    className="flex items-center justify-between gap-3 py-3 border-b border-border/40 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-hud-faint shrink-0 tabular-nums">[{ch.id}]</span>
                      <Icon size={14} className="text-muted-foreground shrink-0" aria-hidden="true" />
                      <span className="osd text-foreground text-[11px] sm:text-xs">
                        {ch.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {ch.copy && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          aria-label={copied ? "Correo copiado" : "Copiar correo"}
                          className="osd pressable flex h-7 items-center gap-1.5 rounded-xs border border-border px-2.5 text-[10px] text-muted-foreground outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                        >
                          {copied ? <Check size={11} className="text-af" /> : <Copy size={11} />}
                          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                        </button>
                      )}
                      <a
                        href={ch.href}
                        target={isMail ? undefined : "_blank"}
                        rel={isMail ? undefined : "noreferrer"}
                        aria-label={`${isMail ? "Enviar correo" : "Abrir"} ${ch.label}`}
                        className="osd pressable flex h-7 items-center gap-1.5 rounded-xs border border-border px-2.5 text-[10px] text-muted-foreground outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                      >
                        <span>{isMail ? "Send" : "Open"}</span>
                        <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}

              <div className="text-af mt-5 animate-pulse">&gt; _</div>
            </div>
          </TerminalCard>
        </motion.div>
      </div>

      <HUDFooter left="SIGNAL OK" right="[ AWAITING REPLY ]" />
    </HUDFrame>
  );
};
