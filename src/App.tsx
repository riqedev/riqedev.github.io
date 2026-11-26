import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
import { Home } from "@/components/views/Home";
import { Work } from "@/components/views/Work";
import { Profile } from "@/components/views/Profile";
import { Contact } from "@/components/views/Contact";
import { NotFound } from "@/components/views/NotFound";
import { AppDock } from "@/components/layout/AppDock";
import { CommandMenuProvider } from "@/components/layout/CommandMenu";
import { useCopy } from "@/lib/i18n";

const TITLES: Record<string, string> = {
  "/": "riqedev - Software Engineer",
  "/profile": "Profile - riqedev",
  "/work": "Work - riqedev",
  "/contact": "Contact - riqedev",
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const skip = useCopy({ es: "Saltar al contenido", en: "Skip to content" });
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <CommandMenuProvider>
          <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
            <a
              href="#main"
              className="osd sr-only z-60 rounded-xs bg-foreground px-3 py-2 text-xs text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
              {skip}
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
