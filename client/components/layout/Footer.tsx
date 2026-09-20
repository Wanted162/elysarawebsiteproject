import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return <footer className="glass-dark text-secondary-foreground">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:px-10">
      <div><Link to="/" className="flex items-center gap-2"><img src="https://cdn.builder.io/api/v1/image/assets%2F4215d9916ba54932a9c5dfbeef662b8a%2Fb05dbaf1bd604eb3bad4e9a855e3dbab?format=webp&width=800&height=1200" alt="Elysara Organics and Lifestyle" className="h-24 w-28 object-contain" /></Link><p className="mt-6 max-w-xs text-sm leading-7 text-secondary-foreground/65">Botanical blends and nourishing rituals, thoughtfully made for your everyday well-being.</p><div className="mt-6 flex gap-3"><span className="rounded-full border border-secondary-foreground/20 p-2"><Sparkles size={15} /></span></div></div>
      <div><p className="eyebrow text-accent">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-secondary-foreground/70"><Link className="hover:text-accent" to="/categories/floral-tea">Floral tea</Link><Link className="hover:text-accent" to="/categories/herbal-tea">Herbal tea</Link><Link className="hover:text-accent" to="/categories/superfoods">Superfoods</Link></div></div>
      <div><p className="eyebrow text-accent">Elysara</p><div className="mt-5 flex flex-col gap-3 text-sm text-secondary-foreground/70"><Link className="hover:text-accent" to="/about">Our story</Link><Link className="hover:text-accent" to="/contact">Contact</Link><Link className="hover:text-accent" to="/products">Shop blends</Link></div></div>
      <div><p className="eyebrow text-accent">Stay close</p><p className="mt-5 text-sm leading-6 text-secondary-foreground/70">Seasonal notes, ritual ideas, and first access to new blends.</p><div className="mt-5"><NewsletterForm dark /></div></div>
    </div>
    <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-secondary-foreground/15 px-6 py-6 text-[0.68rem] uppercase tracking-[0.14em] text-secondary-foreground/45 sm:flex-row sm:justify-between lg:px-10"><span>© 2024 Elysara Organics & Lifestyle</span><span>Made with intention</span></div>
  </footer>;
}
