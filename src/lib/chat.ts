/** Cross-component signal to open the floating chat assistant. */
export const OPEN_CHAT_EVENT = "arm:open-chat";

export function openChat() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}

/** WhatsApp hand-off used across the connect surfaces. Dead link for now. */
export const WHATSAPP_URL = "#";
