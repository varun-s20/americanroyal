/** Cross-component signal to open the floating chat assistant. */
export const OPEN_CHAT_EVENT = "arm:open-chat";

export function openChat() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}

/** WhatsApp hand-off used across the connect surfaces. */
export const WHATSAPP_URL =
  "https://wa.me/15551234567?text=Hi%20American%20Royal%20Mortgage%2C%20I%27d%20like%20to%20speak%20with%20a%20specialist.";
