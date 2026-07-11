import { createFileRoute } from "@tanstack/react-router";
import { Ruler, Sparkles } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Guide des tailles — HAYDAR" },
      { name: "description", content: "Trouvez votre taille idéale grâce au guide des tailles HAYDAR : longueur, poids recommandé et tour de poitrine." },
      { property: "og:title", content: "Guide des tailles — HAYDAR" },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/size-guide" }],
  }),
  component: SizeGuidePage,
});

const ROWS = [
  { s: "S", l: "165–170", w: "55–65", c: "90–96" },
  { s: "M", l: "170–175", w: "65–75", c: "96–102" },
  { s: "L", l: "175–180", w: "75–85", c: "102–108" },
  { s: "XL", l: "180–185", w: "85–95", c: "108–114" },
  { s: "XXL", l: "185–190", w: "95–105", c: "114–120" },
  { s: "3XL", l: "190–195", w: "105–115", c: "120–126" },
];

function SizeGuidePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sur-Mesure"
        title="Guide des tailles"
        description="Choisissez votre taille idéale selon votre taille et votre poids."
      />
      <Breadcrumbs current="Guide des tailles" />

      <section className="max-w-4xl mx-auto px-6 sm:px-8 md:px-16 py-8">
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[oklch(0.38_0.14_20)] text-white">
                  <th className="px-4 py-4 text-left tracking-[0.2em] uppercase text-xs">Taille</th>
                  <th className="px-4 py-4 text-right tracking-[0.2em] uppercase text-xs">Longueur (cm)</th>
                  <th className="px-4 py-4 text-right tracking-[0.2em] uppercase text-xs">Poids (kg)</th>
                  <th className="px-4 py-4 text-right tracking-[0.2em] uppercase text-xs">Poitrine (cm)</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.s} className={i % 2 ? "bg-[oklch(0.94_0.02_75)]/40" : ""}>
                    <td className="px-4 py-4 font-serif text-lg text-[oklch(0.38_0.14_20)]">{r.s}</td>
                    <td className="px-4 py-4 text-right">{r.l}</td>
                    <td className="px-4 py-4 text-right">{r.w}</td>
                    <td className="px-4 py-4 text-right">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 sm:px-8 md:px-16 pb-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full grid place-items-center bg-[oklch(0.38_0.14_20)]/10 text-[oklch(0.38_0.14_20)] shrink-0">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-3">Comment choisir votre taille&nbsp;?</h3>
              <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                <li>• Mesurez votre taille sans chaussures.</li>
                <li>• Utilisez votre poids actuel.</li>
                <li>• Comparez vos informations avec le tableau.</li>
                <li>• Si vous êtes entre deux tailles, choisissez la taille supérieure.</li>
                <li>• Pour toute assistance contactez notre service client.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 sm:px-8 md:px-16 pb-16">
        <div
          className="rounded-2xl p-6 sm:p-10 text-white shadow-sm"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full grid place-items-center bg-white/15 text-[oklch(0.85_0.15_75)] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-3">Conseil HAYDAR</h3>
              <p className="text-white/80 leading-relaxed">
                Nos vêtements offrent une coupe élégante inspirée du patrimoine marocain. Si vous aimez une coupe ajustée, choisissez votre taille habituelle. Pour un style plus traditionnel et ample, choisissez une taille supérieure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
      <BackHome />
    </PageShell>
  );
}