import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "@/components/views/Home";
import { Work } from "@/components/views/Work";
import { Profile } from "@/components/views/Profile";
import { AppDock } from "@/components/layout/AppDock";
import { DotPattern } from "@/components/ui/dot-pattern"; // Importar DotPattern
import { cn } from "@/lib/utils";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      {/* Contenedor Principal */}
      <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-hidden transition-colors duration-300">
        {/* Rutas y Contenido */}
        <div className="relative z-10">
          <AnimatedRoutes />
        </div>

        {/* Navegación Flotante */}
        <AppDock />
      </div>
    </Router>
  );
}

export default App;
