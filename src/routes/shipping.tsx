import { createFileRoute } from "@tanstack/react-router";
import { Truck, Clock, MailCheck, MapPin, Headphones } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Politique de livraison — HAYDAR" },
      { name: "description", content: "Livraison HAYDAR partout au Maroc en 24 à 72 heures ouvrables. Suivi de commande inclus." },
      { property: "og:title", content: "Politique de livraison — HAYDAR" },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/shipping" }],
  }),
  component: ShippingPage,
});

const ITEMS = [
  { icon: MapPin, t: "Zone de livraison", d: "Nous livrons partout au Maroc." },
  { icon: Clock, t: "Délais moyens", d: "24 à 72 heures ouvrables." },
  { icon: MailCheck, t: "Confirmation", d: "Une confirmation est envoyée après validation de la commande." },
  { icon: Truck, t: "Suivi de commande", d: "Chaque commande dispose d'un numéro de suivi." },
  { icon: Headphones, t: "Support", d: "En cas de retard, notre service client reste à votre disposition." },
];

function ShippingPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Logistique" title="Politique de livraison" description="Expédition rapide et suivie partout au Maroc." />
      <Breadcrumbs current="Politique d'expédition" />
      <section className="max-w-4xl mx-auto px-6 sm:px-8 md:px-16 py-8 grid sm:grid-cols-2 gap-4">
        {ITEMS.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.t} className="rounded-xl border border-border bg-card p-6 shadow-sm hover-scale transition-shadow hover:shadow-md">
              <div className="w-11 h-11 rounded-full grid place-items-center bg-[oklch(0.38_0.14_20)]/10 text-[oklch(0.38_0.14_20)] mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl mb-2">{s.t}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.d}</p>
            </article>
          );
        })}
      </section>
      <ContactCta />
      <BackHome />
    </PageShell>
  );
}