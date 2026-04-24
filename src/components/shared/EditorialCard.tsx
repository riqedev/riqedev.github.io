// src/components/shared/EditorialCard.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditorialCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const EditorialCard = ({ children, className, title }: EditorialCardProps) => (
  <div
    className={cn(
      "group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-2xl dark:bg-zinc-950/50",
      className
    )}
  >
    {title && <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{title}</h3>}
    {children}
  </div>
);
