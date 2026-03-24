import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Grid, User } from "lucide-react";

const NavItem = ({ to, icon: Icon, label, isActive }: any) => (
  <Link
    to={to}
    className={cn(
      "flex flex-col items-center justify-center w-16 h-14 rounded-lg transition-all duration-300",
      isActive ? "bg-white text-black scale-110" : "text-zinc-500 hover:text-white hover:bg-zinc-900"
    )}
  >
    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
    {isActive && <span className="text-[9px] font-medium mt-1">{label}</span>}
  </Link>
);

export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 px-2 py-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl ring-1 ring-white/10">
        <NavItem to="/" icon={Home} label="Hero" isActive={location.pathname === "/"} />
        <div className="w-px h-8 bg-zinc-800 mx-1" /> {/* Separator */}
        <NavItem to="/work" icon={Grid} label="Work" isActive={location.pathname === "/work"} />
        <NavItem to="/profile" icon={User} label="Profile" isActive={location.pathname === "/profile"} />
      </div>
    </div>
  );
};
