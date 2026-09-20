import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Chatbot } from "@/components/Chatbot";
import { CartBar } from "@/components/CartBar";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  return <div className="min-h-screen"><ScrollToTop /><Header /><main><Outlet /></main><Footer /><CartBar /><Chatbot /></div>;
}
