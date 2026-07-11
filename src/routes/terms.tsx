import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Conditions Générales de Vente — HAYDAR" },
      { name: "description", content: "Conditions générales de vente HAYDAR : produits, prix, paiement, livraison, retours et garanties." },
      { property: "og:title", content: "Conditions Générales de Vente — HAYDAR" },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/terms" }],
  }),
  component: TermsPage,
});

const SECTIONS = [
  { t: "Présentation", d: "HAYDAR est une marque marocaine de vêtements traditionnels revisités, spécialisée dans les gilets faits main." },
  { t: "Produits", d: "Chaque pièce est confectionnée à la main. De légères variations peuvent exister, garantie d'un travail artisanal authentique." },
  { t: "Prix", d: "Les prix sont affichés en dollars ($). HAYDAR se réserve le droit de modifier ses prix à tout moment." },
  { t: "Paiement", d: "Le paiement à la livraison est disponible pour les commandes au Maroc." },
  { t: "Livraison", d: "Les commandes sont expédiées sous 24 à 72 heures ouvrables partout au Maroc." },
  { t: "Retours", d: "Les retours sont acceptés sous 7 jours après réception, produit neuf et non porté." },
  { t: "Garantie", d: "Nos produits sont garantis contre tout défaut de fabrication." },
  { t: "Responsabilité", d: "HAYDAR ne saurait être tenu responsable des dommages liés à un usage inapproprié du produit." },
  { t: "Propriété intellectuelle", d: "Tous les textes, logos, images, vidéos et contenus présents sur ce site sont la propriété exclusive de HAYDAR." },
];

function TermsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Légal" title="Conditions Générales de Vente" description="Merci de lire attentivement nos conditions générales." />
      <Breadcrumbs current="Conditions générales" />
      <section className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 py-8">
        <ol className="space-y-4">
          {SECTIONS.map((s, i) => (
            <li key={s.t} className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[oklch(0.72_0.14_75)] text-2xl leading-none shrink-0 w-10">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl mb-2">{s.t}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <ContactCta />
      <BackHome />
    </PageShell>
  );
}