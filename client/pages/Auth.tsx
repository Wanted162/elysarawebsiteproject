import { ArrowLeft, ArrowUpRight, Globe2, Leaf, Mail, Smartphone } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type AuthProps = { mode: "login" | "signup" };
type Account = { identity: string; name: string };
type Step = "identity" | "otp" | "profile" | "done";
const DEMO_OTP = "123456";

export default function Auth({ mode }: AuthProps) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const [identity, setIdentity] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [step, setStep] = useState<Step>("identity");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const account = (): Account | null => { try { return JSON.parse(localStorage.getItem("elysara-account") ?? "null") as Account | null; } catch { return null; } };
  const requestOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = identity.trim();
    if (!value) return setError(`Enter your ${method === "email" ? "email address" : "phone number"}.`);
    if (!signup && account()?.identity !== value.toLowerCase()) return setError("We couldn’t find an account with that contact. Please sign up first.");
    setError(""); setNotice(`A verification code was sent to ${value}.`); setStep("otp");
  };
  const verifyOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.trim() !== DEMO_OTP) return setError("That code is not correct. Try the six-digit code shown below.");
    setError("");
    if (signup) setStep("profile");
    else { localStorage.setItem("elysara-member", "true"); setStep("done"); }
  };
  const createProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return setError("Tell us your name to finish creating your account.");
    localStorage.setItem("elysara-account", JSON.stringify({ identity: identity.trim().toLowerCase(), name: name.trim() }));
    localStorage.setItem("elysara-member", "true"); setError(""); setStep("done");
  };
  const reset = () => { setStep("identity"); setOtp(""); setError(""); setNotice(""); };
  const unavailableProvider = (provider: string) => setError(`${provider} sign-in will be enabled when the Supabase connection is added.`);
  return <section className="photo-paper-warm flex min-h-[72vh] items-center justify-center px-6 py-24"><div className="w-full max-w-md"><Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-foreground/55 hover:text-primary"><ArrowLeft size={15} /> Back home</Link><div className="mt-10 rounded-[1.5rem] border border-border bg-background/85 p-8 shadow-sm backdrop-blur-sm sm:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-background"><Leaf size={18} /></span><p className="eyebrow mt-8 text-primary">Elysara circle</p><h1 className="mt-3 text-4xl">{signup ? "Create your account." : "Welcome back."}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">{signup ? "Verify your contact, then we’ll save your name for a personal welcome next time." : "Verify your contact to return to your saved Elysara space."}</p>{step === "done" ? <div className="mt-8"><p className="font-serif text-2xl">Welcome{account()?.name ? `, ${account()?.name}` : " back"}.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Your Elysara space is ready whenever you are.</p><button type="button" onClick={() => navigate("/")} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">Continue home <ArrowUpRight size={15} /></button></div> : <>{step === "identity" && <><div className="mt-8 grid grid-cols-2 gap-2 rounded-full bg-muted p-1"><button type="button" onClick={() => setMethod("email")} className={`flex items-center justify-center gap-2 rounded-full py-2 text-xs font-bold ${method === "email" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}><Mail size={14} /> Email</button><button type="button" onClick={() => setMethod("phone")} className={`flex items-center justify-center gap-2 rounded-full py-2 text-xs font-bold ${method === "phone" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}><Smartphone size={14} /> Phone</button></div><form onSubmit={requestOtp} className="mt-6 space-y-5"><label className="block"><span className="eyebrow text-muted-foreground">{method === "email" ? "Email address" : "Phone number"}</span><input required value={identity} onChange={(event) => setIdentity(event.target.value)} type={method === "email" ? "email" : "tel"} className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary" placeholder={method === "email" ? "you@example.com" : "+91 00000 00000"} /></label><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">Send OTP <ArrowUpRight size={15} /></button></form><div className="my-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-muted-foreground"><span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" /></div><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => unavailableProvider("Google")} className="flex items-center justify-center gap-2 rounded-full border border-border px-3 py-3 text-xs font-semibold hover:border-primary hover:text-primary"><Globe2 size={15} /> Google</button><button type="button" onClick={() => unavailableProvider("Apple")} className="flex items-center justify-center gap-2 rounded-full border border-border px-3 py-3 text-xs font-semibold hover:border-primary hover:text-primary"><span className="font-serif text-base">A</span> Apple</button></div></>}{step === "otp" && <form onSubmit={verifyOtp} className="mt-8 space-y-5"><p className="text-sm leading-6 text-muted-foreground">{notice}</p><label className="block"><span className="eyebrow text-muted-foreground">Verification code</span><input required value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" maxLength={6} className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-center text-2xl tracking-[0.45em] outline-none focus:border-primary" placeholder="000000" /></label><p className="rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">Demo OTP for this preview: <strong className="text-primary">{DEMO_OTP}</strong></p><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">Verify OTP <ArrowUpRight size={15} /></button><button type="button" onClick={reset} className="w-full text-xs font-semibold text-muted-foreground hover:text-primary">Use a different contact</button></form>}{step === "profile" && <form onSubmit={createProfile} className="mt-8 space-y-5"><p className="text-sm leading-6 text-muted-foreground">Verified. What should we call you when you return?</p><label className="block"><span className="eyebrow text-muted-foreground">Your name</span><input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary" placeholder="Your name" /></label><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">Finish signup <ArrowUpRight size={15} /></button></form>}{error && <p role="alert" className="mt-5 text-sm text-destructive">{error}</p>}</>}<p className="mt-8 text-center text-sm text-muted-foreground">{signup ? "Already a member?" : "New to Elysara?"} <Link to={signup ? "/login" : "/signup"} className="font-semibold text-primary hover:underline">{signup ? "Log in" : "Sign up"}</Link></p></div></div></section>;
}
