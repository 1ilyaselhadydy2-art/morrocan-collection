import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions fréquentes — HAYDAR" },
      { name: "description", content: "Réponses aux questions les plus fréquentes sur les commandes, livraisons, échanges et retours HAYDAR." },
      { property: "og:title", content: "Questions fréquentes — HAYDAR" },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  { q: "Quels sont les délais de livraison ?", a: "La livraison est généralement effectuée sous 24 à 72 heures partout au Maroc." },
  { q: "Livrez-vous dans tout le Maroc ?", a: "Oui, nous livrons dans toutes les villes du Royaume." },
  { q: "Puis-je payer à la livraison ?", a: "Oui. Le paiement à la livraison est disponible." },
  { q: "Comment suivre ma commande ?", a: "Utilisez la page \"Suivre ma commande\" avec votre numéro de commande." },
  { q: "Puis-je échanger une taille ?", a: "Oui selon la disponibilité des stocks." },
  { q: "Puis-je retourner un produit ?", a: "Oui sous 7 jours si le produit est neuf et non porté." },
  { q: "Comment contacter le service client ?", a: "Par téléphone, WhatsApp ou Email." },
  { q: "Les produits sont-ils authentiques ?", a: "Tous les produits HAYDAR sont fabriqués avec des matériaux soigneusement sélectionnés afin de garantir une qualité premium." },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageShell>
      <PageHero eyebrow="Aide" title="Questions fréquentes" description="Retrouvez toutes les réponses à vos questions." />
      <Breadcrumbs current="FAQ" />

      <section className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 py-8">
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left min-h-[56px]"
                >
                  <span className="font-serif text-base sm:text-lg text-foreground">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[oklch(0.38_0.14_20)]" : "text-muted-foreground"}`} />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-muted-foreground leading-relaxed animate-fade-in">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <ContactCta />
      <BackHome />
    </PageShell>
  );
}