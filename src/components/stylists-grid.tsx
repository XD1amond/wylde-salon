"use client";

import { Stylist } from "@/lib/salon-data";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type StylistsGridProps = {
  stylists: Stylist[];
};

function useReveal(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>(".reveal, .reveal-scale"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}

export function StylistsGrid({ stylists }: StylistsGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useReveal(containerRef);

  const selectedStylist = useMemo(
    () => stylists.find((s) => s.id === selectedId) ?? null,
    [selectedId, stylists],
  );

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedId]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleBookWith(stylist: Stylist) {
    setSelectedId(null);
    router.push(`/booking?stylistId=${stylist.id}`);
  }

  return (
    <>
      <div ref={containerRef} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stylists.map((stylist, i) => (
          <div key={stylist.id} className={`reveal stagger-${Math.min(i + 1, 8)}`}>
            <button
              type="button"
              onClick={() => setSelectedId(stylist.id)}
              className="group w-full text-left rounded-2xl border border-[var(--line)] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(88,67,51,0.28)] hover:border-[var(--accent)]"
            >
              {/* Photo — fixed aspect ratio so nothing is cut off */}
              <div className="relative w-full overflow-hidden bg-[var(--background-soft)]" style={{aspectRatio: "4/5"}}>
                <img
                  src={stylist.image}
                  alt={`${stylist.name} — ${stylist.title}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Dark gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* View profile pill */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--accent-deep)] opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View Profile ↗
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {stylist.title}
                </p>
                <h2 className="display-font mt-1 text-2xl text-[var(--foreground)]">
                  {stylist.name}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {stylist.bio}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {stylist.specialties.slice(0, 3).map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-[var(--background-soft)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--accent-deep)]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                {/* Years badge */}
                <p className="mt-3 text-[10px] text-[var(--text-muted)]">
                  {stylist.years}+ years experience
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* ── Profile Modal ─────────────────────────────────────────── */}
      {selectedStylist && (
        <div
          className="animate-modal-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
        >
          <article
            className="animate-modal max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Side-by-side layout: image left, content right */}
            <div className="flex flex-col md:flex-row md:h-[80vh] md:max-h-[700px]">

              {/* LEFT — Stylist photo */}
              <div className="relative w-full flex-shrink-0 md:w-[45%]">
                <img
                  src={selectedStylist.image}
                  alt={selectedStylist.name}
                  className="h-64 w-full object-cover object-top md:h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:bg-gradient-to-r" />
                {/* Name overlay on mobile */}
                <div className="absolute bottom-0 left-0 p-5 md:hidden">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">{selectedStylist.title}</p>
                  <h3 className="display-font text-3xl text-white">{selectedStylist.name}</h3>
                </div>
              </div>

              {/* RIGHT — Content */}
              <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
                {/* Close */}
                <div className="flex items-start justify-between">
                  <div className="hidden md:block">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {selectedStylist.title}
                    </p>
                    <h3 className="display-font text-4xl text-[var(--foreground)]">
                      {selectedStylist.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[var(--background-soft)] text-sm font-bold text-[var(--foreground)] transition hover:bg-[var(--line)]"
                    aria-label="Close profile"
                  >
                    ✕
                  </button>
                </div>

                {/* Years */}
                <div className="mt-4">
                  <span className="rounded-full bg-[var(--background-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-deep)]">
                    {selectedStylist.years}+ years experience
                  </span>
                </div>

                {/* Bio */}
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--text-muted)]">
                  {selectedStylist.longBio}
                </p>

                {/* Specialties */}
                <div className="mt-5">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    Specialties
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedStylist.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full border border-[var(--line)] bg-[var(--background-soft)] px-3 py-1 text-xs font-medium text-[var(--foreground)]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instagram */}
                {selectedStylist.instagram && (
                  <div className="mt-4">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      Instagram
                    </p>
                    <a
                      href={`https://instagram.com/${selectedStylist.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animated-underline mt-1 inline-block text-sm font-medium text-[var(--accent-deep)]"
                    >
                      {selectedStylist.instagram}
                    </a>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={() => handleBookWith(selectedStylist)}
                  className="pulse-ring mt-6 block w-full rounded-xl bg-[var(--accent-deep)] py-3 text-center text-sm font-semibold text-white transition hover:bg-[var(--accent)]"
                >
                  Book with {selectedStylist.name.split(" ")[0]} →
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
