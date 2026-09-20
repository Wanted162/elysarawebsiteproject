import { ArrowUpRight, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, type CartItem } from "@/lib/cart";

export function CartBar() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const refresh = () => { setItems(getCart()); setDismissed(false); };
  useEffect(() => { refresh(); window.addEventListener("elysara-cart-updated", refresh); window.addEventListener("storage", refresh); return () => { window.removeEventListener("elysara-cart-updated", refresh); window.removeEventListener("storage", refresh); }; }, []);
  if (!items.length || dismissed) return null;
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <div className="fixed bottom-5 left-4 right-4 z-50 sm:bottom-7 sm:left-auto sm:right-24"><div className="flex items-center gap-4 glass-surface rounded-full bg-secondary/90 px-4 py-3 text-secondary-foreground shadow-2xl sm:min-w-[320px]"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-secondary"><ShoppingBag size={17} /></span><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-[0.13em]">{count} {count === 1 ? "item" : "items"} in your cart</p><p className="mt-0.5 text-xs text-secondary-foreground/65">₹{total} · ready when you are</p></div><Link to="/cart" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-accent-foreground">View cart <ArrowUpRight size={14} /></Link><button type="button" aria-label="Dismiss cart bar" onClick={() => setDismissed(true)} className="shrink-0 rounded-full p-1 text-secondary-foreground/55 hover:text-secondary-foreground"><X size={15} /></button></div></div>;
}
