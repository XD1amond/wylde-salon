import { businessHours, salonInfo } from "@/lib/salon-data";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-16 pt-10">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="animate-fade-up glass-card rounded-3xl p-6 md:p-10">
        <h1 className="display-font text-5xl text-[var(--accent-deep)]">Contact</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          We'd love to hear from you. Stop by, call, or send us a message.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {/* ── Info card ───────────────────────────────────────────── */}
        <ScrollReveal wrapperClass="stagger-1">
          <div className="card-hover glass-card h-full rounded-3xl p-6">
            <h2 className="display-font text-3xl text-[var(--foreground)]">{salonInfo.name}</h2>
            <p className="mt-1 text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {salonInfo.city}, {salonInfo.state}
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Address
                </p>
                <p className="mt-1 text-[var(--foreground)]">{salonInfo.address}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Phone
                </p>
                <a
                  href={`tel:${salonInfo.phone.replace(/\D/g, "")}`}
                  className="animated-underline mt-1 inline-block font-medium text-[var(--accent-deep)]"
                >
                  {salonInfo.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Email
                </p>
                <a
                  href={`mailto:${salonInfo.email}`}
                  className="animated-underline mt-1 inline-block font-medium text-[var(--accent-deep)]"
                >
                  {salonInfo.email}
                </a>
              </div>
            </div>

            <a
              href="/booking"
              className="mt-8 block rounded-xl bg-[var(--accent-deep)] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[var(--accent)]"
            >
              Book an Appointment
            </a>
          </div>
        </ScrollReveal>

        {/* ── Hours card ──────────────────────────────────────────── */}
        <ScrollReveal wrapperClass="stagger-2">
          <div className="card-hover glass-card h-full rounded-3xl p-6">
            <h2 className="display-font text-3xl text-[var(--foreground)]">Hours</h2>
            <ul className="mt-4 space-y-0.5 text-sm">
              {businessHours.map((hour) => (
                <li
                  key={hour}
                  className="flex justify-between border-b border-[var(--line)] py-3 last:border-none"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {hour.split("  ")[0].split(" ")[0]}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {hour.replace(/^\S+\s+/, "")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
