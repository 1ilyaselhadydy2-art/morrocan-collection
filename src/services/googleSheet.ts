// Central Google Apps Script integration.
// Change this single constant (or set VITE_APPS_SCRIPT_URL) to point at a
// different deployment — no other file needs to be touched.
export const APPS_SCRIPT_URL =
  (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined) ??
  "https://script.google.com/macros/s/AKfycbxD6nX5pip7sovRvmxsr1scgExtf4uHclyNfNuuiobgII_tr3A_aeQCOAAK1h__UgRR/exec";

export type OrderPayload = {
  nom: string;
  telephone: string;
  ville: string;
  produit: string;
  taille: string;
  quantite: number | string;
  prix: number | string;
  source?: string;
};

export type CreateOrderResult = {
  success: true;
  orderNumber: string;
  status: string;
};

export type PriceInfo = {
  price: string;
  originalPrice: string;
  stock: string;
  available: boolean;
};

export const ORDER_STATUSES = [
  "Commande confirmée",
  "En préparation",
  "Expédiée",
  "En cours de livraison",
  "Livrée",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type TrackOrderResult =
  | { found: true; orderNumber: string; status: OrderStatus | string; raw: Record<string, unknown> }
  | { found: false };

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

async function requestJson(input: RequestInfo, init?: RequestInit): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(input, init);
  } catch (err) {
    throw new NetworkError(err instanceof Error ? err.message : "Network request failed");
  }
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${text || res.statusText}`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid response format from Apps Script");
  }
}

/** POST a new order. Returns the generated order number. */
export async function createOrder(payload: OrderPayload): Promise<CreateOrderResult> {
  const body = { ...payload, source: payload.source ?? "Landing Page" };
  const data = (await requestJson(APPS_SCRIPT_URL, {
    method: "POST",
    redirect: "follow",
    // text/plain avoids CORS preflight against Apps Script.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
  })) as Record<string, unknown>;

  if (!data || data.success !== true) {
    const msg = typeof data?.message === "string" ? (data.message as string) : "Order was not accepted";
    throw new Error(msg);
  }
  return {
    success: true,
    orderNumber: String(data.orderNumber ?? ""),
    status: String(data.status ?? "Commande confirmée"),
  };
}

/** GET current pricing/stock for the landing page. */
export async function getPrice(): Promise<PriceInfo> {
  const url = `${APPS_SCRIPT_URL}?action=getPrice&t=${Date.now()}`;
  const data = (await requestJson(url, { method: "GET", redirect: "follow", cache: "no-store" })) as Record<
    string,
    unknown
  >;
  const cur = data.Prix ?? data.prix ?? data.price;
  const old = data.AncienPrix ?? data.ancienPrix ?? data.oldPrice;
  const stock = data.Stock ?? data.stock;
  const disp = data.Disponible ?? data.disponible ?? data.available;
  const clean = (v: unknown) => String(v ?? "").replace(/[^\d.]/g, "") || String(v ?? "");
  return {
    price: clean(cur),
    originalPrice: clean(old),
    stock: stock === undefined || stock === null ? "" : String(stock),
    available: disp === undefined || disp === null ? true : String(disp).toLowerCase() !== "non",
  };
}

/** GET the status for a single order. */
export async function trackOrder(orderNumber: string): Promise<TrackOrderResult> {
  const trimmed = orderNumber.trim();
  if (!trimmed) return { found: false };
  const url = `${APPS_SCRIPT_URL}?action=trackOrder&orderNumber=${encodeURIComponent(trimmed)}`;
  const data = (await requestJson(url, { method: "GET", redirect: "follow", cache: "no-store" })) as Record<
    string,
    unknown
  >;
  const found = data.success === true || data.found === true || !!(data.status ?? data.Statut);
  if (!found) return { found: false };
  const status = String(data.status ?? data.Statut ?? "Commande confirmée");
  return {
    found: true,
    orderNumber: String(data.orderNumber ?? data.NumCommande ?? trimmed),
    status,
    raw: data,
  };
}