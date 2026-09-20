import { ChevronDown, LogOut, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";
import { AUTH_UPDATED_EVENT, clearCurrentAccount, getCurrentAccount } from "@/lib/auth";
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
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const location = useLocation();
  useEffect(() => { const refresh = () => setCartCount(getCart().reduce((total, item) => total + item.quantity, 0)); refresh(); window.addEventListener("elysara-cart-updated", refresh); window.addEventListener("storage", refresh); return () => { window.removeEventListener("elysara-cart-updated", refresh); window.removeEventListener("storage", refresh); }; }, []);
  useEffect(() => { const refresh = () => { const account = getCurrentAccount(); setCurrentUser(account ? { name: account.name, email: account.email } : null); }; refresh(); window.addEventListener(AUTH_UPDATED_EVENT, refresh); window.addEventListener("storage", refresh); return () => { window.removeEventListener(AUTH_UPDATED_EVENT, refresh); window.removeEventListener("storage", refresh); }; }, []);
  const logout = () => { clearCurrentAccount(); setOpen(false); };
  useEffect(() => { setOpen(false); setCategoriesOpen(false); }, [location.pathname]);
  const categoryActive = location.pathname.startsWith("/categories/");
  return (
    <header className="glass-header sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="relative mx-auto flex h-[96px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[112px] lg:px-10">
        <Link to="/" className="group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center" onClick={() => setOpen(false)}>
          <img src="https://cdn.builder.io/api/v1/image/assets%2F4215d9916ba54932a9c5dfbeef662b8a%2Fb05dbaf1bd604eb3bad4e9a855e3dbab?format=webp&width=800&height=1200" alt="Elysara Organics and Lifestyle" className="h-24 w-32 object-contain transition-transform group-hover:scale-105 lg:h-28 lg:w-36" />
        </Link>
        <nav className="hidden items-center gap-9 lg:flex">
          <NavLink to="/" className={({ isActive }) => `text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${isActive ? "text-primary" : "text-foreground/65 hover:text-primary"}`}>Home</NavLink>
          <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
            <button type="button" onClick={() => setCategoriesOpen(!categoriesOpen)} className={`inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${categoryActive ? "text-primary" : "text-foreground/65 hover:text-primary"}`}>Categories <ChevronDown size={14} className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`} /></button>
            {categoriesOpen && <div className="absolute left-1/2 top-full z-20 w-48 -translate-x-1/2 pt-4"><div className="glass-surface rounded-2xl p-2 shadow-lg">{categoryLinks.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setCategoriesOpen(false)} className={({ isActive }) => `block rounded-lg px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors ${isActive ? "bg-muted text-primary" : "text-foreground/65 hover:bg-muted hover:text-primary"}`}>{link.label}</NavLink>)}</div></div>}
          </div>
          <NavLink to="/about" className={({ isActive }) => `text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${isActive ? "text-primary" : "text-foreground/65 hover:text-primary"}`}>Our story</NavLink>
        </nav>
        <div className="hidden items-center gap-5 lg:ml-auto lg:flex"><Link to="/products" className="flex shrink-0 items-center gap-3 border-l border-border pl-6 text-left transition-opacity hover:opacity-70"><span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/.12)]" /><span><span className="block text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary">Now available</span><span className="mt-1 block text-xs text-foreground/60">2 floral blends</span></span></Link><Link to="/cart" className="relative text-foreground/65 transition-colors hover:text-primary" aria-label="Cart"><ShoppingBag size={18} />{cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.55rem] font-bold text-primary-foreground">{cartCount}</span>}</Link>{currentUser ? <><span className="max-w-28 truncate text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary" title={currentUser.email}>Hi, {currentUser.name}</span><button type="button" onClick={logout} className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-foreground/65 hover:text-primary"><LogOut size={14} /> Logout</button></> : <><Link to="/login" className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-foreground/65 hover:text-primary">Login</Link><Link to="/signup" className="rounded-full border border-primary px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary hover:text-primary-foreground">Sign up</Link></>}</div>
        <button type="button" aria-label="Toggle menu" className="rounded-full p-1.5 [&_svg]:size-5 lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-border/60 bg-background px-6 py-5 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <NavLink onClick={() => setOpen(false)} to="/" className="py-1 font-serif text-2xl">Home</NavLink>
          <div className="border-y border-border/70 py-3"><p className="eyebrow mb-2 text-primary">Categories</p>{categoryLinks.map((link) => <NavLink key={link.to} onClick={() => setOpen(false)} to={link.to} className="block py-1 font-serif text-2xl">{link.label}</NavLink>)}</div>
          <NavLink onClick={() => setOpen(false)} to="/about" className="py-1 font-serif text-2xl">Our story</NavLink>
          <Link onClick={() => setOpen(false)} to="/products" className="mt-2 flex w-fit items-center gap-3 border-t border-border pt-4 text-left"><span className="h-2 w-2 rounded-full bg-primary" /><span><span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary">Now available</span><span className="mt-0.5 block text-sm text-foreground/60">2 floral blends</span></span></Link><Link onClick={() => setOpen(false)} to="/cart" className="flex items-center gap-3 py-1 font-serif text-2xl"><ShoppingBag size={20} className="text-primary" />Cart {cartCount > 0 && <span className="font-sans text-sm text-primary">({cartCount})</span>}</Link><div className="glass-surface flex items-center gap-5 rounded-2xl border-t pt-4">{currentUser ? <><span className="flex min-w-0 items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"><UserRound size={16} /> <span className="max-w-32 truncate">{currentUser.name}</span></span><button type="button" onClick={logout} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/70"><LogOut size={16} /> Logout</button></> : <><Link onClick={() => setOpen(false)} to="/login" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/70"><UserRound size={16} /> Login</Link><Link onClick={() => setOpen(false)} to="/signup" className="rounded-full border border-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">Sign up</Link></>}</div>
        </div>
      </nav>}
    </header>
  );
}
