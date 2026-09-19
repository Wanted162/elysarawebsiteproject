import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Chatbot } from "@/components/Chatbot";

export function Layout() { return <div className="min-h-screen"><Header /><main><Outlet /></main><Footer /><Chatbot /></div>; }
