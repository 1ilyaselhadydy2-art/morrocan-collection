import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw, PackageOpen, CalendarClock, Repeat } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Politique de retour — HAYDAR" },
      { name: "description", content: "Retours HAYDAR acceptés sous 7 jours. Produit neuf, non porté, dans son emballage d'origine." },
      { property: "og:title", content: "Politique de retour — HAYDAR" },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/returns" }],
  }),
  component: ReturnsPage,
});

const CONDITIONS = [
  { icon: PackageOpen, t: "Produit neuf", d: "Le produit doit être neuf, sans trace d'utilisation." },
  { icon: RotateCcw, t: "Non porté", d: "Le produit ne doit pas avoir été porté." },
  { icon: CalendarClock, t: "Sous 7 jours", d: "La demande de retour doit intervenir sous 7 jours après réception." },
  { icon: Repeat, t: "Emballage d'origine", d: "Le produit doit être retourné dans son emballage d'origine." },
];

function ReturnsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Retours" title="Politique de retour" description="Les retours sont acceptés sous 7 jours après réception." />
      <Breadcrumbs current="Politique de retour" />
      <section className="max-w-4xl mx-auto px-6 sm:px-8 md:px-16 py-8">
        <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-center">Conditions de retour</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {CONDITIONS.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.t} className="rounded-xl border border-border bg-card p-6 shadow-sm hover-scale transition-shadow hover:shadow-md">
                <div className="w-11 h-11 rounded-full grid place-items-center bg-[oklch(0.38_0.14_20)]/10 text-[oklch(0.38_0.14_20)] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl mb-2">{s.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.d}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 rounded-2xl p-6 sm:p-8 text-white text-center" style={{ background: "var(--gradient-hero)" }}>
          <p className="text-white/90">L'échange est possible selon la disponibilité. Pour toute demande de retour, contactez notre service client.</p>
        </div>
      </section>
      <ContactCta />
      <BackHome />
    </PageShell>
  );
}