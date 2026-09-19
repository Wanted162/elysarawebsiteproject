import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Chatbot } from "@/components/Chatbot";
import { CartBar } from "@/components/CartBar";

export function Layout() { return <div className="min-h-screen"><Header /><main><Outlet /></main><Footer /><CartBar /><Chatbot /></div>; }
