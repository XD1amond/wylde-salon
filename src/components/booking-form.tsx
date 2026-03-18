"use client";

import { timeslots } from "@/lib/booking-constants";
import { Service, Stylist } from "@/lib/salon-data";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type BookingFormProps = {
  services: Service[];
  stylists: Stylist[];
};

type FormState = {
  clientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceId: string;
  stylistId: string;
  notes: string;
  firstTime: boolean;
  textReminder: boolean;
};

const initialForm: FormState = {
  clientName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  serviceId: "",
  stylistId: "",
  notes: "",
  firstTime: false,
  textReminder: true,
};

const STEPS = [
  { number: 1, label: "Choose Service" },
  { number: 2, label: "Date & Time" },
  { number: 3, label: "Your Details" },
  { number: 4, label: "Confirm" },
];

const SERVICE_CATEGORIES = ["Cut", "Color", "Extensions", "Treatment", "Styling"] as const;

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "Not selected";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatTime(time: string) {
  if (!time) return "—";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function BookingForm({ services, stylists }: BookingFormProps) {
  const searchParams = useSearchParams();
  const preselectedStylistId = searchParams.get("stylistId") ?? "";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    ...initialForm,
    stylistId: preselectedStylistId,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Cut");

  // Calendar state
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  // Fetch taken slots when date/stylist changes
  useEffect(() => {
    if (!form.date || !form.stylistId) { setTakenSlots([]); return; }
    const fetchSlots = async () => {
      const q = new URLSearchParams({ date: form.date, stylistId: form.stylistId });
      const res = await fetch(`/api/bookings?${q}`);
      const payload = await res.json();
      setTakenSlots(Array.isArray(payload?.bookings) ? payload.bookings.map((b: {time: string}) => b.time) : []);
    };
    fetchSlots().catch(() => setTakenSlots([]));
  }, [form.date, form.stylistId]);

  const filteredServices = useMemo(
    () => services.filter((s) => s.category === activeCategory),
    [services, activeCategory],
  );

  const selectedService = useMemo(() => services.find((s) => s.id === form.serviceId), [services, form.serviceId]);
  const selectedStylist = useMemo(() => stylists.find((s) => s.id === form.stylistId), [stylists, form.stylistId]);

  const { firstDay, daysInMonth } = generateCalendar(calYear, calMonth);

  function selectDate(day: number) {
    const d = new Date(calYear, calMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (d < todayStart) return;
    const iso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setForm({ ...form, date: iso, time: "" });
  }

  function isDatePast(day: number) {
    const d = new Date(calYear, calMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayStart;
  }

  function isSelectedDay(day: number) {
    if (!form.date) return false;
    const [y, m, d] = form.date.split("-").map(Number);
    return y === calYear && m === calMonth + 1 && d === day;
  }

  function isToday(day: number) {
    return calYear === today.getFullYear() && calMonth === today.getMonth() && day === today.getDate();
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(calYear - 1); setCalMonth(11); }
    else setCalMonth(calMonth - 1);
  }

  function nextMonth() {
    if (calMonth === 11) { setCalYear(calYear + 1); setCalMonth(0); }
    else setCalMonth(calMonth + 1);
  }

  function validateStep(s: number): string[] {
    if (s === 1 && !form.serviceId) return ["Please select a service."];
    if (s === 2) {
      if (!form.date) return ["Please select a date."];
      if (!form.time) return ["Please select a time."];
    }
    if (s === 3) {
      const errs: string[] = [];
      if (!form.clientName.trim()) errs.push("Full name is required.");
      if (!form.email.includes("@")) errs.push("Valid email is required.");
      if (form.phone.replace(/\D/g, "").length < 10) errs.push("Valid phone number is required.");
      return errs;
    }
    return [];
  }

  function nextStep() {
    const errs = validateStep(step);
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setStep((s) => Math.min(s + 1, 4));
  }

  function prevStep() {
    setErrors([]);
    setStep((s) => Math.max(s - 1, 1));
  }

  async function submitBooking() {
    setPending(true);
    setErrors([]);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await res.json();
      if (!res.ok) {
        setErrors(Array.isArray(payload?.errors) ? payload.errors : ["Booking failed."]);
        return;
      }
      setBookingId(payload.booking.id);
    } catch {
      setErrors(["Network error. Please try again."]);
    } finally {
      setPending(false);
    }
  }

  // ── Confirmed screen ──────────────────────────────────────────
  if (bookingId) {
    return (
      <div className="animate-scale-in rounded-3xl bg-[var(--accent-deep)] p-8 text-center text-white">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
          ✓
        </div>
        <h2 className="display-font text-4xl">You&apos;re Booked!</h2>
        <p className="mt-2 text-white/80">We can&apos;t wait to see you.</p>
        <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white/90 space-y-1">
          {selectedService && <p><span className="font-semibold">Service:</span> {selectedService.name}</p>}
          {selectedStylist && <p><span className="font-semibold">Stylist:</span> {selectedStylist.name}</p>}
          <p><span className="font-semibold">Date:</span> {formatDate(form.date)}</p>
          <p><span className="font-semibold">Time:</span> {formatTime(form.time)}</p>
        </div>
        <p className="mt-4 text-xs text-white/60">Confirmation ID: <strong className="text-white">{bookingId}</strong></p>
        <p className="mt-2 text-xs text-white/60">{salonInfo.address}</p>
        <a href="/" className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[var(--accent-deep)]">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

      {/* ── Main form panel ─────────────────────────────── */}
      <div className="flex-1">

        {/* Step 1 — Choose Service */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="display-font text-2xl text-[var(--foreground)]">Choose a Service</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Select the category and service you'd like.</p>

            {/* Category filter */}
            <div className="mt-4 flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    activeCategory === cat
                      ? "bg-[var(--foreground)] text-white"
                      : "border border-[var(--line)] bg-white text-[var(--text-muted)] hover:border-[var(--accent)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Services grid */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setForm({ ...form, serviceId: service.id })}
                  className={`rounded-xl border p-4 text-left transition ${
                    form.serviceId === service.id
                      ? "border-[var(--accent-deep)] bg-[var(--background-soft)] ring-1 ring-[var(--accent-deep)]"
                      : "border-[var(--line)] bg-white hover:border-[var(--accent)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{service.name}</p>
                    {form.serviceId === service.id && (
                      <span className="flex-shrink-0 text-[var(--accent-deep)]">✓</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{service.description.substring(0, 80)}…</p>
                  <p className="mt-2 text-xs font-semibold text-[var(--accent-deep)]">
                    {service.priceNote === "Consultation" || service.priceNote === "Inquire"
                      ? service.priceNote
                      : service.price === 0
                      ? "Free"
                      : `${service.priceNote ? service.priceNote + " " : ""}$${service.price}`}
                    {service.durationMin > 0 && ` · ${service.durationMin} min`}
                  </p>
                </button>
              ))}
            </div>

            {/* Stylist preference */}
            <div className="mt-6">
              <p className="text-sm font-medium text-[var(--foreground)]">Preferred Stylist <span className="text-[var(--text-muted)]">(optional)</span></p>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, stylistId: "" })}
                  className={`rounded-xl border p-2.5 text-center text-xs transition ${
                    form.stylistId === "" ? "border-[var(--accent-deep)] bg-[var(--background-soft)]" : "border-[var(--line)] bg-white hover:border-[var(--accent)]"
                  }`}
                >
                  <span className="block text-lg">✦</span>
                  <span className="mt-0.5 block font-medium text-[var(--foreground)]">Any</span>
                  <span className="text-[var(--text-muted)]">Best availability</span>
                </button>
                {stylists.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setForm({ ...form, stylistId: s.id })}
                    className={`rounded-xl border p-2 text-center text-xs transition ${
                      form.stylistId === s.id ? "border-[var(--accent-deep)] bg-[var(--background-soft)]" : "border-[var(--line)] bg-white hover:border-[var(--accent)]"
                    }`}
                  >
                    <div className="mx-auto mb-1 h-10 w-10 overflow-hidden rounded-full bg-[var(--background-soft)]">
                      <img src={s.image} alt={s.name} className="h-full w-full object-cover object-top" loading="lazy" />
                    </div>
                    <span className="block font-medium text-[var(--foreground)] leading-tight">{s.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {errors.length > 0 && <ErrorBox errors={errors} />}
            <div className="mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="w-full rounded-xl bg-[var(--accent-deep)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)]"
              >
                Continue to Date &amp; Time →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Date & Time */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="display-font text-2xl text-[var(--foreground)]">Pick a Date &amp; Time</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">We're open Tue–Sat — select your preferred slot.</p>

            {/* Calendar */}
            <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonth} className="rounded-lg px-2 py-1 text-sm hover:bg-[var(--background-soft)]">‹</button>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {MONTH_NAMES[calMonth]} {calYear}
                </p>
                <button type="button" onClick={nextMonth} className="rounded-lg px-2 py-1 text-sm hover:bg-[var(--background-soft)]">›</button>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center">
                {DAY_NAMES.map((d) => (
                  <div key={d} className="py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{d}</div>
                ))}
                {/* Empty cells before first day */}
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {/* Day buttons */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isDatePast(day);
                  const selected = isSelectedDay(day);
                  const tod = isToday(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={past}
                      onClick={() => selectDate(day)}
                      className={`rounded-lg py-1.5 text-sm transition
                        ${past ? "cursor-not-allowed text-[var(--line)]" : "hover:bg-[var(--background-soft)]"}
                        ${selected ? "bg-[var(--accent-deep)] text-white hover:bg-[var(--accent-deep)]" : ""}
                        ${tod && !selected ? "font-bold text-[var(--accent-deep)]" : ""}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            {form.date && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-[var(--foreground)]">
                  Available Times — {formatDate(form.date)}
                </p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {timeslots.map((slot) => {
                    const taken = takenSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => setForm({ ...form, time: slot })}
                        className={`rounded-xl border py-2.5 text-xs font-medium transition
                          ${taken ? "cursor-not-allowed border-[var(--line)] bg-[var(--background-soft)] text-[var(--line)] line-through" : "border-[var(--line)] bg-white hover:border-[var(--accent)]"}
                          ${form.time === slot ? "border-[var(--accent-deep)] bg-[var(--accent-deep)] text-white hover:border-[var(--accent-deep)]" : ""}
                        `}
                      >
                        {formatTime(slot)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {errors.length > 0 && <ErrorBox errors={errors} />}
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={prevStep} className="flex-1 rounded-xl border border-[var(--line)] py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background-soft)]">
                ← Back
              </button>
              <button type="button" onClick={nextStep} className="flex-1 rounded-xl bg-[var(--accent-deep)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)]">
                Continue to Details →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Your Details */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="display-font text-2xl text-[var(--foreground)]">Your Details</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Tell us a little about yourself so we can prepare.</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-[var(--foreground)]">
                First &amp; Last Name
                <input
                  className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent-deep)] focus:ring-1 focus:ring-[var(--accent-deep)]"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-[var(--foreground)]">
                Phone Number
                <input
                  type="tel"
                  className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent-deep)] focus:ring-1 focus:ring-[var(--accent-deep)]"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(480) 555-1234"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-[var(--foreground)] sm:col-span-2">
                Email Address
                <input
                  type="email"
                  className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent-deep)] focus:ring-1 focus:ring-[var(--accent-deep)]"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@email.com"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-[var(--foreground)] sm:col-span-2">
                Special Requests <span className="font-normal text-[var(--text-muted)]">(optional)</span>
                <textarea
                  className="min-h-20 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent-deep)] focus:ring-1 focus:ring-[var(--accent-deep)]"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Hair goals, inspiration, or anything we should know."
                />
              </label>
            </div>

            {/* Checkboxes */}
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-muted)]">
                <input
                  type="checkbox"
                  checked={form.firstTime}
                  onChange={(e) => setForm({ ...form, firstTime: e.target.checked })}
                  className="h-4 w-4 accent-[var(--accent-deep)]"
                />
                I'm a first-time client at Wylde Salon
              </label>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-muted)]">
                <input
                  type="checkbox"
                  checked={form.textReminder}
                  onChange={(e) => setForm({ ...form, textReminder: e.target.checked })}
                  className="h-4 w-4 accent-[var(--accent-deep)]"
                />
                Send me an appointment reminder via text
              </label>
            </div>

            {errors.length > 0 && <ErrorBox errors={errors} />}
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={prevStep} className="flex-1 rounded-xl border border-[var(--line)] py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background-soft)]">
                ← Back
              </button>
              <button type="button" onClick={nextStep} className="flex-1 rounded-xl bg-[var(--accent-deep)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)]">
                Review &amp; Confirm →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Confirm */}
        {step === 4 && (
          <div className="animate-fade-up">
            <h2 className="display-font text-2xl text-[var(--foreground)]">Review &amp; Confirm</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Everything look right? Let's lock it in.</p>

            <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white divide-y divide-[var(--line)]">
              <Row label="Service" value={selectedService?.name ?? "—"} />
              <Row label="Stylist" value={selectedStylist?.name ?? "Any Available"} />
              <Row label="Date" value={formatDate(form.date)} />
              <Row label="Time" value={formatTime(form.time)} />
              {selectedService && selectedService.price > 0 && (
                <Row label="Est. Price" value={`$${selectedService.price}${selectedService.priceNote ? ` (${selectedService.priceNote})` : ""}`} />
              )}
              <Row label="Name" value={form.clientName || "—"} />
              <Row label="Phone" value={form.phone || "—"} />
              <Row label="Email" value={form.email || "—"} />
              {form.notes && <Row label="Notes" value={form.notes} />}
            </div>

            {/* Cancellation policy */}
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-semibold">Cancellation Policy</p>
              <p className="mt-1 text-xs leading-5">Please give us at least 24 hours notice if you need to cancel or reschedule. Call us at {salonInfo.phone} or reply to your confirmation text.</p>
            </div>

            {errors.length > 0 && <ErrorBox errors={errors} />}
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={prevStep} className="flex-1 rounded-xl border border-[var(--line)] py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background-soft)]">
                ← Back
              </button>
              <button
                type="button"
                onClick={submitBooking}
                disabled={pending}
                className="flex-1 rounded-xl bg-[var(--accent-deep)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Booking…" : "Confirm Appointment ✓"}
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--text-muted)]">No credit card required. We'll send a confirmation after booking.</p>
          </div>
        )}
      </div>

      {/* ── Sidebar — "Your Booking" summary ──────────────── */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="sticky top-24 rounded-2xl border border-[var(--line)] bg-white p-5">
          <h3 className="display-font text-xl text-[var(--foreground)]">Your Booking</h3>
          <div className="mt-4 space-y-3 divide-y divide-[var(--line)]">
            <SidebarRow label="Service" value={selectedService?.name ?? "Not selected"} />
            <SidebarRow label="Stylist" value={selectedStylist?.name ?? "Any Available"} />
            <SidebarRow label="Date" value={form.date ? formatDate(form.date) : "Not selected"} />
            <SidebarRow label="Time" value={form.time ? formatTime(form.time) : "—"} />
            {selectedService && selectedService.price > 0 && (
              <SidebarRow label="Est. Total" value={`$${selectedService.price}${selectedService.priceNote ? "+" : ""}`} note="Final pricing at salon" />
            )}
          </div>
          <p className="mt-4 text-center text-[10px] text-[var(--text-muted)]">No credit card required.</p>
          <div className="mt-4 border-t border-[var(--line)] pt-4">
            <p className="text-xs font-semibold text-[var(--foreground)]">Salon Info</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{salonInfo.address}</p>
            <a href={`tel:${salonInfo.phone.replace(/\D/g,"")}`} className="mt-0.5 block text-xs font-medium text-[var(--accent-deep)]">
              {salonInfo.phone}
            </a>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Tue–Fri: 9am – 7pm<br/>Sat: 8am – 5pm</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────
import { salonInfo } from "@/lib/salon-data";

function ErrorBox({ errors }: { errors: string[] }) {
  return (
    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {errors.map((e) => <p key={e}>{e}</p>)}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3 text-sm">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="text-right font-medium text-[var(--foreground)]">{value}</span>
    </div>
  );
}

function SidebarRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="pt-3 first:pt-0">
      <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">{value}</p>
      {note && <p className="text-[10px] text-[var(--text-muted)]">{note}</p>}
    </div>
  );
}
