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

export function getCart(): CartItem[] {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as Partial<CartItem>[];
    return items.map((item) => ({ ...item, quantity: item.quantity ?? 1 })) as CartItem[];
  } catch {
    return [];
  }
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) { existing.price = item.price; existing.quantity += item.quantity; }
  else cart.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("elysara-cart-updated"));
}

export function updateCartQuantity(id: string, quantity: number) {
  const cart = getCart().map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("elysara-cart-updated"));
}

export function removeFromCart(id: string) {
  updateCartQuantity(id, 0);
}

export function createWhatsAppUrl(items: CartItem[]) {
  const order = items.map((item) => `${item.productName} — ${item.weight} × ${item.quantity} — ₹${item.price * item.quantity}`).join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Elysara, I’d like to order:\n${order}\n\nPlease share the next steps.`)}`;
}
