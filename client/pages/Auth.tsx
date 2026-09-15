import { ArrowLeft, ArrowUpRight, Leaf } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type AuthProps = { mode: "login" | "signup" };
type Account = { email: string; name: string };

export default function Auth({ mode }: AuthProps) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    let account: Account | null = null;
    try { account = JSON.parse(localStorage.getItem("elysara-account") ?? "null") as Account | null; } catch { account = null; }
    if (signup) {
      localStorage.setItem("elysara-account", JSON.stringify({ email: email.trim().toLowerCase(), name: name.trim() }));
      localStorage.setItem("elysara-member", "true");
      setSubmitted(true);
    } else if (account?.email === email.trim().toLowerCase()) {
      localStorage.setItem("elysara-member", "true");
      setSubmitted(true);
    } else {
      setError("We couldn’t find an account with that email. Please sign up first.");
    }
  };
  return <section className="photo-paper-warm flex min-h-[72vh] items-center justify-center px-6 py-24"><div className="w-full max-w-md"><Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-foreground/55 hover:text-primary"><ArrowLeft size={15} /> Back home</Link><div className="mt-10 rounded-[1.5rem] border border-border bg-background/85 p-8 shadow-sm backdrop-blur-sm sm:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-background"><Leaf size={18} /></span><p className="eyebrow mt-8 text-primary">Elysara circle</p><h1 className="mt-3 text-4xl">{signup ? "Create your account." : "Welcome back."}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">{signup ? "Start your Elysara ritual space and keep your favourite blends close." : "Log in to keep your saved rituals and order details together."}</p>{submitted ? <div className="mt-8"><p className="text-base leading-7 text-muted-foreground">{signup ? "Your Elysara space is ready." : "You’re back in your Elysara space."}</p><button type="button" onClick={() => navigate("/")} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">Continue home <ArrowUpRight size={15} /></button></div> : <form onSubmit={handleSubmit} className="mt-8 space-y-5">{signup && <label className="block"><span className="eyebrow text-muted-foreground">Name</span><input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary" placeholder="Your name" /></label>}<label className="block"><span className="eyebrow text-muted-foreground">Email</span><input required value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary" placeholder="you@example.com" /></label><label className="block"><span className="eyebrow text-muted-foreground">Password</span><input required minLength={6} type="password" className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary" placeholder="At least 6 characters" /></label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">{signup ? "Create account" : "Log in"} <ArrowUpRight size={15} /></button></form>}<p className="mt-8 text-center text-sm text-muted-foreground">{signup ? "Already a member?" : "New to Elysara?"} <Link to={signup ? "/login" : "/signup"} className="font-semibold text-primary hover:underline">{signup ? "Log in" : "Sign up"}</Link></p></div></div></section>;
}
