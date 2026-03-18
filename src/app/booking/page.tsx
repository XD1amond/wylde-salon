import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
import { businessHours, salonInfo, services, stylists } from "@/lib/salon-data";

const STEPS = [
  { n: 1, label: "Choose Service" },
  { n: 2, label: "Date & Time" },
  { n: 3, label: "Your Details" },
  { n: 4, label: "Confirm" },
];

export default function BookingPage() {
  return (
    <main>

      {/* ── Dark hero header ─────────────────────────────── */}
      <section className="bg-[var(--accent-deep)] px-6 py-14 text-white text-center">
        <p className="animate-fade-down text-xs uppercase tracking-[0.3em] text-white/60">Online Booking</p>
        <h1 className="animate-fade-up display-font mt-3 text-5xl md:text-6xl">
          Reserve Your Appointment
        </h1>
        <p className="animate-fade-up delay-200 mt-3 text-sm text-white/70">
          Takes just 2 minutes · Appointments recommended · Walk-ins welcome
        </p>

        {/* Step progress indicator */}
        <div className="animate-fade-up delay-300 mx-auto mt-8 flex max-w-xl items-center justify-center gap-0">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-sm font-semibold text-white">
                  {step.n}
                </div>
                <span className="mt-1 hidden text-[10px] tracking-wide text-white/50 sm:block">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-2 h-px w-8 bg-white/25 sm:w-16" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking form ─────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <Suspense fallback={<div className="shimmer h-96 rounded-3xl" />}>
          <BookingForm services={services} stylists={stylists} />
        </Suspense>
      </section>

      {/* ── Contact & Hours at bottom ─────────────────── */}
      <section className="border-t border-[var(--line)] bg-[var(--background-soft)]">
        <div className="mx-auto max-w-5xl px-6 py-12 grid gap-8 md:grid-cols-3">

          {/* Location */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">Location</p>
            <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{salonInfo.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(salonInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs text-[var(--accent-deep)] animated-underline"
            >
              Get directions →
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">Contact</p>
            <a
              href={`tel:${salonInfo.phone.replace(/\D/g, "")}`}
              className="mt-2 block text-sm font-medium text-[var(--accent-deep)] animated-underline"
            >
              {salonInfo.phone}
            </a>
            <a
              href={`mailto:${salonInfo.email}`}
              className="mt-1 block text-sm text-[var(--text-muted)] animated-underline"
            >
              {salonInfo.email}
            </a>
          </div>

          {/* Hours */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">Hours</p>
            <ul className="mt-2 space-y-1">
              {businessHours.map((h) => (
                <li key={h} className="flex justify-between text-xs">
                  <span className="text-[var(--foreground)]">{h.split(/\s+/)[0]}</span>
                  <span className="text-[var(--text-muted)]">{h.replace(/^\S+\s+/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
