import { ArrowUpRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!email.trim()) return; setSubmitted(true); };
  if (submitted) return <p className={`flex items-center gap-2 text-sm ${dark ? "text-accent" : "text-primary"}`}><Check size={16} /> You’re on the list.</p>;
  return <form onSubmit={submit} className={`flex border-b pb-3 ${dark ? "border-secondary-foreground/30" : "border-foreground/30"}`}><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email address" placeholder="Your email address" className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${dark ? "placeholder:text-secondary-foreground/45" : "placeholder:text-muted-foreground"}`} /><button type="submit" aria-label="Subscribe" className={dark ? "text-accent" : "text-primary"}><ArrowUpRight size={20} /></button></form>;
}
