import { FormEvent, useEffect, useRef, useState } from "react";
import { ChevronDown, Leaf, MessageCircle, Send, X } from "lucide-react";
import { Link } from "react-router-dom";

type Product = {
  name: string;
  path: string;
  keywords: string[];
  description: string;
  fit: string;
};

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  action?: { label: string; to: string };
  suggestions?: string[];
};

const products: Product[] = [
  {
    name: "Blue Vitality",
    path: "/products/blue-vitality",
    keywords: ["fresh", "refreshing", "bright", "citrus", "morning", "afternoon", "light", "colour", "color", "antioxidant", "focus", "reset", "start"],
    description: "butterfly pea flower with rosemary and lemongrass",
    fit: "a bright, citrusy and naturally caffeine-free cup for fresh starts",
  },
  {
    name: "Crimson Bloom",
    path: "/products/crimson-bloom",
    keywords: ["tart", "hibiscus", "ruby", "red", "floral", "evening", "grounding", "deep", "iced", "ice", "cranberry", "bold", "slow"],
    description: "hibiscus with rosemary and lemongrass",
    fit: "a deeper, tart and fragrant cup for slower moments or serving over ice",
  },
];

const suggestions = ["Help me choose a blend", "I want something refreshing", "What is caffeine-free?", "How do I order?"];
const whatsapp = "https://wa.me/918668525793?text=Hello%20Elysara%2C%20I%20have%20a%20question%20about%20your%20blends.";

