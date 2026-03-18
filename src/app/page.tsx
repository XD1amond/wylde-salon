import Link from "next/link";
import { businessHours, reviews, salonInfo, services, stylists } from "@/lib/salon-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ChatOpenButton } from "@/components/chat-open-button";

const FEATURE_CARDS = [
  {
    label: "Services",
    icon: "✦",
    headline: (n: number) => `${n} Services`,
    body: "Cuts, color, extensions, treatments, and styling — all under one roof.",
    href: "/services",
    cta: "View all services →",
  },
  {
    label: "Stylists",
    icon: "◈",
    headline: (n: number) => `${n} Specialists`,
    body: "Experts in blonding, extensions, color, balayage, and precision cuts.",
    href: "/stylists",
    cta: "Meet the team →",
  },
  {
    label: "Memberships",
    icon: "❋",
    headline: () => "Blowout Plans",
    body: "Monthly memberships from $50 — lock in your salon ritual.",
    href: "/memberships",
    cta: "See membership plans →",
  },
];

const STAR = "★";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section>
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Left — headline */}
          <div>
            <p className="animate-fade-down mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] backdrop-blur-sm">
              <span className="text-amber-500">★★★★★</span>
              4.9 · Gilbert, Arizona
            </p>
            <h1 className="animate-fade-up display-font text-5xl leading-tight text-[var(--foreground)] md:text-7xl">
              Modern hair for custom color, precision cuts &amp; confident style.
            </h1>
            <p className="animate-fade-up delay-200 mt-5 max-w-xl text-[15px] leading-7 text-[var(--text-muted)]">
              {salonInfo.description}
            </p>
            <div className="animate-fade-up delay-300 mt-7 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="pulse-ring rounded-full bg-[var(--accent-deep)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)] hover:shadow-md"
              >
                Book Appointment
              </Link>
              <Link
                href="/stylists"
                className="rounded-full border border-[var(--line)] bg-white/70 px-6 py-3 text-sm font-medium text-[var(--foreground)] backdrop-blur-sm transition hover:border-[var(--accent)] hover:bg-white"
              >
                Meet the Team
              </Link>
            </div>
          </div>

          {/* Right — hours card */}
          <div className="animate-slide-left delay-200">
            <div className="glass-card rounded-3xl p-6">
              <h2 className="display-font text-3xl text-[var(--accent-deep)]">Hours &amp; Studio</h2>
              <ul className="mt-4 space-y-0.5 text-sm">
                {businessHours.map((hour) => (
                  <li
                    key={hour}
                    className="flex justify-between border-b border-[var(--line)] py-2.5 last:border-none"
                  >
                    <span className="text-[var(--foreground)]">{hour.split(/\s+/).slice(0, 1)}</span>
                    <span className="text-[var(--text-muted)]">{hour.split(/^(\S+)\s+/).slice(2).join("")}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-[var(--line)] pt-4 text-sm">
                <p className="font-medium text-[var(--foreground)]">{salonInfo.address}</p>
                <a
                  href={`tel:${salonInfo.phone.replace(/\D/g, "")}`}
                  className="animated-underline mt-1 inline-block text-[var(--accent-deep)]"
                >
                  {salonInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature cards ────────────────────────────────────────── */}
        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {FEATURE_CARDS.map((card, i) => (
            <ScrollReveal key={card.label} wrapperClass={`stagger-${i + 1}`}>
              <article className="card-hover glass-card group h-full rounded-3xl p-6 transition-all">
                <p className="text-2xl text-[var(--accent)]">{card.icon}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {card.label}
                </p>
                <h3 className="display-font mt-1.5 text-3xl text-[var(--foreground)]">
                  {card.headline(card.label === "Services" ? services.length : stylists.length)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{card.body}</p>
                <Link
                  href={card.href}
                  className="animated-underline mt-4 inline-block text-sm font-semibold text-[var(--accent-deep)]"
                >
                  {card.cta}
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </section>
      </div>
      </section>

      {/* ── Google Rating Banner ──────────────────────────────────── */}
      <section className="bg-[var(--accent-deep)] py-14 text-white">
        <ScrollReveal wrapperClass="">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/60">Rated on Google</p>
            <div className="flex items-center justify-center gap-3">
              <span className="display-font text-7xl font-bold md:text-9xl">4.9</span>
              <div className="text-left">
                <div className="text-3xl text-amber-400">★★★★★</div>
                <p className="mt-1 text-sm text-white/70">407 Google reviews</p>
              </div>
            </div>
            <p className="mt-4 text-base text-white/80 max-w-md mx-auto">
              Gilbert's most-loved hair salon — trusted by hundreds of clients for color, cuts, and extensions.
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-block rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--accent-deep)]"
            >
              Book Your Visit
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal wrapperClass="">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">What clients say</p>
              <h2 className="display-font mt-1 text-4xl text-[var(--foreground)]">Real Reviews</h2>
            </div>
            <Link
              href="/reviews"
              className="animated-underline hidden text-sm font-medium text-[var(--accent-deep)] sm:block"
            >
              See all reviews →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.slice(0, 8).map((review, i) => (
            <ScrollReveal key={review.id} wrapperClass={`stagger-${Math.min(i + 1, 8)}`}>
              <article className="card-hover glass-card flex h-full flex-col rounded-2xl p-5">
                <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j}>{STAR}</span>
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--foreground)]">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-4 border-t border-[var(--line)] pt-3">
                  <p className="text-xs font-semibold text-[var(--accent-deep)]">{review.author}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{review.service}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal wrapperClass="mt-6 text-center sm:hidden">
          <Link href="/reviews" className="text-sm font-medium text-[var(--accent-deep)] animated-underline">
            See all reviews →
          </Link>
        </ScrollReveal>
      </section>

      {/* ── Featured Stylists ─────────────────────────────────────── */}
      <section className="bg-[var(--background-soft)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal wrapperClass="">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">Our team</p>
              <h2 className="display-font mt-1 text-4xl text-[var(--foreground)]">Meet Your Stylists</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--text-muted)]">
                15+ specialists in blonding, balayage, extensions, and precision cuts — each passionate about making you feel your best.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {stylists.slice(0, 5).map((stylist, i) => (
              <ScrollReveal key={stylist.id} wrapperClass={`stagger-${i + 1}`}>
                <Link href="/stylists" className="group block">
                  <div className="overflow-hidden rounded-2xl bg-[var(--line)] aspect-[3/4]">
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent-deep)]">
                    {stylist.name.split(" ")[0]}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">{stylist.title}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal wrapperClass="mt-8">
            <Link
              href="/stylists"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-deep)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-deep)] transition hover:bg-[var(--accent-deep)] hover:text-white"
            >
              View all {stylists.length} stylists →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── AI Concierge callout ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <ScrollReveal wrapperClass="">
          <div className="glass-card flex flex-col items-start gap-4 rounded-3xl p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                AI-Powered
              </p>
              <h3 className="display-font mt-1 text-2xl text-[var(--foreground)]">
                Not sure where to start?
              </h3>
              <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">
                Chat with our AI concierge — get stylist recommendations and book your appointment in plain English.
              </p>
            </div>
            <ChatOpenButton className="shrink-0 rounded-full border border-[var(--accent-deep)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-deep)] transition hover:bg-[var(--accent-deep)] hover:text-white">
              Chat with Wylde AI
            </ChatOpenButton>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
