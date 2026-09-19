import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Globe2, Leaf, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AuthProps = { mode: "login" | "signup" };
type Step = "identity" | "otp" | "profile" | "done";
type Method = "email" | "phone";
type LocalAccount = { identity: string; name: string };

const DEMO_OTP = "123456";
const ACCOUNT_KEY = "elysara-account";

function readLocalAccount(): LocalAccount | null {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_KEY) ?? "null") as LocalAccount | null;
  } catch {
    return null;
  }
}

export default function Auth({ mode }: AuthProps) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const [identity, setIdentity] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [method, setMethod] = useState<Method>("email");
  const [step, setStep] = useState<Step>("identity");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      const profileName = user?.user_metadata?.full_name;
      if (user && profileName) {
        setWelcomeName(profileName);
        setStep("done");
      }
    });
  }, []);

  const requestOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = identity.trim();
    if (!value) {
      setError(`Enter your ${method === "email" ? "email address" : "phone number"}.`);
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");

    if (!supabase) {
      const existing = readLocalAccount();
      if (!signup && existing?.identity !== value.toLowerCase()) {
        setError("We couldn’t find an account with that contact. Please sign up first.");
      } else {
        setNotice(`Demo mode: use ${DEMO_OTP} as the verification code.`);
        setStep("otp");
      }
      setBusy(false);
      return;
    }

    const result = method === "email"
      ? await supabase.auth.signInWithOtp({ email: value, options: { shouldCreateUser: signup } })
      : await supabase.auth.signInWithOtp({ phone: value, options: { shouldCreateUser: signup } });
    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setNotice(`A verification code was sent to ${value}.`);
    setStep("otp");
  };

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Enter the six-digit verification code.");
      return;
    }
    setBusy(true);
    setError("");

    if (!supabase) {
      if (otp.trim() !== DEMO_OTP) {
        setBusy(false);
        setError(`That code is not correct. Use ${DEMO_OTP} in preview mode.`);
        return;
      }
      setBusy(false);
      if (signup) setStep("profile");
      else {
        const account = readLocalAccount();
        setWelcomeName(account?.name ?? "");
        localStorage.setItem("elysara-member", "true");
        setStep("done");
      }
      return;
    }

    const result = method === "email"
      ? await supabase.auth.verifyOtp({ email: identity.trim(), token: otp.trim(), type: "email" })
      : await supabase.auth.verifyOtp({ phone: identity.trim(), token: otp.trim(), type: "sms" });
    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (signup) setStep("profile");
    else {
      setWelcomeName(result.data.user?.user_metadata?.full_name ?? "");
      setStep("done");
    }
  };

  const createProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Tell us your name to finish creating your account.");
      return;
    }
    setBusy(true);
    setError("");

    if (!supabase) {
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ identity: identity.trim().toLowerCase(), name: trimmedName }));
      localStorage.setItem("elysara-member", "true");
      setWelcomeName(trimmedName);
      setBusy(false);
      setStep("done");
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setBusy(false);
      setError("Your session expired. Please request a new code.");
      setStep("identity");
      return;
    }
    const update = await supabase.auth.updateUser({ data: { full_name: trimmedName } });
    const profile = await supabase.from("profiles").upsert({ id: user.id, full_name: trimmedName, phone: user.phone ?? null });
    setBusy(false);
    if (update.error || profile.error) {
      setError(update.error?.message ?? profile.error?.message ?? "We couldn’t save your profile.");
      return;
    }
    setWelcomeName(trimmedName);
    setStep("done");
  };

  const providerLogin = async (provider: "google" | "apple") => {
    setError("");
    if (!supabase) {
      setError(`${provider === "google" ? "Google" : "Apple"} login needs the free Supabase connection configured.`);
      return;
    }
    const { error: providerError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + (signup ? "/signup" : "/login") },
    });
    if (providerError) setError(providerError.message);
  };

  const reset = () => {
    setStep("identity");
    setOtp("");
    setError("");
    setNotice("");
  };

  return (
    <section className="photo-paper-warm flex min-h-[72vh] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-foreground/55 hover:text-primary"><ArrowLeft size={15} /> Back home</Link>
        <div className="mt-10 rounded-[1.5rem] border border-border bg-background/85 p-8 shadow-sm backdrop-blur-sm sm:p-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-background"><Leaf size={18} /></span>
          <p className="eyebrow mt-8 text-primary">Elysara circle</p>
          <h1 className="mt-3 text-4xl">{signup ? "Create your account." : "Welcome back."}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{signup ? "Verify your contact, then we’ll save your name for a personal welcome next time." : "Verify your contact to return to your saved Elysara space."}</p>
          {!isSupabaseConfigured && <p className="mt-5 rounded-xl bg-secondary/10 px-4 py-3 text-xs leading-5 text-secondary-foreground">Preview mode is active. Connect the free Supabase keys to enable real email, SMS, Google, and Apple authentication.</p>}
          {error && <p className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
          {step === "done" ? (
            <div className="mt-8">
              <p className="font-serif text-2xl">Welcome{welcomeName ? `, ${welcomeName}` : " back"}.</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Your Elysara space is ready whenever you are.</p>
              <button type="button" onClick={() => navigate("/")} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">Continue home <ArrowUpRight size={15} /></button>
            </div>
          ) : (
            <>
              {step === "identity" && <>
                <div className="mt-8 grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
                  {(["email", "phone"] as Method[]).map((item) => <button key={item} type="button" onClick={() => { setMethod(item); setError(""); }} className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${method === item ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}>{item}</button>)}
                </div>
                <form onSubmit={requestOtp} className="mt-6 space-y-4">
                  <label className="block text-sm font-medium">{method === "email" ? "Email address" : "Phone number"}<input value={identity} onChange={(event) => setIdentity(event.target.value)} type={method === "email" ? "email" : "tel"} placeholder={method === "email" ? "you@example.com" : "+91 98765 43210"} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-primary/20 focus:ring-4" /></label>
                  <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-primary-foreground disabled:opacity-60">{busy && <Loader2 size={15} className="animate-spin" />} Send OTP</button>
                </form>
                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" /></div>
                <div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => void providerLogin("google")} className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-xs font-bold"><Globe2 size={15} /> Google</button><button type="button" onClick={() => void providerLogin("apple")} className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-xs font-bold"><span className="font-serif text-base">A</span> Apple</button></div>
                <p className="mt-7 text-center text-sm text-muted-foreground">{signup ? "Already a member?" : "New to Elysara?"} <Link className="font-semibold text-primary" to={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Create an account"}</Link></p>
              </>}
              {step === "otp" && <form onSubmit={verifyOtp} className="mt-8 space-y-4"><p className="text-sm leading-6 text-muted-foreground">{notice}</p><label className="block text-sm font-medium">Six-digit OTP<input autoFocus value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" maxLength={6} placeholder="000000" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-lg tracking-[0.35em] outline-none ring-primary/20 focus:ring-4" /></label><button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-primary-foreground disabled:opacity-60">{busy && <Loader2 size={15} className="animate-spin" />} Verify OTP</button><button type="button" onClick={reset} className="w-full text-xs font-bold uppercase tracking-[0.13em] text-primary">Use a different contact</button></form>}
              {step === "profile" && <form onSubmit={createProfile} className="mt-8 space-y-4"><p className="text-sm leading-6 text-muted-foreground">Your contact is verified. What should we call you?</p><label className="block text-sm font-medium">Your name<input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-primary/20 focus:ring-4" /></label><button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-primary-foreground disabled:opacity-60">{busy && <Loader2 size={15} className="animate-spin" />} Save my profile</button></form>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
