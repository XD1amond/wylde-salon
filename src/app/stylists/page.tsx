import { StylistsGrid } from "@/components/stylists-grid";
import { stylists } from "@/lib/salon-data";

export default function StylistsPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── Dark hero header ─────────────────────────────── */}
      <section className="bg-[var(--accent-deep)] px-6 py-14 text-center text-white">
        <p className="animate-fade-down text-xs uppercase tracking-[0.3em] text-white/60">Our Team</p>
        <h1 className="animate-fade-up display-font mt-3 text-5xl md:text-6xl">Meet the Stylists</h1>
        <p className="animate-fade-up delay-200 mt-3 text-sm text-white/70 max-w-xl mx-auto">
          {stylists.length} talented specialists in blonding, balayage, extensions, color correction, and more.
          Tap any card to read a full bio and book directly.
        </p>
      </section>

      {/* ── Grid ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <StylistsGrid stylists={stylists} />
      </section>
    </main>
  );
}
