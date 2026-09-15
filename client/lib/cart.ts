export type CartItem = {
  id: string;
  productName: string;
  weight: "25g" | "50g";
  price: number;
  tone: "blue" | "coral";
};

const CART_KEY = "elysara-cart";
export const WHATSAPP_NUMBER = "918668525793";

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) existing.price = item.price;
  else cart.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("elysara-cart-updated"));
}

export function removeFromCart(id: string) {
  localStorage.setItem(CART_KEY, JSON.stringify(getCart().filter((item) => item.id !== id)));
  window.dispatchEvent(new Event("elysara-cart-updated"));
}

export function createWhatsAppUrl(items: CartItem[]) {
  const order = items.map((item) => `${item.productName} — ${item.weight} — ₹${item.price}`).join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Elysara, I’d like to order:\n${order}\n\nPlease share the next steps.`)}`;
}
