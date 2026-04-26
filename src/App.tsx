import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Home } from "@/components/views/Home";
import { Work } from "@/components/views/Work";
import { Profile } from "@/components/views/Profile";
import { Contact } from "@/components/views/Contact";
import { NotFound } from "@/components/views/NotFound";
import { AppDock } from "@/components/layout/AppDock";
import { ShutterTransition } from "@/components/shared/ShutterTransition";

const AnimatedRoutes = () => {
  const location = useLocation();
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
  return (
    <Router>
      <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-hidden transition-colors duration-300">
        <div className="relative z-10">
          <AnimatedRoutes />
        </div>
        <ShutterTransition />
        <AppDock />
      </div>
    </Router>
  );
}

export default App;
