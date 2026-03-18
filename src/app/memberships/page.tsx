import { memberships } from "@/lib/salon-data";
import { ScrollReveal } from "@/components/scroll-reveal";

const TIER_ACCENTS = [
  { border: "border-[var(--line)]",           badge: "bg-[var(--background-soft)] text-[var(--text-muted)]",   label: "" },
  { border: "border-[var(--accent)]",         badge: "bg-[var(--accent)] text-white",                          label: "Most Popular" },
  { border: "border-[var(--accent-deep)]",    badge: "bg-[var(--accent-deep)] text-white",                     label: "Best Value" },
];

export default function MembershipsPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── Dark hero header ─────────────────────────────────── */}
      <section className="bg-[var(--accent-deep)] px-6 py-14 text-center text-white">
        <p className="animate-fade-down text-xs uppercase tracking-[0.3em] text-white/60">Monthly Plans</p>
        <h1 className="animate-fade-up display-font mt-3 text-5xl md:text-6xl">Memberships</h1>
        <p className="animate-fade-up delay-200 mt-3 text-sm text-white/70 max-w-xl mx-auto">
          Lock in your salon ritual with a monthly blowout membership — because you deserve consistent, effortless hair.
        </p>
      </section>

      {/* ── Membership cards ────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10">
      <div className="grid gap-6 md:grid-cols-3">
        {memberships.map((membership, i) => {
          const accent = TIER_ACCENTS[i] ?? TIER_ACCENTS[0];
          return (
            <ScrollReveal key={membership.id} wrapperClass={`stagger-${i + 1}`}>
              <article
                className={`card-hover glass-card relative flex h-full flex-col rounded-3xl border-2 p-6 ${accent.border}`}
              >
                {/* Popular / Best Value badge */}
                {accent.label && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest ${accent.badge}`}
                  >
                    {accent.label}
                  </span>
                )}

                {/* Plan name & tagline */}
                <h2 className="display-font text-2xl leading-tight text-[var(--foreground)]">
                  {membership.name}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-[var(--accent)]">
                  {membership.tagline}
                </p>

                {/* Price */}
                <div className="mt-5 flex items-end gap-1">
                  <span className="display-font text-5xl font-light text-[var(--accent-deep)]">
                    ${membership.monthlyPrice}
                  </span>
                  <span className="mb-1.5 text-sm text-[var(--text-muted)]">/month</span>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-[var(--line)]" />

                {/* Benefits */}
                <ul className="flex-1 space-y-3">
                  {membership.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--background-soft)] text-[8px] font-bold text-[var(--accent-deep)]">
                        ✓
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="/booking"
                  className="mt-6 block rounded-xl bg-[var(--accent-deep)] px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-[var(--accent)] hover:shadow-md"
                >
                  Get Started
                </a>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ── Fine print ──────────────────────────────────────────── */}
      <ScrollReveal wrapperClass="mt-8">
        <p className="text-center text-xs text-[var(--text-muted)]">
          All memberships are month-to-month. Book through Vagaro or use our online booking.
          Call <a href="tel:4808151595" className="animated-underline text-[var(--accent-deep)]">(480) 815-1595</a> with questions.
        </p>
      </ScrollReveal>
      </div>
    </main>
  );
}
