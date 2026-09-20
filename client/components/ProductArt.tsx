const productImages = {
  blue: "https://cdn.builder.io/api/v1/image/assets%2F4215d9916ba54932a9c5dfbeef662b8a%2Fa0882b20877849b1b43a1a55062cd1cc?format=webp&width=800&height=1200",
  coral: "https://cdn.builder.io/api/v1/image/assets%2F4215d9916ba54932a9c5dfbeef662b8a%2F674b3484bbdc407e90708352cd3afd1c?format=webp&width=800&height=1200",
};

export function ProductArt({ tone = "blue", compact = false }: { tone?: "blue" | "coral"; compact?: boolean }) {
  const blue = tone === "blue";
  return <div className={`glass-surface group relative flex items-center justify-center overflow-hidden rounded-[1.5rem] ${compact ? "h-36 sm:h-44" : "h-52 sm:h-64"} ${blue ? "bg-[#dce7e2]" : "bg-[#ead8cd]"}`}>
    <img src={productImages[tone]} alt="" aria-hidden="true" className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 ${blue ? "opacity-75 saturate-[.9]" : "opacity-70 saturate-[.9] group-hover:opacity-80"}`} />
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5" />
    <div className={`absolute -right-10 -top-10 h-44 w-44 rounded-full border ${blue ? "border-secondary/20" : "border-primary/20"}`} />
    <div className={`absolute -bottom-16 -left-12 h-48 w-48 rounded-full border ${blue ? "border-secondary/20" : "border-primary/20"}`} />
    <svg className="absolute bottom-0 left-3 h-[85%] w-24 opacity-35" viewBox="0 0 100 190" fill="none"><path d="M48 190C49 136 50 89 58 23" stroke={blue ? "#405b4b" : "#9a503d"} strokeWidth="1.5"/><path d="M51 120C35 105 24 94 17 78M52 98C68 82 75 69 82 53M48 145C31 136 21 126 11 112" stroke={blue ? "#405b4b" : "#9a503d"} strokeWidth="1.5"/><ellipse cx="18" cy="78" rx="12" ry="5" transform="rotate(37 18 78)" fill={blue ? "#789080" : "#c17b66"}/><ellipse cx="82" cy="53" rx="12" ry="5" transform="rotate(-38 82 53)" fill={blue ? "#789080" : "#c17b66"}/><ellipse cx="11" cy="112" rx="12" ry="5" transform="rotate(38 11 112)" fill={blue ? "#789080" : "#c17b66"}/></svg>
    <div className={`relative z-10 flex h-40 w-28 flex-col items-center justify-center shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg] ${blue ? "bg-[#f2efe5]" : "bg-[#f5eee5]"}`}><span className="font-serif text-2xl italic text-foreground">elysara</span><span className="mt-3 text-[0.42rem] font-bold uppercase tracking-[0.22em] text-foreground/60">{blue ? "blue vitality" : "crimson bloom"}</span><span className="mt-1 text-[0.4rem] uppercase tracking-widest text-foreground/45">floral tea</span><span className={`mt-4 h-5 w-5 rounded-full ${blue ? "bg-secondary" : "bg-primary"}`} /></div>
  </div>;
}
