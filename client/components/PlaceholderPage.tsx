import { ArrowLeft, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export function PlaceholderPage({ title, label, description }: { title: string; label: string; description: string }) {
  return <section className="photo-paper-warm flex min-h-[65vh] items-center justify-center px-6 py-24"><div className="max-w-xl text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-secondary"><Leaf size={26} /></span><p className="eyebrow mt-8 text-primary">{label}</p><h1 className="mt-4 text-5xl leading-tight sm:text-6xl">{title}</h1><p className="mx-auto mt-6 max-w-md text-base leading-7 text-muted-foreground">{description}</p><Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary"><ArrowLeft size={16} /> Back home</Link></div></section>;
}
