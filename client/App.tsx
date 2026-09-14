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
import { Layout } from "./components/layout/Layout";
import { PlaceholderPage } from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const placeholder = (title: string, label: string, description: string) => <PlaceholderPage title={title} label={label} description={description} />;

const App = () => <QueryClientProvider client={queryClient}><TooltipProvider><Toaster /><Sonner /><BrowserRouter><Routes><Route element={<Layout />}><Route path="/" element={<Index />} /><Route path="/categories/floral-tea" element={<FloralTea />} /><Route path="/products" element={<Products />} /><Route path="/categories/herbal-tea" element={placeholder("Herbal tea is taking root.", "Coming soon", "We’re carefully growing this collection. Keep an eye out for grounding herbal blends made for everyday rituals.")} /><Route path="/categories/superfoods" element={placeholder("Nourishment is on its way.", "Coming soon", "Our superfood collection is still being gathered from the garden. Continue exploring Elysara while we prepare it for you.")} /><Route path="/products/blue-vitality" element={placeholder("Blue Vitality.", "Floral tea · 01", "The full story of this bright, uplifting blend is being steeped. Continue prompting us to fill in the product details.")} /><Route path="/products/crimson-bloom" element={placeholder("Crimson Bloom.", "Floral tea · 02", "The full story of this soulful floral infusion is being steeped. Continue prompting us to fill in the product details.")} /><Route path="/about" element={placeholder("A slower way to feel good.", "Our story", "Elysara is a growing story about botanicals, intention and the everyday rituals that bring us back to ourselves.")} /><Route path="/contact" element={placeholder("We’d love to hear from you.", "Contact", "Our garden gate is open. Continue prompting us to add contact details and a dedicated contact experience.")} /><Route path="*" element={<NotFound />} /></Route></Routes></BrowserRouter></TooltipProvider></QueryClientProvider>;

createRoot(document.getElementById("root")!).render(<App />);
