import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Package, Truck, MapPin, PackageCheck } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Suivre ma commande — HAYDAR" },
      { name: "description", content: "Consultez l'état de votre commande HAYDAR à l'aide de votre numéro de commande et de votre téléphone." },
      { property: "og:title", content: "Suivre ma commande — HAYDAR" },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/track" }],
  }),
  component: TrackPage,
});

const STATUSES = [
  { icon: CheckCircle2, label: "Commande confirmée" },
  { icon: Package, label: "En préparation" },
  { icon: Truck, label: "Expédiée" },
  { icon: MapPin, label: "En cours de livraison" },
  { icon: PackageCheck, label: "Livrée" },
];

function TrackPage() {
  const [shown, setShown] = useState(false);
  const [activeStep, setActiveStep] = useState(2);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShown(true);
    setActiveStep(2 + Math.floor(Math.random() * 3));
  }

  const field =
    "w-full bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.38_0.14_20)] focus:ring-2 focus:ring-[oklch(0.72_0.14_75)]/30 transition";
  const label = "text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block";

  return (
    <PageShell>
      <PageHero
        eyebrow="Suivi"
        title="Suivre ma commande"
        description="Entrez votre numéro de commande ainsi que votre numéro de téléphone afin de consulter l'état de votre commande."
      />
      <Breadcrumbs current="Suivre ma commande" />

      <section className="max-w-2xl mx-auto px-6 sm:px-8 md:px-16 py-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
          <form onSubmit={onSubmit} className="grid gap-5">
            <div>
              <label className={label}>Numéro de commande</label>
              <input required name="order" className={field} placeholder="HYD-000000" />
            </div>
            <div>
              <label className={label}>Téléphone</label>
              <input required type="tel" name="phone" className={field} placeholder="+212 6 00 00 00 00" />
            </div>
            <button
              type="submit"
              className="bg-[oklch(0.38_0.14_20)] text-white px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-[oklch(0.28_0.10_25)] transition rounded-sm"
            >
              Suivre ma commande
            </button>
          </form>
        </div>
      </section>

      {shown && (
        <section className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 pb-16 animate-fade-in">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl mb-8 text-center">État de votre commande</h2>
            <ol className="relative border-l-2 border-border ml-4">
              {STATUSES.map((s, i) => {
                const done = i <= activeStep;
                const Icon = s.icon;
                return (
                  <li key={s.label} className="mb-8 ml-8 last:mb-0">
                    <span
                      className={`absolute -left-5 grid place-items-center w-10 h-10 rounded-full border-2 ${
                        done
                          ? "bg-[oklch(0.55_0.18_145)] border-[oklch(0.55_0.18_145)] text-white"
                          : "bg-background border-border text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className={done ? "text-foreground" : "text-muted-foreground"}>
                      <p className="font-serif text-lg">{done ? "✓ " : ""}{s.label}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      <ContactCta />
      <BackHome />
    </PageShell>
  );
}