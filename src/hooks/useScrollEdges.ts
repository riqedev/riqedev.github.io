import { useEffect, useState, type RefObject } from "react";

/**
 * Indica si queda contenido oculto arriba y/o abajo de un contenedor con scroll vertical.
 * Sirve para difuminar solo el borde que realmente corta algo (ver `ScrollArea fade` y Profile en mobile).
 */
export function useScrollEdges(ref: RefObject<HTMLElement | null>, enabled = true) {
  const [edges, setEdges] = useState({ top: false, bottom: false });

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const update = () => {
      const top = el.scrollTop > 4;
      const bottom = el.scrollHeight - el.scrollTop - el.clientHeight > 4;
      setEdges((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref, enabled]);

  return edges;
}
