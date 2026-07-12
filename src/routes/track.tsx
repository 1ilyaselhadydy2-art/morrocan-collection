import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Package, Truck, MapPin, PackageCheck, AlertCircle } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, ContactCta } from "@/components/site-chrome";
import { trackOrder, ORDER_STATUSES } from "@/services/googleSheet";

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
  { icon: CheckCircle2, label: ORDER_STATUSES[0] },
  { icon: Package, label: ORDER_STATUSES[1] },
  { icon: Truck, label: ORDER_STATUSES[2] },
  { icon: MapPin, label: ORDER_STATUSES[3] },
  { icon: PackageCheck, label: ORDER_STATUSES[4] },
];

function TrackPage() {
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "found"; orderNumber: string; status: string; step: number }
    | { kind: "notfound" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const orderNumber = String(fd.get("order") ?? "").trim();
    if (!orderNumber) return;
    setState({ kind: "loading" });
    try {
      const result = await trackOrder(orderNumber);
      if (!result.found) {
        setState({ kind: "notfound" });
        return;
      }
      const step = STATUSES.findIndex((s) => s.label.toLowerCase() === result.status.toLowerCase());
      setState({
        kind: "found",
        orderNumber: result.orderNumber,
        status: result.status,
        step: step >= 0 ? step : 0,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      setState({ kind: "error", message });
    }
  }

  const field =
    "w-full bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.38_0.14_20)] focus:ring-2 focus:ring-[oklch(0.72_0.14_75)]/30 transition";
  const label = "text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block";

  return (
    <PageShell>
      <PageHero
        eyebrow="Suivi"
        title="Suivre ma commande"
        description="Entrez votre numéro de commande afin de consulter l'état actuel de votre livraison."
      />
      <Breadcrumbs current="Suivre ma commande" />

      <section className="max-w-2xl mx-auto px-6 sm:px-8 md:px-16 py-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
          <form onSubmit={onSubmit} className="grid gap-5">
            <div>
              <label className={label}>Numéro de commande</label>
              <input required name="order" className={field} placeholder="HD-26-0001" />
            </div>
            <button
              type="submit"
              disabled={state.kind === "loading"}
              className="bg-[oklch(0.38_0.14_20)] text-white px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-[oklch(0.28_0.10_25)] transition rounded-sm disabled:opacity-60"
            >
              {state.kind === "loading" ? "Recherche..." : "Rechercher"}
            </button>
            {state.kind === "notfound" && (
              <div className="flex items-start gap-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>Numéro de commande introuvable. Vérifiez qu'il est correct puis réessayez.</p>
              </div>
            )}
            {state.kind === "error" && (
              <div className="flex items-start gap-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>Impossible de contacter notre service. {state.message}</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {state.kind === "found" && (
        <section className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 pb-16 animate-fade-in">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Commande</p>
              <p className="font-serif text-xl sm:text-2xl">{state.orderNumber}</p>
              <h2 className="font-serif text-2xl sm:text-3xl mt-4">État : {state.status}</h2>
            </div>
            <ol className="relative border-l-2 border-border ml-4">
              {STATUSES.map((s, i) => {
                const done = i <= state.step;
                const current = i === state.step;
                const Icon = s.icon;
                return (
                  <li key={s.label} className="mb-8 ml-8 last:mb-0">
                    <span
                      className={`absolute -left-5 grid place-items-center w-10 h-10 rounded-full border-2 ${
                        current
                          ? "bg-[oklch(0.72_0.14_75)] border-[oklch(0.72_0.14_75)] text-white ring-4 ring-[oklch(0.72_0.14_75)]/25"
                          : done
                          ? "bg-[oklch(0.55_0.18_145)] border-[oklch(0.55_0.18_145)] text-white"
                          : "bg-background border-border text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className={done ? "text-foreground" : "text-muted-foreground"}>
                      <p className="font-serif text-lg">
                        {done && !current ? "✓ " : ""}
                        {s.label}
                        {current && <span className="ml-2 text-xs tracking-widest uppercase text-[oklch(0.55_0.16_40)]">— étape actuelle</span>}
                      </p>
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