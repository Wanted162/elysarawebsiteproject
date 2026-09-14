import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductArt } from "@/components/ProductArt";

const products = [
  { name: "Blue Vitality", tone: "blue" as const, number: "01", description: "A bright, gently citrusy floral infusion made for fresh starts.", to: "/products/blue-vitality" },
  { name: "Crimson Bloom", tone: "coral" as const, number: "02", description: "A rich, rosy blend with a grounding finish for slower moments.", to: "/products/crimson-bloom" },
];

export default function Products() {
  return <div>
    <section className="bg-[#e6ece4] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-foreground/55 hover:text-primary"><ArrowLeft size={15} /> Back to Elysara</Link><p className="eyebrow mt-12 text-primary">The current collection</p><h1 className="mt-5 max-w-3xl text-6xl leading-[.98] sm:text-8xl">Good things,<br /><em className="font-normal text-primary">ready to steep.</em></h1><p className="mt-8 max-w-md text-base leading-7 text-foreground/65">Meet the first two Elysara blends, thoughtfully made with botanicals for everyday rituals that feel a little more special.</p></div></section>
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="grid gap-8 sm:grid-cols-2">{products.map((product) => <Link key={product.name} to={product.to} className="group"><ProductArt tone={product.tone} /><div className="flex items-start justify-between border-b border-border py-6"><div><p className="eyebrow text-muted-foreground">Floral tea · {product.number}</p><h2 className="mt-2 text-4xl">{product.name}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{product.description}</p></div><ArrowUpRight className="mt-1 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></Link>)}</div></section>
    <section className="bg-[#f0ebe1] px-6 py-20 text-center"><p className="eyebrow text-primary">More to come</p><h2 className="mt-4 text-4xl">This is just the beginning.</h2><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">Our garden is growing. Keep close for new categories, seasonal blends and more ways to make space for the good stuff.</p><Link to="/categories/floral-tea" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-primary">Explore floral tea <ArrowUpRight size={15} /></Link></section>
  </div>;
}
