import { useCallback, useRef, type Ref } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  ref?: Ref<HTMLButtonElement>;
}

export const AnimatedThemeToggler = ({ className, duration = 400, ref, ...props }: AnimatedThemeTogglerProps) => {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Radix (TooltipTrigger asChild) inyecta su propio ref: lo combinamos con el nuestro,
  // que es el que mide el botón para originar el círculo del view transition.
  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = useCallback(async () => {
    const nextTheme = isDark ? "light" : "dark";

    // Fallback for browsers without View Transitions API
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    }).ready;

    if (!buttonRef.current) return;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration,
        easing: "cubic-bezier(0.77, 0, 0.175, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, setTheme, duration]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Activar tema claro" : "Activar tema oscuro"}
      className={cn(className)}
      {...props}
      ref={setRefs}
      onClick={(e) => {
        props.onClick?.(e);
        void toggleTheme();
      }}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
};
