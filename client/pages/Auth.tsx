import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Leaf, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AuthProps = { mode: "login" | "signup" };

const PENDING_NAME_KEY = "elysara-pending-name";
const PUBLIC_SITE_URL = "https://elysaraorganicsandlifestyle.netlify.app";

export default function Auth({ mode }: AuthProps) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const pendingName = localStorage.getItem(PENDING_NAME_KEY)?.trim();
      if (pendingName) {
        const update = await supabase.auth.updateUser({ data: { full_name: pendingName } });
        if (!update.error) localStorage.removeItem(PENDING_NAME_KEY);
      }
      setWelcomeName(pendingName || data.user.user_metadata?.full_name || "");
    });
  }, []);

  const sendMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    setError("");
    setNotice("");
    if (!trimmedEmail) {
      setError("Enter your email address.");
      return;
    }
    if (signup && !trimmedName) {
      setError("Tell us your name to create your account.");
      return;
    }
    if (!supabase || !isSupabaseConfigured) {
      setError("Email sign-in is not connected yet. Add the Supabase environment variables and try again.");
      return;
    }

    setBusy(true);
    if (signup) localStorage.setItem(PENDING_NAME_KEY, trimmedName);
    const result = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        shouldCreateUser: signup,
        emailRedirectTo: `${PUBLIC_SITE_URL}${signup ? "/signup" : "/login"}`,
      },
    });
    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setNotice(`We sent a secure sign-in link to ${trimmedEmail}. Open it to continue.`);
    setSent(true);
  };

  return (
    <section className="photo-paper-warm flex min-h-[72vh] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-foreground/55 hover:text-primary"><ArrowLeft size={15} /> Back home</Link>
        <div className="mt-10 rounded-[1.5rem] border border-border bg-background/85 p-8 shadow-sm backdrop-blur-sm sm:p-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-background"><Leaf size={18} /></span>
          <p className="eyebrow mt-8 text-primary">Elysara circle</p>
          <h1 className="mt-3 text-4xl">{signup ? "Create your account." : "Welcome back."}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{signup ? "Enter your name and email to get started." : "Enter your email to sign in securely."}</p>
          {sent ? (
            <div className="mt-8 rounded-2xl bg-secondary/10 p-5">
              <p className="font-serif text-2xl">Link sent.</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{notice}</p>
              <button type="button" onClick={() => { setSent(false); setNotice(""); }} className="mt-6 text-xs font-bold uppercase tracking-[0.13em] text-primary">Use a different email</button>
            </div>
          ) : (
            <form onSubmit={sendMagicLink} className="mt-8 space-y-4">
              {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
              {signup && <label className="block text-sm font-medium">Your name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-primary/20 focus:ring-4" /></label>}
              <label className="block text-sm font-medium">Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-primary/20 focus:ring-4" /></label>
              <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-primary-foreground disabled:opacity-60">{busy && <Loader2 size={15} className="animate-spin" />} Email me a sign-in link</button>
            </form>
          )}
          {welcomeName && <div className="mt-8"><p className="font-serif text-2xl">Welcome, {welcomeName}.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Your Elysara space is ready whenever you are.</p><button type="button" onClick={() => navigate("/")} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">Continue home <ArrowUpRight size={15} /></button></div>}
          {!sent && !welcomeName && <p className="mt-7 text-center text-sm text-muted-foreground">{signup ? "Already a member?" : "New to Elysara?"} <Link className="font-semibold text-primary" to={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Create an account"}</Link></p>}
        </div>
      </div>
    </section>
  );
}
