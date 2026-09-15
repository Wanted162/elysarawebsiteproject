import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FloralTea from "./pages/categories/FloralTea";
import Products from "./pages/Products";
import { BlueVitalityPage, CrimsonBloomPage } from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import { Layout } from "./components/layout/Layout";
import { PlaceholderPage } from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const placeholder = (title: string, label: string, description: string) => <PlaceholderPage title={title} label={label} description={description} />;

const App = () => <QueryClientProvider client={queryClient}><TooltipProvider><Toaster /><Sonner /><BrowserRouter><Routes><Route element={<Layout />}><Route path="/" element={<Index />} /><Route path="/categories/floral-tea" element={<FloralTea />} /><Route path="/products" element={<Products />} /><Route path="/cart" element={<Cart />} /><Route path="/login" element={<Auth />} /><Route path="/signup" element={<Auth />} /><Route path="/categories/herbal-tea" element={placeholder("Herbal tea is taking root.", "Coming soon", "We’re carefully growing this collection. Keep an eye out for grounding herbal blends made for everyday rituals.")} /><Route path="/categories/superfoods" element={placeholder("Nourishment is on its way.", "Coming soon", "Our superfood collection is still being gathered from the garden. Continue exploring Elysara while we prepare it for you.")} /><Route path="/products/blue-vitality" element={<BlueVitalityPage />} /><Route path="/products/crimson-bloom" element={<CrimsonBloomPage />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Route></Routes></BrowserRouter></TooltipProvider></QueryClientProvider>;

createRoot(document.getElementById("root")!).render(<App />);
