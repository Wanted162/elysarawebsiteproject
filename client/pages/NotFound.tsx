import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();
  useEffect(() => { console.error("404 Error: User attempted to access non-existent route:", location.pathname); }, [location.pathname]);
  return <section className="photo-paper-warm flex min-h-[65vh] items-center justify-center px-6 py-24"><div className="text-center"><p className="eyebrow text-primary">A little lost?</p><h1 className="mt-4 text-8xl text-secondary">404</h1><p className="mt-4 text-lg text-muted-foreground">This path hasn’t bloomed yet.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"><ArrowLeft size={15} /> Return home</Link></div></section>;
}
