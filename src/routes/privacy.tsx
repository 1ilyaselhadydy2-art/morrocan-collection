import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Database, Lock, Cookie, UserCheck } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — HAYDAR" },
      { name: "description", content: "Découvrez comment HAYDAR collecte, utilise et protège vos données personnelles." },
      { property: "og:title", content: "Politique de confidentialité — HAYDAR" },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  { icon: Database, title: "Collecte des informations", body: "Les informations personnelles sont collectées uniquement lors d'une commande ou d'une prise de contact." },
  { icon: ShieldCheck, title: "Utilisation des données", body: "Vos informations servent uniquement au traitement des commandes, au service client et à l'amélioration de votre expérience." },
  { icon: Lock, title: "Protection des données", body: "Toutes les données sont sécurisées et protégées." },
  { icon: Cookie, title: "Cookies", body: "Notre site utilise des cookies afin d'améliorer la navigation." },
  { icon: UserCheck, title: "Vos droits", body: "Vous pouvez demander la modification ou la suppression de vos données personnelles à tout moment." },
];

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Confidentialité" title="Politique de confidentialité" description="Votre confiance est notre priorité." />
      <Breadcrumbs current="Politique de confidentialité" />
      <section className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 py-8 grid gap-4">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.title} className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full grid place-items-center bg-[oklch(0.38_0.14_20)]/10 text-[oklch(0.38_0.14_20)] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl mb-2">{s.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <ContactCta />
      <BackHome />
    </PageShell>
  );
}