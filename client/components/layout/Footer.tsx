import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return <footer className="bg-secondary text-secondary-foreground">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:px-10">
      <div><Link to="/" className="flex items-center gap-2"><img src="https://cdn.builder.io/api/v1/image/assets%2F4215d9916ba54932a9c5dfbeef662b8a%2F6bd145047a444341bc8bc140642abd85?format=webp&width=800&height=1200" alt="Elysara Organics and Lifestyle" className="h-20 w-16 object-fill" /></Link><p className="mt-6 max-w-xs text-sm leading-7 text-secondary-foreground/65">Botanical blends and nourishing rituals, thoughtfully made for your everyday well-being.</p><div className="mt-6 flex gap-3"><span className="rounded-full border border-secondary-foreground/20 p-2"><Sparkles size={15} /></span></div></div>
      <div><p className="eyebrow text-accent">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-secondary-foreground/70"><Link className="hover:text-accent" to="/categories/floral-tea">Floral tea</Link><Link className="hover:text-accent" to="/categories/herbal-tea">Herbal tea</Link><Link className="hover:text-accent" to="/categories/superfoods">Superfoods</Link></div></div>
      <div><p className="eyebrow text-accent">Elysara</p><div className="mt-5 flex flex-col gap-3 text-sm text-secondary-foreground/70"><Link className="hover:text-accent" to="/about">Our story</Link><Link className="hover:text-accent" to="/contact">Contact</Link><Link className="hover:text-accent" to="/">Journal</Link></div></div>
      <div><p className="eyebrow text-accent">Stay close</p><p className="mt-5 text-sm leading-6 text-secondary-foreground/70">Seasonal notes, ritual ideas, and first access to new blends.</p><div className="mt-5 flex border-b border-secondary-foreground/30 pb-3"><input aria-label="Email address" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-secondary-foreground/45" /><button aria-label="Subscribe" className="text-accent"><ArrowUpRight size={20} /></button></div></div>
    </div>
    <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-secondary-foreground/15 px-6 py-6 text-[0.68rem] uppercase tracking-[0.14em] text-secondary-foreground/45 sm:flex-row sm:justify-between lg:px-10"><span>© 2024 Elysara Organics & Lifestyle</span><span>Made with intention</span></div>
  </footer>;
}
