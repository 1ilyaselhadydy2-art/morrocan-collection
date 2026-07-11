import { useEffect, useState } from "react";
import { X } from "lucide-react";
import heroVideo from "@/assets/haydar-hero.mp4.asset.json";
import { usePricing } from "@/lib/pricing";

const STORAGE_KEY = "haydar_promo_seen_v1";

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const { price, originalPrice } = usePricing();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }
    const id = window.setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 4000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const savings = Math.max(0, Number(originalPrice) - Number(price));

  const scrollToForm = () => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[600px] overflow-hidden rounded-2xl shadow-2xl animate-scale-in"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.22_0.03_40)]/75" />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-[1] px-6 sm:px-10 py-10 sm:py-12 text-center text-white">
          <span className="inline-block text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[oklch(0.85_0.15_75)] mb-3">
            🔥 Offre Exclusive HAYDAR
          </span>
          <h2 id="promo-title" className="font-serif text-3xl sm:text-4xl leading-tight mb-3">
            Découvrez l'élégance marocaine
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-md mx-auto">
            Inspirée du patrimoine traditionnel. Ne manquez pas cette offre avant la fin des stocks.
          </p>

          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span className="font-serif text-5xl sm:text-6xl font-bold text-[oklch(0.85_0.15_75)]">${price}</span>
            <span className="font-serif text-xl text-white/60 line-through">${originalPrice}</span>
          </div>
          {savings > 0 && (
            <p className="text-xs sm:text-sm tracking-widest uppercase text-[oklch(0.85_0.15_145)] mb-6">
              Économisez ${savings}
            </p>
          )}

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-left text-sm text-white/90 max-w-sm mx-auto mb-8">
            <li>✓ Paiement à la livraison</li>
            <li>✓ Livraison rapide au Maroc</li>
            <li>✓ Échange de taille disponible</li>
            <li>✓ Qualité Premium</li>
          </ul>

          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase font-medium hover:bg-white transition rounded-sm"
            >
              Commander maintenant
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-white/50 text-white px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-white/10 transition rounded-sm"
            >
              Continuer la visite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}