import { useEffect, useState } from "react";
import { getPrice } from "@/services/googleSheet";

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
      const info = await getPrice();
      cache = {
        price: info.price || DEFAULT_PRICE,
        originalPrice: info.originalPrice || DEFAULT_PRICE_ORIGINAL,
        available: info.available,
        loaded: true,
      };
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