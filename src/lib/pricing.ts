import { useEffect, useState } from "react";

export const PRICING_API_URL =
  "https://script.google.com/macros/s/AKfycbxhUAKirKRXKUSP2YHV4oDCo2062BfLz1vEnC9JGoJkOz8ATHJiDmPAwZPPRtzW4S3rvg/exec";
export const DEFAULT_PRICE = "69";
export const DEFAULT_PRICE_ORIGINAL = "189";

export type Pricing = {
  price: string;
  originalPrice: string;
  available: boolean;
  loaded: boolean;
};

let cache: Pricing | null = null;
let inflight: Promise<Pricing> | null = null;

async function fetchPricing(): Promise<Pricing> {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch(`${PRICING_API_URL}?t=${Date.now()}`, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const cur = data.Prix ?? data.prix ?? data.price ?? data.PrixActuel;
      const old = data.AncienPrix ?? data.ancienPrix ?? data.oldPrice ?? data.PrixBarre;
      const disp = data.Disponible ?? data.disponible ?? data.available;
      const price =
        cur !== undefined && cur !== null && String(cur).trim() !== ""
          ? String(cur).replace(/[^\d.]/g, "") || String(cur)
          : DEFAULT_PRICE;
      const originalPrice =
        old !== undefined && old !== null && String(old).trim() !== ""
          ? String(old).replace(/[^\d.]/g, "") || String(old)
          : DEFAULT_PRICE_ORIGINAL;
      const available = disp !== undefined && disp !== null ? String(disp).toLowerCase() !== "non" : true;
      cache = { price, originalPrice, available, loaded: true };
      return cache;
    } catch (err) {
      console.error("[Pricing] Fetch failed:", err);
      cache = { price: DEFAULT_PRICE, originalPrice: DEFAULT_PRICE_ORIGINAL, available: true, loaded: true };
      return cache;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

export function usePricing(): Pricing {
  const [state, setState] = useState<Pricing>(
    cache ?? { price: DEFAULT_PRICE, originalPrice: DEFAULT_PRICE_ORIGINAL, available: true, loaded: false },
  );
  useEffect(() => {
    let cancelled = false;
    fetchPricing().then((p) => {
      if (!cancelled) setState(p);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}