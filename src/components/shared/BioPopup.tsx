import type { ReactNode } from "react";
import { X, FileText } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WindowDots } from "@/components/shared/TerminalCard";
import { useCopy, type Localized } from "@/lib/i18n";

interface BioPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-foreground">{children}</strong>
);

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
  >
    {children}
  </a>
);

const FLICKR_URL = "https://www.flickr.com/photos/breathnshoot/";
const BLOG_URL = "https://riqedev-blog.vercel.app/";

const quoteClass =
  "border-l-2 border-foreground/25 pl-4 text-foreground/80 italic";

const COPY: Localized<{
  title: string;
  subtitle: string;
  close: string;
  roleHeading: string;
  role: ReactNode;
  outsideHeading: string;
  outside: ReactNode;
}> = {
  es: {
    title: "Ingeniero & creativo",
    subtitle: "// bio completa, fuera del log",
    close: "Cerrar bio",
    roleHeading: "Rol",
    role: (
      <>
        <p>
          Además del desarrollo técnico, me involucro en la{" "}
          <Strong>planificación</Strong>, la{" "}
          <Strong>comunicación con equipos y clientes</Strong> y la{" "}
          <Strong>gestión de recursos</Strong>. Con los años he ido tomando más{" "}
          <Strong>liderazgo</Strong>: coordinar, destrabar y mantener el foco en
          la calidad de lo que se entrega.
        </p>
        <blockquote className={quoteClass}>
          "Siempre estoy buscando formas de mejorar mis habilidades para
          entregar lo mejor de mí en cada proyecto, desafío o meta que me
          proponga."
        </blockquote>
      </>
    ),
    outsideHeading: "Fuera del código",
    outside: (
      <>
        <p>
          La <Strong>fotografía</Strong> es una de mis pasiones: me gusta
          capturar momentos auténticos a través del lente. Comparto el día a día
          con dos gatas y salgo en <Strong>bicicleta</Strong> para desconectar.
        </p>
        <p>
          Últimamente me metí de lleno en los{" "}
          <Strong>teclados mecánicos custom</Strong>, que juntan precisión,
          diseño y el gusto de armar algo desde cero. También escribo en mi{" "}
          <Strong>blog</Strong> sobre tecnología, desarrollo y lo que me tenga
          curioso esa semana.
        </p>
        <p>
          Mis fotos están en{" "}
          <ExternalLink href={FLICKR_URL}>Flickr</ExternalLink> y los artículos
          en el <ExternalLink href={BLOG_URL}>blog</ExternalLink>.
        </p>
      </>
    ),
  },
  en: {
    title: "Engineer & creative",
    subtitle: "// full bio, off the log",
    close: "Close bio",
    roleHeading: "Role",
    role: (
      <>
        <p>
          Beyond the technical work, I get involved in <Strong>planning</Strong>
          , <Strong>communication with teams and clients</Strong> and{" "}
          <Strong>resource management</Strong>. Over the years I've taken on
          more <Strong>leadership</Strong>: coordinating, unblocking and keeping
          the focus on the quality of what we ship.
        </p>
        <blockquote className={quoteClass}>
          "I'm always looking for ways to sharpen my skills and give my best in
          every project, challenge or goal I set for myself."
        </blockquote>
      </>
    ),
    outsideHeading: "Outside of code",
    outside: (
      <>
        <p>
          <Strong>Photography</Strong> is one of my passions: I like capturing
          authentic moments through the lens. I share my days with two cats and
          ride my <Strong>bike</Strong> to switch off.
        </p>
        <p>
          Lately I've gone all in on{" "}
          <Strong>custom mechanical keyboards</Strong>, which mix precision,
          design and the joy of building something from scratch. I also write on
          my <Strong>blog</Strong> (in Spanish) about technology, development
          and whatever has me curious that week.
        </p>
        <p>
          My photos are on <ExternalLink href={FLICKR_URL}>Flickr</ExternalLink>{" "}
          and my articles on the{" "}
          <ExternalLink href={BLOG_URL}>blog</ExternalLink>.
        </p>
      </>
    ),
  },
};

/** README.md abierto "en el editor": la bio completa. Radix Dialog aporta focus trap y Escape. */
export const BioPopup = ({ open, onOpenChange }: BioPopupProps) => {
  const t = useCopy(COPY);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="group/card flex max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 sm:max-w-2xl"
      >
        <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-border bg-muted/30 px-4">
          <div className="flex items-center gap-3 text-hud">
            <WindowDots />
            <FileText size={13} aria-hidden="true" />
            <span className="font-mono text-osd-11 font-medium tracking-wide">
              README.md
            </span>
          </div>
          <DialogPrimitive.Close
            aria-label={t.close}
            className="pressable -mr-2 grid size-7 place-items-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <X size={15} aria-hidden="true" />
          </DialogPrimitive.Close>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-8 p-6 leading-relaxed text-muted-foreground md:p-8">
            <header>
              <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground">
                {t.title}
              </DialogTitle>
              <DialogDescription className="mt-1 font-mono text-osd-11 text-hud">
                {t.subtitle}
              </DialogDescription>
            </header>

            <section className="max-w-prose space-y-4">
              <h3 className="osd text-osd-10 text-hud">{t.roleHeading}</h3>
              {t.role}
            </section>

            <section className="max-w-prose space-y-4">
              <h3 className="osd text-osd-10 text-hud">{t.outsideHeading}</h3>
              {t.outside}
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
