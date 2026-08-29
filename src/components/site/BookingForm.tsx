import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

import { doctors, services } from "@/data/clinic";
import {
  getAvailableTimes,
  submitBooking,
  validateBooking,
  type BookingInput,
  type BookingRequest,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  optional?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="mr-1 text-xs text-muted-foreground">(اختياري)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function BookingForm({ defaultDoctor, defaultService }: { defaultDoctor?: string; defaultService?: string }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState<BookingInput>({
    fullName: "",
    phone: "",
    email: "",
    service: defaultService ?? "",
    doctor: defaultDoctor ?? "",
    date: "",
    time: "",
    notes: "",
    source: "form",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingRequest | null>(null);

  const availableTimes = useMemo(() => getAvailableTimes(form.date), [form.date]);

  const update = (key: keyof BookingInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value, ...(key === "date" ? { time: "" } : {}) }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    const validation = validateBooking(form);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const booking = await submitBooking(form);
      setResult(booking);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setFormError(
        error instanceof Error && error.message
          ? "تعذّر إرسال الطلب حاليًا. حاول مرة أخرى أو تواصل مع فريق العيادة مباشرة."
          : "حدث خطأ غير متوقع.",
      );
    }
  };

  if (result) {
    return (
      <div className="msg-in border border-border bg-card p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto size-12 text-gold" strokeWidth={1.2} aria-hidden="true" />
        <h2 className="mt-6 text-2xl font-bold text-foreground">تم استلام طلبك بنجاح 🤍</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-muted-foreground">
          شكرًا لثقتك بالمدار الذهبي. سيتواصل معك فريقنا لتأكيد الموعد.
        </p>
        <dl className="mx-auto mt-8 max-w-sm space-y-3 border-t border-border pt-6 text-right text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">رقم الطلب</dt>
            <dd dir="ltr" className="font-semibold text-foreground">
              {result.id}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">الخدمة</dt>
            <dd className="text-foreground">{result.service}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">التاريخ والوقت المفضل</dt>
            <dd className="text-foreground">
              {result.date} — {result.time}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">الحالة</dt>
            <dd className="font-semibold text-gold">طلب حجز تم إرساله</dd>
          </div>
        </dl>
        <p className="mt-6 text-xs leading-6 text-muted-foreground">
          هذا طلب حجز وليس تأكيدًا نهائيًا للموعد. البيانات محفوظة على جهازك ضمن النموذج التجريبي.
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-8 border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-border bg-card p-6 sm:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="الاسم الكامل" error={errors["fullName"]}>
          <input
            id="fullName"
            name="fullName"
            className={fieldClass}
            value={form.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={Boolean(errors["fullName"])}
            aria-describedby={errors["fullName"] ? "fullName-error" : undefined}
            placeholder="مثال: سارة العتيبي"
            autoComplete="name"
          />
        </Field>

        <Field id="phone" label="رقم الجوال" error={errors["phone"]}>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            className={cn(fieldClass, "text-right")}
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors["phone"])}
            aria-describedby={errors["phone"] ? "phone-error" : undefined}
            placeholder="05XXXXXXXX"
            autoComplete="tel"
          />
        </Field>

        <Field id="email" label="البريد الإلكتروني" optional error={errors["email"]}>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            className={cn(fieldClass, "text-right")}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
          />
        </Field>

        <Field id="service" label="الخدمة" error={errors["service"]}>
          <select
            id="service"
            name="service"
            className={fieldClass}
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={Boolean(errors["service"])}
            aria-describedby={errors["service"] ? "service-error" : undefined}
          >
            <option value="">اختر الخدمة</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="استشارة عامة">استشارة عامة</option>
          </select>
        </Field>

        <Field id="doctor" label="الطبيب" optional>
          <select
            id="doctor"
            name="doctor"
            className={fieldClass}
            value={form.doctor}
            onChange={(event) => update("doctor", event.target.value)}
          >
            <option value="">بدون تفضيل</option>
            {doctors.map((doctor) => (
              <option key={doctor.slug} value={doctor.name}>
                {doctor.name} — {doctor.specialty}
              </option>
            ))}
          </select>
        </Field>

        <Field id="date" label="التاريخ" error={errors["date"]}>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            className={fieldClass}
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            aria-invalid={Boolean(errors["date"])}
            aria-describedby={errors["date"] ? "date-error" : undefined}
          />
        </Field>
      </div>

      <fieldset className="mt-8">
        <legend className="mb-3 text-sm font-medium text-foreground">الوقت</legend>
        {form.date && availableTimes.length === 0 ? (
          <div className="border border-dashed border-border bg-secondary/60 p-6 text-center">
            <p className="text-sm font-semibold text-foreground">
              لم نجد مواعيد متاحة بهذا الوقت.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              جرّب اختيار وقت آخر وسنساعدك في إيجاد الأنسب.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableTimes.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => update("time", slot)}
                aria-pressed={form.time === slot}
                className={cn(
                  "min-h-11 rounded-md border px-4 text-sm transition-colors",
                  form.time === slot
                    ? "border-gold bg-gold/10 font-semibold text-foreground"
                    : "border-border text-muted-foreground hover:border-gold hover:text-foreground",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
        {errors["time"] ? (
          <p role="alert" className="mt-2 text-xs text-destructive">
            {errors["time"]}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-8">
        <Field id="notes" label="ملاحظات إضافية" optional>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className={cn(fieldClass, "resize-none leading-8")}
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            placeholder="أي تفاصيل تحب أن يعرفها الفريق قبل الموعد."
          />
        </Field>
      </div>

      {formError ? (
        <p
          role="alert"
          className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-ink-soft disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <CalendarCheck className="size-4" aria-hidden="true" />
        )}
        {status === "loading" ? "جاري الإرسال…" : "إرسال طلب الحجز"}
      </button>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">
        بإرسال الطلب، يتواصل معك فريق العيادة لتأكيد الموعد. لا يُعد الطلب موعدًا مؤكدًا.
      </p>
    </form>
  );
}
