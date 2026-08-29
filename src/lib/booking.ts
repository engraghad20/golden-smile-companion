import { timeSlots } from "@/data/clinic";

export type BookingRequest = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  doctor?: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: "submitted";
  source: "form" | "assistant";
};

export type BookingInput = Omit<BookingRequest, "id" | "createdAt" | "status">;

export type ValidationResult = { ok: true } | { ok: false; errors: Record<string, string> };

const STORAGE_KEY = "almadar.bookings";

const SAUDI_PHONE = /^(?:\+9665|9665|05|5)\d{8}$/;

export function normalizePhone(value: string): string {
  return value.replace(/[\s\-()]/g, "").replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function validateBooking(input: Partial<BookingInput>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.fullName || input.fullName.trim().length < 3) {
    errors["fullName"] = "الرجاء إدخال الاسم الكامل.";
  }
  const phone = normalizePhone(input.phone ?? "");
  if (!phone) {
    errors["phone"] = "الرجاء إدخال رقم الجوال.";
  } else if (!SAUDI_PHONE.test(phone)) {
    errors["phone"] = "رقم الجوال غير صحيح. مثال: 05XXXXXXXX";
  }
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) {
    errors["email"] = "البريد الإلكتروني غير صحيح.";
  }
  if (!input.service) errors["service"] = "الرجاء اختيار الخدمة.";
  if (!input.date) errors["date"] = "الرجاء اختيار التاريخ.";
  if (!input.time) errors["time"] = "الرجاء اختيار الوقت.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true };
}

/** الجمعة مغلق — لا تتوفر أوقات. */
export function getAvailableTimes(date: string): string[] {
  if (!date) return timeSlots;
  const day = new Date(`${date}T00:00:00`).getDay();
  if (Number.isNaN(day)) return timeSlots;
  if (day === 5) return [];
  // توزيع تجريبي بسيط: بعض الأوقات محجوزة في نموذج العرض
  const seed = date.split("-").reduce((acc, part) => acc + Number(part), 0);
  return timeSlots.filter((_, index) => (index + seed) % 7 !== 0);
}

export function createBooking(input: BookingInput): BookingRequest {
  return {
    ...input,
    phone: normalizePhone(input.phone),
    id: `BK-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "submitted",
  };
}

function readAll(): BookingRequest[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as BookingRequest[];
  } catch {
    return [];
  }
}

/**
 * لا يوجد نظام حجز حقيقي متصل: يتم حفظ الطلب محليًا كنموذج تجريبي.
 * الطلب "مُرسل" وليس "مؤكدًا".
 */
export async function submitBooking(input: BookingInput): Promise<BookingRequest> {
  const validation = validateBooking(input);
  if (!validation.ok) {
    throw new Error("بيانات الحجز غير مكتملة.");
  }
  const booking = createBooking(input);
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (typeof window === "undefined") return booking;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([booking, ...readAll()].slice(0, 50)));
  } catch {
    throw new Error("تعذر حفظ الطلب على هذا الجهاز.");
  }
  return booking;
}

export function listBookings(): BookingRequest[] {
  return readAll();
}
