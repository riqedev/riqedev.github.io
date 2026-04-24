// src/components/layout/MainLayout.tsx
import { ReactNode } from "react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground selection:bg-primary/30">
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-12">{children}</main>
    </div>
  );
};
