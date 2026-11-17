import type { ComponentType } from "react";
import { Mail, Rss, Camera } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";

export const EMAIL = "philiphcc@gmail.com";

export interface Channel {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  copy?: boolean;
}

/** Canales de contacto. Contact los lista; el menú ⌘K los reutiliza. */
export const CHANNELS: Channel[] = [
  { id: "01", label: "Email", href: `mailto:${EMAIL}`, icon: Mail, copy: true },
  { id: "02", label: "LinkedIn", href: "https://www.linkedin.com/in/enriquefcc/", icon: LinkedinIcon },
  { id: "03", label: "GitHub", href: "https://github.com/riqedev", icon: GithubIcon },
  { id: "04", label: "Blog", href: "https://riqedev-blog.vercel.app/", icon: Rss },
];

export const FLICKR = { label: "Flickr", href: "https://www.flickr.com/photos/breathnshoot/", icon: Camera };
