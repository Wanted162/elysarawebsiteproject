import { ChevronDown, Leaf, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Message = { id: number; from: "bot" | "user"; text: string; action?: { label: string; to: string } };
const suggestions = ["Which tea is right for me?", "Tell me about Blue Vitality", "What is Crimson Bloom?", "How do I order?"];
const whatsapp = "https://wa.me/918668525793?text=Hello%20Elysara%2C%20I%20have%20a%20question%20about%20your%20blends.";

function replyTo(question: string): Omit<Message, "id"> {
  const query = question.toLowerCase();
  if (query.includes("blue") || query.includes("vitality") || query.includes("butterfly")) return { from: "bot", text: "Blue Vitality is our bright floral blend with butterfly pea flower, rosemary and lemongrass. It is naturally caffeine-free, vivid in colour and made for a fresh start.", action: { label: "Explore Blue Vitality", to: "/products/blue-vitality" } };
  if (query.includes("crimson") || query.includes("bloom") || query.includes("hibiscus")) return { from: "bot", text: "Crimson Bloom is a ruby-red hibiscus blend with rosemary and lemongrass. It is tart, fragrant and grounding, with a beautiful finish.", action: { label: "Explore Crimson Bloom", to: "/products/crimson-bloom" } };
  if (query.includes("category") || query.includes("categories") || query.includes("floral") || query.includes("herbal") || query.includes("superfood")) return { from: "bot", text: "Our garden currently has Floral Tea, with Herbal Tea and Superfoods growing next. The Floral Tea collection is where you will find our two available blends.", action: { label: "Browse categories", to: "/categories/floral-tea" } };
  if (query.includes("price") || query.includes("cost") || query.includes("size") || query.includes("gram") || query.includes("buy") || query.includes("order") || query.includes("cart")) return { from: "bot", text: "Both blends are available in 25g for ₹289 and 50g for ₹499. Choose your size on a product page, add it to your cart, or start a WhatsApp order.", action: { label: "View available blends", to: "/products" } };
  if (query.includes("ingredient") || query.includes("made") || query.includes("benefit") || query.includes("good")) return { from: "bot", text: "Our blends use whole botanicals. Blue Vitality combines butterfly pea flower, rosemary and lemongrass; Crimson Bloom combines hibiscus, rosemary and lemongrass. Product pages include ingredient notes and research context." };
  if (query.includes("story") || query.includes("elysara") || query.includes("about") || query.includes("nature")) return { from: "bot", text: "Elysara began with two friends stepping away from a corporate routine and rediscovering a slower, more connected relationship with nature. We bring those roots into modern everyday rituals.", action: { label: "Read our story", to: "/about" } };
  if (query.includes("contact") || query.includes("whatsapp") || query.includes("help") || query.includes("human")) return { from: "bot", text: "You can reach the Elysara team directly by email or WhatsApp. We are happy to help with blends, ordering and delivery questions.", action: { label: "Contact Elysara", to: "/contact" } };
  return { from: "bot", text: "I can help with blends, ingredients, sizes, pricing, ordering, categories and the Elysara story. If you have something more specific, our team is also one message away on WhatsApp." };
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 1, from: "bot", text: "Welcome to Elysara. I’m here to help you find a botanical ritual that feels right.", action: { label: "Explore available blends", to: "/products" } }]);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setInput("");
    setMessages((current) => [...current, { id: Date.now(), from: "user", text: clean }]);
    setTyping(true);
    window.setTimeout(() => { setMessages((current) => [...current, { ...replyTo(clean), id: Date.now() + 1 }]); setTyping(false); }, 550);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); send(input); };
  return <div className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7">
    {open && <div role="dialog" aria-label="Elysara assistant" className="mb-3 flex h-[min(620px,calc(100vh-112px))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-2xl">
      <div className="flex items-center justify-between bg-secondary px-5 py-4 text-secondary-foreground"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/15 text-accent"><Leaf size={18} /></span><div><p className="font-serif text-lg">Elysara guide</p><p className="text-[0.62rem] uppercase tracking-[0.14em] text-secondary-foreground/60">Here to help you find your ritual</p></div></div><button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="rounded-full p-2 text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"><X size={17} /></button></div>
      <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf8f2] p-4">{messages.map((message) => <div key={message.id} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.from === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border border-border bg-background text-foreground/75"}`}><p>{message.text}</p>{message.action && <Link to={message.action.to} onClick={() => setOpen(false)} className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary hover:underline">{message.action.label} <ChevronDown size={13} className="-rotate-90" /></Link>}</div></div>)}{typing && <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-3"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-.2s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-.1s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" /></div>}<div ref={endRef} /></div>
      <div className="border-t border-border bg-background p-3"><div className="mb-3 flex gap-2 overflow-x-auto pb-1">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => send(suggestion)} className="shrink-0 rounded-full border border-border px-3 py-2 text-[0.65rem] font-semibold text-foreground/65 hover:border-primary hover:text-primary">{suggestion}</button>)}</div><form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-border bg-muted/40 p-1 pl-4"><input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Ask Elysara a question" placeholder="Ask about our blends..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" /><button type="submit" aria-label="Send message" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40" disabled={!input.trim() || typing}><Send size={15} /></button></form><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted-foreground hover:text-primary"><MessageCircle size={14} /> Talk to the Elysara team</a></div>
    </div>}
    <button type="button" aria-label={open ? "Minimize assistant" : "Open Elysara assistant"} onClick={() => setOpen(!open)} className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:-translate-y-1 sm:h-16 sm:w-16">{open ? <ChevronDown size={22} /> : <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/45 transition-transform group-hover:rotate-[-12deg]"><Leaf size={22} /></span>}</button>
  </div>;
}
