import path from "path";
import { copyFileSync } from "node:fs";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * GitHub Pages no conoce las rutas client-side de React Router.
 * Copiar dist/index.html → dist/404.html hace que GH Pages sirva el SPA en
 * cualquier path desconocido, y el snippet en index.html restaura la URL.
 */
const githubPagesSpaFallback = (): Plugin => ({
  name: "gh-pages-spa-fallback",
  apply: "build",
  closeBundle() {
    const out = path.resolve(__dirname, "dist");
    copyFileSync(path.join(out, "index.html"), path.join(out, "404.html"));
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Separa libs grandes para mejor cache hit en GitHub Pages
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["motion"],
          radix: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-slot",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
});
