// src/components/shared/SideNav.tsx
export const SideNav = () => (
  <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8 items-end">
    {["INTRO", "ARCHIVE", "CAPABILITIES"].map((label, i) => (
      <a
        key={label}
        href={`#${label.toLowerCase()}`}
        className="group flex items-center gap-4 text-[10px] tracking-[0.3em] text-zinc-600 hover:text-zinc-100 transition-colors"
      >
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
        <div className="h-px w-8 bg-zinc-800 group-hover:w-12 group-hover:bg-zinc-100 transition-all" />
      </a>
    ))}
  </nav>
);
