export type CartItem = {
  id: string;
  productName: string;
  weight: "25g" | "50g";
  price: number;
  tone: "blue" | "coral";
  quantity: number;
};

const CART_KEY = "elysara-cart";
export const WHATSAPP_NUMBER = "918668525793";
let memoryCart: CartItem[] = [];

function isCartItem(item: Partial<CartItem>): item is CartItem {
  return typeof item.id === "string" && typeof item.productName === "string" && (item.weight === "25g" || item.weight === "50g") && typeof item.price === "number" && Number.isFinite(item.price) && (item.tone === "blue" || item.tone === "coral") && typeof item.quantity === "number" && Number.isInteger(item.quantity) && item.quantity > 0;
}

function saveCart(cart: CartItem[]) {
  memoryCart = cart;
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* Keep the in-memory cart available if storage is blocked. */ }
  window.dispatchEvent(new Event("elysara-cart-updated"));
}

export function getCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as Partial<CartItem>[];
    return Array.isArray(parsed) ? parsed.map((item) => ({ ...item, quantity: item.quantity ?? 1 })).filter(isCartItem) : memoryCart;
  } catch { return memoryCart; }
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) { existing.price = item.price; existing.quantity += item.quantity; }
  else cart.push(item);
  saveCart(cart);
}

export function updateCartQuantity(id: string, quantity: number) {
  saveCart(getCart().map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
}

export function removeFromCart(id: string) { updateCartQuantity(id, 0); }

export function createWhatsAppUrl(items: CartItem[]) {
  const order = items.map((item) => `${item.productName} — ${item.weight} × ${item.quantity} — ₹${item.price * item.quantity}`).join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Elysara, I’d like to order:\n${order}\n\nPlease share the next steps.`)}`;
}
