import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const categoryLinks = [
  { label: "Floral Tea", to: "/categories/floral-tea" },
  { label: "Herbal Tea", to: "/categories/herbal-tea" },
  { label: "Superfoods", to: "/categories/superfoods" },
];

const links = [
  { label: "Home", to: "/" },
  { label: "Our story", to: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const location = useLocation();
  const categoryActive = location.pathname.startsWith("/categories/");
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="https://cdn.builder.io/api/v1/image/assets%2F4215d9916ba54932a9c5dfbeef662b8a%2F6bd145047a444341bc8bc140642abd85?format=webp&width=800&height=1200" alt="Elysara Organics and Lifestyle" className="h-12 w-10 object-contain transition-transform group-hover:scale-105" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={({ isActive }) => `text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${isActive ? "text-primary" : "text-foreground/65 hover:text-primary"}`}>Home</NavLink>
          <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
            <button type="button" onClick={() => setCategoriesOpen(!categoriesOpen)} className={`inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${categoryActive ? "text-primary" : "text-foreground/65 hover:text-primary"}`}>Categories <ChevronDown size={14} className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`} /></button>
            {categoriesOpen && <div className="absolute left-1/2 top-full z-20 w-48 -translate-x-1/2 pt-4"><div className="rounded-xl border border-border bg-background p-2 shadow-lg">{categoryLinks.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setCategoriesOpen(false)} className={({ isActive }) => `block rounded-lg px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors ${isActive ? "bg-muted text-primary" : "text-foreground/65 hover:bg-muted hover:text-primary"}`}>{link.label}</NavLink>)}</div></div>}
          </div>
          <NavLink to="/about" className={({ isActive }) => `text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${isActive ? "text-primary" : "text-foreground/65 hover:text-primary"}`}>Our story</NavLink>
        </nav>
        <Link to="/products" className="hidden items-center gap-3 border-l border-border pl-5 text-left sm:flex"><span className="h-2 w-2 rounded-full bg-primary" /><span><span className="block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-primary">Now available</span><span className="mt-0.5 block text-xs text-foreground/60">2 floral blends</span></span></Link>
        <button type="button" aria-label="Toggle menu" className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-border/60 bg-background px-6 py-5 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <NavLink onClick={() => setOpen(false)} to="/" className="py-1 font-serif text-2xl">Home</NavLink>
          <div className="border-y border-border/70 py-3"><p className="eyebrow mb-2 text-primary">Categories</p>{categoryLinks.map((link) => <NavLink key={link.to} onClick={() => setOpen(false)} to={link.to} className="block py-1 font-serif text-2xl">{link.label}</NavLink>)}</div>
          <NavLink onClick={() => setOpen(false)} to="/about" className="py-1 font-serif text-2xl">Our story</NavLink>
          <Link onClick={() => setOpen(false)} to="/products" className="mt-2 flex w-fit items-center gap-3 border-t border-border pt-4 text-left"><span className="h-2 w-2 rounded-full bg-primary" /><span><span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary">Now available</span><span className="mt-0.5 block text-sm text-foreground/60">2 floral blends</span></span></Link>
        </div>
      </nav>}
    </header>
  );
}
