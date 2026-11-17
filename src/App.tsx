import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
import { Home } from "@/components/views/Home";
import { Work } from "@/components/views/Work";
import { Profile } from "@/components/views/Profile";
import { Contact } from "@/components/views/Contact";
import { NotFound } from "@/components/views/NotFound";
import { AppDock } from "@/components/layout/AppDock";
import { CommandMenuProvider } from "@/components/layout/CommandMenu";

// El spec sheet del design system es una herramienta interna: solo existe en `npm run dev`.
// En build, import.meta.env.DEV es false y Vite elimina la ruta y su chunk del bundle.
const DesignSystem = import.meta.env.DEV ? lazy(() => import("@/components/views/DesignSystem")) : null;
const WordmarkLab = import.meta.env.DEV ? lazy(() => import("@/components/views/WordmarkLab")) : null;

const TITLES: Record<string, string> = {
  "/": "riqedev - Software Engineer",
  "/profile": "Profile - riqedev",
  "/work": "Work - riqedev",
  "/contact": "Contact - riqedev",
  "/system": "Design System - riqedev",
};

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = TITLES[location.pathname] ?? "No signal - riqedev";
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        {DesignSystem && (
          <Route
            path="/system"
            element={
              <Suspense fallback={<div className="h-dvh bg-background" />}>
                <DesignSystem />
              </Suspense>
            }
          />
        )}
        {WordmarkLab && (
          <Route
            path="/lab"
            element={
              <Suspense fallback={<div className="h-dvh bg-background" />}>
                <WordmarkLab />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <CommandMenuProvider>
          <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
            <a
              href="#main"
              className="osd sr-only z-60 rounded-xs bg-foreground px-3 py-2 text-[11px] text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
              Saltar al contenido
            </a>
            <main id="main" className="relative z-10">
              <AnimatedRoutes />
            </main>
            <AppDock />
          </div>
        </CommandMenuProvider>
      </Router>
    </MotionConfig>
  );
}

export default App;
