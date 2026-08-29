/** ناقل بسيط لفتح مساعد المدار من أي مكان في الموقع. */
export const ASSISTANT_OPEN_EVENT = "almadar:open-assistant";

export function openAssistant() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ASSISTANT_OPEN_EVENT));
}
