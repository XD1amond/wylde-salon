import { services } from "@/lib/salon-data";
import { ScrollReveal } from "@/components/scroll-reveal";

const CATEGORY_ORDER = ["Cut", "Extensions", "Color", "Treatment", "Styling"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Cut:        "text-[#4a7c5f]  border-[#4a7c5f]",
  Extensions: "text-[#7c4a7f]  border-[#7c4a7f]",
  Color:      "text-[var(--accent-deep)] border-[var(--accent-deep)]",
  Treatment:  "text-[#5a6e8c]  border-[#5a6e8c]",
  Styling:    "text-[#8c5a3a]  border-[#8c5a3a]",
};

function formatPrice(service: { price: number; priceNote?: string }) {
  if (service.priceNote === "Consultation") return "Consultation";
  if (service.priceNote === "Inquire")       return "Inquire";
  if (service.priceNote === "Per row")       return `$${service.price} / row`;
  if (service.priceNote === "Starting at")   return `From $${service.price}`;
  if (service.price === 0)                   return "Free";
  return `$${service.price}`;
}

export default function ServicesPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: services.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <main className="overflow-x-hidden">

      {/* ── Dark hero header ─────────────────────────────────── */}
      <section className="bg-[var(--accent-deep)] px-6 py-14 text-center text-white">
        <p className="animate-fade-down text-xs uppercase tracking-[0.3em] text-white/60">Menu</p>
        <h1 className="animate-fade-up display-font mt-3 text-5xl md:text-6xl">Services</h1>
        <p className="animate-fade-up delay-200 mt-3 text-sm text-white/70 max-w-xl mx-auto">
          Cuts, color, extensions, treatments, and styling — all under one roof in Gilbert, AZ.
        </p>
        <a
          href="/booking"
          className="animate-fade-up delay-300 mt-6 inline-block rounded-full border border-white/40 bg-white/10 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          Book an Appointment
        </a>
      </section>

      {/* ── Categories ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
      {grouped.map((group, gi) => (
        <section key={group.category} className="mt-10">
          <ScrollReveal>
            <div className="mb-4 flex items-center gap-3">
              <span className={`category-badge ${CATEGORY_COLORS[group.category]}`}>
                {group.category}
              </span>
              <div className="h-px flex-1 bg-[var(--line)]" />
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((service, si) => (
              <ScrollReveal
                key={service.id}
                wrapperClass={`stagger-${Math.min(si + 1, 8)}`}
              >
                <article className="card-hover glass-card h-full rounded-2xl p-5">
                  {/* name + price */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="display-font text-xl leading-snug text-[var(--foreground)]">
                      {service.name}
                    </h2>
                    <span className="mt-0.5 shrink-0 rounded-full bg-[var(--background-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-deep)]">
                      {formatPrice(service)}
                    </span>
                  </div>

                  {/* description */}
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {service.description}
                  </p>

                  {/* footer */}
                  <p className="mt-4 text-[10px] uppercase tracking-widest text-[var(--accent)]">
                    {service.durationMin > 0 ? `${service.durationMin} min` : "Time varies"}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      ))}

      {/* ── Products footer ─────────────────────────────────────── */}
      <ScrollReveal wrapperClass="mt-10">
        <div className="glass-card rounded-2xl px-6 py-5 text-sm text-[var(--text-muted)]">
          <span className="font-semibold text-[var(--foreground)]">Featured product lines: </span>
          Kevin Murphy, Mr. Smith, Cult + King, and L&apos;Oréal Professionnel.
        </div>
      </ScrollReveal>
      </div>
    </main>
  );
}