function recommend(query: string): Omit<Message, "id"> {
  const text = query.toLowerCase();
  const scores = products.map((product) => ({
    product,
    score: product.keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0),
  }));
  const best = [...scores].sort((a, b) => b.score - a.score)[0];
  const asksForChoice = /choose|recommend|right for me|which|help me pick|suggest/.test(text);

  if (best.score > 0 || asksForChoice) {
    if (best.score === 0) {
      return {
        from: "bot",
        text: "I can help you choose. Do you feel like something bright and citrusy, or something deeper and tart? Both of our blends are naturally caffeine-free.",
        suggestions: ["Bright and citrusy", "Deeper and tart", "Tell me about both"],
      };
    }
    return {
      from: "bot",
      text: `${best.product.name} could be a lovely fit. It is made with ${best.product.description} and suits ${best.product.fit}. ${text.includes("caffeine") || text.includes("energy") ? "It is naturally caffeine-free, so it is a gentle alternative to a caffeinated drink." : ""}`,
      action: { label: `Explore ${best.product.name}`, to: best.product.path },
      suggestions: [best.product.name === "Blue Vitality" ? "What is Crimson Bloom?" : "What is Blue Vitality?", "Compare both blends", "How do I order?"],
    };
  }

  if (text.includes("both") || text.includes("compare")) {
    return {
      from: "bot",
      text: "Blue Vitality is bright, citrusy and gently aromatic. Crimson Bloom is ruby-red, tart and more deeply floral. Both are caffeine-free and available in 25g for ₹289 or 50g for ₹499.",
      action: { label: "View both blends", to: "/products" },
      suggestions: ["Something refreshing", "Something tart", "How do I order?"],
    };
  }

  if (text.includes("blue") || text.includes("vitality") || text.includes("butterfly") || text.includes("rosemary")) {
    return { from: "bot", text: "Blue Vitality combines butterfly pea flower, rosemary and lemongrass. It is vivid, bright and naturally caffeine-free with a clean citrus lift.", action: { label: "Explore Blue Vitality", to: "/products/blue-vitality" }, suggestions: ["Is it refreshing?", "Compare with Crimson Bloom"] };
  }

  if (text.includes("crimson") || text.includes("bloom") || text.includes("hibiscus")) {
    return { from: "bot", text: "Crimson Bloom combines hibiscus, rosemary and lemongrass. It is a ruby-red, tart and fragrant blend that works beautifully warm or over ice.", action: { label: "Explore Crimson Bloom", to: "/products/crimson-bloom" }, suggestions: ["Is it caffeine-free?", "Compare with Blue Vitality"] };
  }

  if (text.includes("price") || text.includes("cost") || text.includes("size") || text.includes("gram") || text.includes("buy") || text.includes("order") || text.includes("cart")) {
    return { from: "bot", text: "Both blends are available in 25g for ₹289 and 50g for ₹499. Choose a size on a product page, add it to your cart, or send your order to Elysara on WhatsApp.", action: { label: "View available blends", to: "/products" }, suggestions: ["Open WhatsApp ordering", "Which blend should I buy?"] };
  }

  if (text.includes("ingredient") || text.includes("made") || text.includes("benefit") || text.includes("good") || text.includes("caffeine")) {
    return { from: "bot", text: "Blue Vitality uses butterfly pea flower, rosemary and lemongrass. Crimson Bloom uses hibiscus, rosemary and lemongrass. Both are naturally caffeine-free. Our product pages include ingredient notes and research context, not medical advice.", action: { label: "See all ingredients", to: "/products" }, suggestions: ["Something bright", "Something tart"] };
  }

  if (text.includes("category") || text.includes("categories") || text.includes("floral") || text.includes("herbal") || text.includes("superfood")) {
    return { from: "bot", text: "Our current collection is Floral Tea, where you will find Blue Vitality and Crimson Bloom. Herbal Tea and Superfoods are growing next.", action: { label: "Browse Floral Tea", to: "/categories/floral-tea" } };
  }

  if (text.includes("story") || text.includes("elysara") || text.includes("about") || text.includes("nature")) {
    return { from: "bot", text: "Elysara began with two friends stepping away from a corporate routine and rediscovering a slower, more connected relationship with nature. We bring those roots into modern everyday rituals.", action: { label: "Read our story", to: "/about" } };
  }

  if (text.includes("contact") || text.includes("whatsapp") || text.includes("help") || text.includes("human") || text.includes("delivery")) {
    return { from: "bot", text: "You can reach the Elysara team directly by WhatsApp or email for blend, ordering and delivery questions.", action: { label: "Contact Elysara", to: "/contact" } };
  }

  return { from: "bot", text: "I can help you choose a blend, compare ingredients, check sizes and prices, explain our categories, or guide you to WhatsApp ordering.", suggestions: ["Help me choose a blend", "Tell me about Blue Vitality", "Tell me about Crimson Bloom", "How do I order?"] };
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 1, from: "bot", text: "Welcome to Elysara. Tell me what kind of cup you are in the mood for, and I’ll suggest a blend.", suggestions }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setInput("");
    setMessages((current) => [...current, { id: Date.now(), from: "user", text: clean }]);
    setTyping(true);
    window.setTimeout(() => { setMessages((current) => [...current, { ...recommend(clean), id: Date.now() + 1 }]); setTyping(false); }, 450);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); send(input); };

  return <div className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7">
    {open && <div role="dialog" aria-label="Elysara assistant" className="mb-3 flex h-[min(660px,calc(100vh-112px))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden glass-surface rounded-[1.5rem] shadow-2xl">
      <div className="flex items-center justify-between bg-secondary px-5 py-4 text-secondary-foreground"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/15 text-accent"><Leaf size={18} /></span><div><p className="font-serif text-lg">Elysara guide</p><p className="text-[0.62rem] uppercase tracking-[0.14em] text-secondary-foreground/60">Find your botanical ritual</p></div></div><button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="rounded-full p-2 text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"><X size={17} /></button></div>
      <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf8f2] p-4">{messages.map((message) => <div key={message.id} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.from === "user" ? "luxury-button rounded-br-sm bg-primary text-primary-foreground" : "glass-surface rounded-bl-sm text-foreground/75"}`}><p>{message.text}</p>{message.action && <Link to={message.action.to} onClick={() => setOpen(false)} className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary hover:underline">{message.action.label} <ChevronDown size={13} className="-rotate-90" /></Link>}{message.suggestions && <div className="mt-3 flex flex-wrap gap-2">{message.suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => send(suggestion)} className="rounded-full border border-border px-3 py-1.5 text-[0.65rem] font-semibold text-foreground/65 hover:border-primary hover:text-primary">{suggestion}</button>)}</div>}</div></div>)}{typing && <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-3" aria-label="Elysara is thinking"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-.2s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-.1s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" /></div>}<div ref={endRef} /></div>
      <div className="border-t border-border bg-background p-3"><div className="mb-3 flex gap-2 overflow-x-auto pb-1">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => send(suggestion)} className="shrink-0 rounded-full border border-border px-3 py-2 text-[0.65rem] font-semibold text-foreground/65 hover:border-primary hover:text-primary">{suggestion}</button>)}</div><form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-border bg-muted/40 p-1 pl-4"><input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Ask Elysara a question" placeholder="Tell me what you’re looking for..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" /><button type="submit" aria-label="Send message" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40" disabled={!input.trim() || typing}><Send size={15} /></button></form><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted-foreground hover:text-primary"><MessageCircle size={14} /> Talk to the Elysara team</a></div>
    </div>}
    <button type="button" aria-label={open ? "Minimize assistant" : "Open Elysara assistant"} onClick={() => setOpen(!open)} className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:-translate-y-1 sm:h-16 sm:w-16">{open ? <ChevronDown size={22} /> : <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/45 transition-transform group-hover:rotate-[-12deg]"><Leaf size={22} /></span>}</button>
  </div>;
}
