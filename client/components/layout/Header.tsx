import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Floral Tea", to: "/categories/floral-tea" },
  { label: "Herbal Tea", to: "/categories/herbal-tea" },
  { label: "Superfoods", to: "/categories/superfoods" },
  { label: "Our story", to: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-background transition-transform group-hover:rotate-[-12deg]"><Leaf size={18} /></span>
          <span className="font-serif text-xl font-semibold tracking-[-0.03em]">Elysara<span className="text-primary">.</span></span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${isActive ? "text-primary" : "text-foreground/65 hover:text-primary"}`}>{link.label}</NavLink>)}
        </nav>
        <Link to="/categories/floral-tea" className="hidden rounded-full bg-primary px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5 sm:block">Discover tea</Link>
        <button type="button" aria-label="Toggle menu" className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-border/60 bg-background px-6 py-5 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">{links.map((link) => <NavLink key={link.to} onClick={() => setOpen(false)} to={link.to} className="py-1 font-serif text-2xl">{link.label}</NavLink>)}<Link onClick={() => setOpen(false)} to="/categories/floral-tea" className="mt-2 w-fit rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground">Discover tea</Link></div>
      </nav>}
    </header>
  );
}
