import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Leaf, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AuthProps = { mode: "login" | "signup" };

export default function Auth({ mode }: AuthProps) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [welcomeName, setWelcomeName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) setWelcomeName(data.user.user_metadata?.full_name || "");
    });
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    setError("");
    setNotice("");
    if (!trimmedEmail) return setError("Enter your email address.");
    if (password.length < 6) return setError("Use a password with at least 6 characters.");
    if (signup && !trimmedName) return setError("Tell us your name to create your account.");
    if (!supabase || !isSupabaseConfigured) return setError("Authentication is not connected yet. Add the Supabase environment variables and try again.");

    setBusy(true);
    const result = signup
      ? await supabase.auth.signUp({ email: trimmedEmail, password, options: { data: { full_name: trimmedName } } })
      : await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
    setBusy(false);
    if (result.error) {
      const message = result.error.message.toLowerCase();
      if (message.includes("already registered") || message.includes("user already exists")) {
        setError("An account already exists with this email. Please log in instead.");
      } else if (message.includes("invalid login credentials")) {
        setError("That email or password is incorrect.");
      } else {
        setError(result.error.message);
      }
      return;
    }
    if (signup && !result.data.session) {
      setNotice("Your account was created. Email confirmation is enabled in Supabase, so disable it there to keep signup completely email-free.");
      return;
    }
    setWelcomeName(result.data.user?.user_metadata?.full_name || trimmedName);
  };

  return (
    <section className="photo-paper-warm flex min-h-[72vh] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-foreground/55 hover:text-primary"><ArrowLeft size={15} /> Back home</Link>
        <div className="mt-10 rounded-[1.5rem] border border-border bg-background/85 p-8 shadow-sm backdrop-blur-sm sm:p-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-background"><Leaf size={18} /></span>
          <p className="eyebrow mt-8 text-primary">Elysara circle</p>
          <h1 className="mt-3 text-4xl">{signup ? "Create your account." : "Welcome back."}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{signup ? "Create a simple Elysara account with your name, email, and password." : "Log in with your Elysara email and password."}</p>
          {welcomeName ? (
            <div className="mt-8"><p className="font-serif text-2xl">Welcome, {welcomeName}.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Your Elysara space is ready whenever you are.</p><button type="button" onClick={() => navigate("/")} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">Continue home <ArrowUpRight size={15} /></button></div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4">
              {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
              {notice && <p className="rounded-xl bg-secondary/10 px-4 py-3 text-sm leading-6 text-secondary-foreground">{notice}</p>}
              {signup && <label className="block text-sm font-medium">Your name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-primary/20 focus:ring-4" /></label>}
              <label className="block text-sm font-medium">Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-primary/20 focus:ring-4" /></label>
              <label className="block text-sm font-medium">Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={6} placeholder="At least 6 characters" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-primary/20 focus:ring-4" /></label>
              <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-primary-foreground disabled:opacity-60">{busy && <Loader2 size={15} className="animate-spin" />} {signup ? "Create account" : "Log in"}</button>
            </form>
          )}
          {!welcomeName && <p className="mt-7 text-center text-sm text-muted-foreground">{signup ? "Already a member?" : "New to Elysara?"} <Link className="font-semibold text-primary" to={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Create an account"}</Link></p>}
        </div>
      </div>
    </section>
  );
}
