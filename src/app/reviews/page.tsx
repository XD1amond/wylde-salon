import Link from "next/link";
import { reviews, salonInfo } from "@/lib/salon-data";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ReviewsPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── Header ───────────────────────────────────────── */}
      <section className="bg-[var(--accent-deep)] px-6 py-14 text-center text-white">
        <p className="animate-fade-down text-xs uppercase tracking-[0.3em] text-white/60">Google Reviews</p>
        <h1 className="animate-fade-up display-font mt-3 text-5xl md:text-6xl">Client Reviews</h1>
        <div className="animate-fade-up delay-200 mt-4 flex items-center justify-center gap-3">
          <span className="text-3xl text-amber-400">★★★★★</span>
          <span className="text-2xl font-bold text-white">4.9</span>
          <span className="text-sm text-white/60">· 407 reviews on Google</span>
        </div>
        <p className="animate-fade-up delay-300 mt-3 text-sm text-white/70">
          What our guests are saying about their experience at Wylde Salon.
        </p>
      </section>

      {/* ── Reviews grid ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.id} direction="scale" wrapperClass={`stagger-${Math.min(i + 1, 8)}`}>
              <blockquote className="card-hover flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  <p className="text-sm tracking-wider text-amber-400">
                    {"★".repeat(review.rating)}
                  </p>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    {review.rating}.0
                  </span>
                </div>

                {/* Quote */}
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--foreground)]">
                  &ldquo;{review.quote}&rdquo;
                </p>

                {/* Footer */}
                <footer className="mt-5 border-t border-[var(--line)] pt-4">
                  <p className="text-xs font-semibold text-[var(--accent-deep)]">
                    {review.author}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {review.service}
                  </p>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <ScrollReveal wrapperClass="">
        <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            See all 407+ reviews on{" "}
            <a
              href="https://www.google.com/maps/place/Wylde+Salon/@33.3232212,-111.7219847,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent-deep)] animated-underline"
            >
              Google Maps ↗
            </a>
          </p>
          <Link
            href="/booking"
            className="pulse-ring mt-5 inline-block rounded-full bg-[var(--accent-deep)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)]"
          >
            Book Your Appointment
          </Link>
        </section>
      </ScrollReveal>
    </main>
  );
}
