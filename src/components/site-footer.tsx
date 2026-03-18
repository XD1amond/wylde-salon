import { salonInfo } from "@/lib/salon-data";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-10 max-w-6xl px-6 pb-10">
      <div className="glass-card rounded-3xl p-5 text-sm text-[var(--text-muted)]">
        <p>
          {salonInfo.name} • {salonInfo.address}
        </p>
        <p className="mt-1">
          <a href={`tel:${salonInfo.phone}`}>{salonInfo.phone}</a> •{" "}
          <a href={`mailto:${salonInfo.email}`}>{salonInfo.email}</a>
        </p>
      </div>
    </footer>
  );
}
