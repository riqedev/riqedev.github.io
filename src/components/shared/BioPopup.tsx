import { X, FileText } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WindowDots } from "@/components/shared/TerminalCard";

interface BioPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-foreground">{children}</strong>
);

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
  >
    {children}
  </a>
);

/** README.md abierto "en el editor": la bio completa. Radix Dialog aporta focus trap y Escape. */
export const BioPopup = ({ open, onOpenChange }: BioPopupProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      showCloseButton={false}
      className="group/card flex max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-xl border-border bg-card p-0 sm:max-w-2xl"
    >
      <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-border bg-muted/30 px-4">
        <div className="flex items-center gap-3 text-hud">
          <WindowDots />
          <FileText size={13} aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium tracking-wide">README.md</span>
        </div>
        <DialogPrimitive.Close
          aria-label="Cerrar bio"
          className="pressable -mr-2 grid size-7 place-items-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <X size={15} aria-hidden="true" />
        </DialogPrimitive.Close>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-8 p-6 leading-relaxed text-muted-foreground md:p-8">
          <header>
            <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground">
              Ingeniero & creativo
            </DialogTitle>
            <DialogDescription className="mt-1 font-mono text-[11px] text-hud">
              // bio completa, fuera del log
            </DialogDescription>
          </header>

          <section className="max-w-prose space-y-4">
            <h3 className="osd text-[10px] text-hud">Rol</h3>
            <p>
              Además del desarrollo técnico, me involucro en la <Strong>planificación</Strong>, la{" "}
              <Strong>comunicación con equipos y clientes</Strong> y la <Strong>gestión de recursos</Strong>. Con
              los años he ido tomando más <Strong>liderazgo</Strong>: coordinar, destrabar y mantener el foco en la
              calidad de lo que se entrega.
            </p>
            <blockquote className="border-l-2 border-foreground/25 pl-4 text-foreground/80 italic">
              "Siempre estoy buscando formas de mejorar mis habilidades para entregar lo mejor de mí en cada
              proyecto, desafío o meta que me proponga."
            </blockquote>
          </section>

          <section className="max-w-prose space-y-4">
            <h3 className="osd text-[10px] text-hud">Fuera del código</h3>
            <p>
              La <Strong>fotografía</Strong> es una de mis pasiones: me gusta capturar momentos auténticos a través del
              lente. Comparto el día a día con dos gatas y salgo en <Strong>bicicleta</Strong> para desconectar.
            </p>
            <p>
              Últimamente me metí de lleno en los <Strong>teclados mecánicos custom</Strong>, que juntan precisión,
              diseño y el gusto de armar algo desde cero. También escribo en mi <Strong>blog</Strong> sobre tecnología,
              desarrollo y lo que me tenga curioso esa semana.
            </p>
            <p>
              Mis fotos están en <ExternalLink href="https://www.flickr.com/photos/breathnshoot/">Flickr</ExternalLink>{" "}
              y los artículos en el <ExternalLink href="https://riqedev-blog.vercel.app/">blog</ExternalLink>.
            </p>
          </section>
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
);
