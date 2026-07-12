import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Mail, Phone, MessageCircle, MapPin, Copy, Check } from "lucide-react";
import { PromoPopup } from "@/components/promo-popup";
import logoUrl from "@/assets/haydar-logo.png";
import heroVideoUrl from "@/assets/haydar-hero.mp4";
import heroImageUrl from "@/assets/haydar-hero.jpg";
import detailImageUrl from "@/assets/haydar-detail.jpg";
import embroideryImageUrl from "@/assets/haydar-embroidery.jpg";
import fabricTexture from "@/assets/moroccan-fabric-texture.jpg";
import { createOrder, getPrice } from "@/services/googleSheet";

export const Route = createFileRoute("/")({
  component: Index,
});

const gallery = [
  { src: heroImageUrl, alt: "Haydar waistcoat worn in the medina of Essaouira" },
  { src: detailImageUrl, alt: "Green star and sfifa braiding detail" },
  { src: embroideryImageUrl, alt: "Maroc 2026 golden trophy embroidery" },
];

const PRODUCT_NAME = "Haydar Maroc 2026 Waistcoat";
const DEFAULT_PRICE = "69";
const DEFAULT_PRICE_ORIGINAL = "189";
const SIZES = ["S", "M", "L", "XL", "XXL"];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Lang = "en" | "fr";

const T = {
  en: {
    nav: { collection: "Collection", heritage: "Heritage", contact: "Contact", shop: "Shop" },
    hero: {
      eyebrow: "Moroccan Craftsmanship · Est. Handmade",
      title1: "Where Tradition",
      title2: "Meets ",
      titleEm: "Elegance",
      desc: "The official Moroccan team waistcoat for the FIFA World Cup 2026. Woven in Morocco with centuries old artistry, embroidered with the green star and the Maroc 2026 trophy.",
      cta1: "Discover the Vest",
      cta2: "Our Story",
      tags: ["Handwoven", "Morocco", "Limited Run"],
      badge: "Signature Star Edition",
    },
    product: {
      eyebrow: "The Signature Piece",
      title: "The Maroc 2026 Waistcoat",
      desc: "Cut from densely woven wool in a deep marrakchi burgundy, the Haydar waistcoat celebrates the Moroccan team at the FIFA World Cup 2026. Trimmed with hand braided sfifa in emerald green, the chest bears the national star while the hem carries the golden Maroc 2026 trophy.",
      specs: [
        { k: "Fabric", v: "Wool blend" },
        { k: "Embroidery", v: "Silk thread" },
        { k: "Origin", v: "Morocco" },
        { k: "Made", v: "By hand" },
      ],
      shipping: "Worldwide shipping",
      reserve: "Reserve Yours",
    },
    heritage: {
      eyebrow: "Heritage",
      title: "Woven in the medinas of Morocco",
      desc: "Every Haydar piece begins in a small atelier where three generations of tailors have preserved the sfifa braiding technique. We work with them directly, no middlemen, no shortcuts.",
      steps: [
        { n: "01", t: "Hand-woven", d: "Traditional looms operated by master weavers with decades of practice." },
        { n: "02", t: "Naturally dyed", d: "Deep burgundies pulled from madder root; greens from mint and pomegranate." },
        { n: "03", t: "Star embroidered", d: "The five point star and the Maroc 2026 trophy stitched by hand, the mark of a finished Haydar." },
      ],
    },
    cta: {
      title: "Wear a piece of Morocco.",
      desc: "Limited quantities. Each vest is numbered and shipped from Morocco within seven days.",
    },
    form: {
      name: "Full name",
      namePh: "Your name",
      phone: "Phone (WhatsApp)",
      city: "City",
      cityPh: "Casablanca",
      product: "Product",
      size: "Size",
      choose: "Choose",
      qty: "Quantity",
      submit: "Order now",
      sending: "Sending...",
      ok: "Thank you! Your order has been recorded. We will contact you on WhatsApp.",
      err: "Error",
      errTail: "Please try again.",
    },
    footer: { left: "© Haydar · Morocco", right: "Where Tradition Meets Elegance" },
  },
  fr: {
    nav: { collection: "Collection", heritage: "Héritage", contact: "Contact", shop: "Boutique" },
    hero: {
      eyebrow: "Artisanat Marocain · Fait Main",
      title1: "Là où la Tradition",
      title2: "Rencontre l'",
      titleEm: "Élégance",
      desc: "Le gilet officiel de l'équipe marocaine pour la Coupe du Monde FIFA 2026. Tissé au Maroc avec un art séculaire, brodé de l'étoile verte et du trophée Maroc 2026.",
      cta1: "Découvrir le Gilet",
      cta2: "Notre Histoire",
      tags: ["Tissé main", "Maroc", "Édition limitée"],
      badge: "Édition Étoile Signature",
    },
    product: {
      eyebrow: "La Pièce Signature",
      title: "Le Gilet Maroc 2026",
      desc: "Coupé dans une laine densément tissée d'un bordeaux marrakchi profond, le gilet Haydar célèbre l'équipe marocaine à la Coupe du Monde FIFA 2026. Orné de sfifa tressée à la main en vert émeraude, la poitrine porte l'étoile nationale tandis que l'ourlet arbore le trophée doré Maroc 2026.",
      specs: [
        { k: "Tissu", v: "Laine mélangée" },
        { k: "Broderie", v: "Fil de soie" },
        { k: "Origine", v: "Maroc" },
        { k: "Fabrication", v: "À la main" },
      ],
      shipping: "Livraison mondiale",
      reserve: "Réservez le vôtre",
    },
    heritage: {
      eyebrow: "Héritage",
      title: "Tissé dans les médinas du Maroc",
      desc: "Chaque pièce Haydar naît dans un petit atelier où trois générations de tailleurs ont préservé la technique du tressage sfifa. Nous travaillons directement avec eux, sans intermédiaires, sans raccourcis.",
      steps: [
        { n: "01", t: "Tissé main", d: "Métiers traditionnels opérés par des maîtres tisserands avec des décennies de pratique." },
        { n: "02", t: "Teinture naturelle", d: "Bordeaux profonds tirés de la racine de garance ; verts de la menthe et de la grenade." },
        { n: "03", t: "Étoile brodée", d: "L'étoile à cinq branches et le trophée Maroc 2026 cousus à la main, la marque d'un Haydar achevé." },
      ],
    },
    cta: {
      title: "Portez un morceau du Maroc.",
      desc: "Quantités limitées. Chaque gilet est numéroté et expédié du Maroc sous sept jours.",
    },
    form: {
      name: "Nom complet",
      namePh: "Votre nom",
      phone: "Téléphone (WhatsApp)",
      city: "Ville",
      cityPh: "Casablanca",
      product: "Produit",
      size: "Taille",
      choose: "Choisir",
      qty: "Quantité",
      submit: "Commander maintenant",
      sending: "Envoi...",
      ok: "Merci ! Votre commande a été enregistrée. Nous vous contactons sur WhatsApp.",
      err: "Erreur",
      errTail: "Réessayez.",
    },
    footer: { left: "© Haydar · Maroc", right: "Là où la Tradition Rencontre l'Élégance" },
  },
} as const;

function OrderForm({ lang, price, available, soldOutLabel }: { lang: Lang; price: string; available: boolean; soldOutLabel: string }) {
  const t = T[lang].form;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const quantite = Number(fd.get("quantite") ?? 1);
    const payload = {
      nom: String(fd.get("nom") ?? ""),
      telephone: String(fd.get("telephone") ?? ""),
      ville: String(fd.get("ville") ?? ""),
      produit: PRODUCT_NAME,
      taille: String(fd.get("taille") ?? ""),
      quantite,
      prix: price,
      source: "Landing Page",
    };
    setStatus("sending");
    setErrorMsg("");
    try {
      const result = await createOrder(payload);
      window.fbq?.("track", "Lead", {
        content_name: PRODUCT_NAME,
        value: Number(price) * quantite,
        currency: "USD",
      });
      setOrderNumber(result.orderNumber);
      setStatus("ok");
      form.reset();
      setQty(1);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[OrderForm] Échec envoi:", err);
      setErrorMsg(message);
      setStatus("error");
    }
  }

  async function copyOrderNumber() {
    if (!orderNumber) return;
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const field = "w-full bg-white/10 border border-white/30 px-5 py-3.5 text-sm placeholder:text-white/50 focus:outline-none focus:border-[oklch(0.72_0.14_75)] text-white";
  const label = "text-xs tracking-[0.2em] uppercase text-white/70 mb-2 block text-left";

  if (status === "ok" && orderNumber) {
    const isFr = lang === "fr";
    return (
      <div className="max-w-xl mx-auto text-center animate-fade-in">
        <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur px-6 sm:px-10 py-10">
          <div className="mx-auto mb-5 grid place-items-center w-14 h-14 rounded-full bg-[oklch(0.55_0.18_145)]/20 border border-[oklch(0.55_0.18_145)]/40">
            <Check className="w-7 h-7 text-[oklch(0.85_0.15_145)]" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl mb-3">{isFr ? "Commande confirmée !" : "Order confirmed!"}</h3>
          <p className="text-white/80 text-sm sm:text-base mb-6">
            {isFr
              ? "Conservez précieusement votre numéro de commande — vous en aurez besoin pour suivre l'expédition."
              : "Please save your order number — you will need it to track your shipment."}
          </p>
          <div className="mx-auto max-w-sm">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">
              {isFr ? "Numéro de commande" : "Order number"}
            </div>
            <div className="flex items-stretch gap-2">
              <div className="flex-1 font-serif text-xl sm:text-2xl bg-white/10 border border-white/30 px-4 py-3 rounded-sm select-all">
                {orderNumber}
              </div>
              <button
                type="button"
                onClick={copyOrderNumber}
                aria-label={isFr ? "Copier" : "Copy"}
                className="grid place-items-center px-4 border border-white/30 hover:bg-white/10 rounded-sm text-white transition"
              >
                {copied ? <Check className="w-5 h-5 text-[oklch(0.85_0.15_145)]" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-[oklch(0.85_0.15_145)] mt-2">{isFr ? "Copié !" : "Copied!"}</p>
            )}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/track"
              className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-6 py-3 text-sm tracking-widest uppercase hover:bg-white transition font-medium rounded-sm"
            >
              {isFr ? "Suivre ma commande" : "Track my order"}
            </Link>
            <button
              type="button"
              onClick={() => {
                setOrderNumber("");
                setStatus("idle");
              }}
              className="border border-white/40 text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-white/10 transition rounded-sm"
            >
              {isFr ? "Nouvelle commande" : "New order"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto grid gap-5 text-left">
      <div>
        <label className={label}>{t.name}</label>
        <input name="nom" required className={field} placeholder={t.namePh} />
      </div>
      <div>
        <label className={label}>{t.phone}</label>
        <input name="telephone" required type="tel" inputMode="tel" className={field} placeholder="+212 6 00 00 00 00" />
      </div>
      <div>
        <label className={label}>{t.city}</label>
        <input name="ville" required className={field} placeholder={t.cityPh} />
      </div>
      <div>
        <label className={label}>{t.product}</label>
        <input name="produit" readOnly defaultValue={PRODUCT_NAME} className={field} />
      </div>
      <div>
        <label className={label}>{t.size}</label>
        <select name="taille" required defaultValue="" className={field}>
          <option value="" disabled className="text-black">{t.choose}</option>
          {SIZES.map((s) => <option key={s} value={s} className="text-black">{s}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>{t.qty}</label>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-12 h-12 border border-white/30 text-white text-lg hover:bg-white/10">−</button>
          <input name="quantite" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className={`${field} text-center flex-1`} />
          <button type="button" onClick={() => setQty((q) => q + 1)} className="w-12 h-12 border border-white/30 text-white text-lg hover:bg-white/10">+</button>
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending" || !available}
        className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition font-medium disabled:opacity-60"
      >
        {!available ? soldOutLabel : status === "sending" ? t.sending : t.submit}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-red-300">
          {t.err}: {errorMsg || t.err}. {t.errTail}
        </p>
      )}
    </form>
  );
}

function AutoCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % gallery.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-[oklch(0.94_0.02_75)] -z-10" />
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {gallery.map((g, idx) => (
          <img
            key={g.src}
            src={g.src}
            alt={g.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show image ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-white" : "w-4 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
  const [price, setPrice] = useState<string>(DEFAULT_PRICE);
  const [originalPrice, setOriginalPrice] = useState<string>(DEFAULT_PRICE_ORIGINAL);
  const [available, setAvailable] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${PRICING_API_URL}?t=${Date.now()}`, {
          method: "GET",
          redirect: "follow",
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const cur = data.Prix ?? data.prix ?? data.price ?? data.PrixActuel;
        const old = data.AncienPrix ?? data.ancienPrix ?? data.oldPrice ?? data.PrixBarre;
        const disp = data.Disponible ?? data.disponible ?? data.available;
        if (cur !== undefined && cur !== null && String(cur).trim() !== "") setPrice(String(cur).replace(/[^\d.]/g, "") || String(cur));
        if (old !== undefined && old !== null && String(old).trim() !== "") setOriginalPrice(String(old).replace(/[^\d.]/g, "") || String(old));
        if (disp !== undefined && disp !== null) setAvailable(String(disp).toLowerCase() !== "non");
      } catch (err) {
        console.error("[Pricing] Fetch failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const soldOutLabel = lang === "fr" ? "Rupture de stock" : "Sold out";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-16 py-3 md:py-6 gap-2">
        <img src={logoUrl} alt="Haydar" className="h-20 sm:h-28 md:h-44 brightness-0 invert" />
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase text-white/80">
          <a href="#collection" className="hover:text-white transition">{t.nav.collection}</a>
          <a href="#heritage" className="hover:text-white transition">{t.nav.heritage}</a>
          <a href="#contact" className="hover:text-white transition">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center text-xs tracking-[0.2em] uppercase text-white/80">
            <button onClick={() => setLang("fr")} aria-label="Français" className={`px-2 py-2 min-h-[44px] transition ${lang === "fr" ? "text-white font-medium" : "text-white/50 hover:text-white"}`}>FR</button>
            <span className="text-white/30">|</span>
            <button onClick={() => setLang("en")} aria-label="English" className={`px-2 py-2 min-h-[44px] transition ${lang === "en" ? "text-white font-medium" : "text-white/50 hover:text-white"}`}>EN</button>
          </div>
          <a href="#collection" className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-5 py-2.5 hover:bg-white hover:text-[oklch(0.38_0.14_20)] transition">{t.nav.shop}</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen md:grid md:grid-cols-2" style={{ background: "var(--gradient-hero)" }}>
        {/* Mobile: full-bleed video background */}
        <div className="md:hidden absolute inset-0 z-0">
          <video
            src={heroVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.03_40)]/70 via-[oklch(0.22_0.03_40)]/55 to-[oklch(0.22_0.03_40)]/85" />
        </div>
        <div className="flex flex-col justify-center px-6 sm:px-8 md:px-16 pt-32 pb-20 md:py-32 text-white relative z-10 min-h-screen md:min-h-0">
          {/* Moroccan fabric texture overlay — left side only, fades toward center */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-0 hidden md:block"
            style={{
              backgroundImage: `url(${fabricTexture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.13,
              WebkitMaskImage: "linear-gradient(to right, black 0%, black 45%, transparent 95%)",
              maskImage: "linear-gradient(to right, black 0%, black 45%, transparent 95%)",
            }}
          />
          <div className="relative z-10 text-center md:text-left">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-fabric mb-5 md:mb-6 block">{t.hero.eyebrow}</span>
            <h1 className="font-serif text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl md:leading-[1.05] mb-6 md:mb-8">
              {t.hero.title1}<br/>{t.hero.title2}<em className="text-fabric not-italic">{t.hero.titleEm}</em>
            </h1>
            <p className="text-base md:text-lg text-white/85 max-w-md mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <a href="#contact" className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-white transition font-medium text-center">{t.hero.cta1}</a>
              <a href="#heritage" className="border border-white/50 text-white px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-white/10 transition text-center">{t.hero.cta2}</a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-8 mt-10 md:mt-16 text-[10px] sm:text-xs tracking-widest uppercase text-white/70">
              <span>{t.hero.tags[0]}</span><span className="w-px h-4 bg-white/30" /><span>{t.hero.tags[1]}</span><span className="w-px h-4 bg-white/30" /><span>{t.hero.tags[2]}</span>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block md:min-h-screen">
          <video
            src={heroVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.38_0.14_20)] via-transparent to-transparent md:from-[oklch(0.38_0.14_20)]/60" />
          <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur px-6 py-4 text-xs tracking-widest uppercase text-[oklch(0.22_0.03_40)] shadow-2xl">
            <span className="text-[oklch(0.55_0.18_145)]">★</span> {t.hero.badge}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      <section id="collection" className="py-16 md:py-32 px-6 sm:px-8 md:px-16 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.55_0.16_40)] mb-4 block">{t.product.eyebrow}</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">{t.product.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t.product.desc}
            </p>
            <dl className="grid grid-cols-2 gap-6 mb-10 border-t border-border pt-8">
              {t.product.specs.map((s) => (
                <div key={s.k}><dt className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{s.k}</dt><dd className="font-serif text-lg">{s.v}</dd></div>
              ))}
            </dl>
            <div className="flex items-baseline gap-4 mb-6 flex-wrap">
              <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[oklch(0.38_0.14_20)]">${price}</span>
              <span className="font-serif text-2xl text-muted-foreground line-through">${originalPrice}</span>
              <span className="text-sm text-muted-foreground w-full md:w-auto">{t.product.shipping}</span>
            </div>
            {available ? (
              <a href="#contact" className="inline-block bg-[oklch(0.38_0.14_20)] text-white px-10 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-[oklch(0.28_0.10_25)] transition" style={{ boxShadow: "var(--shadow-elegant)" }}>{t.product.reserve}</a>
            ) : (
              <button type="button" disabled className="inline-block bg-[oklch(0.38_0.14_20)] text-white px-10 py-4 min-h-[48px] text-sm tracking-widest uppercase opacity-60 cursor-not-allowed">{soldOutLabel}</button>
            )}
          </div>
          <div className="order-1 md:order-2">
            <AutoCarousel />
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section id="heritage" className="py-16 md:py-32 px-6 sm:px-8 md:px-16 bg-[oklch(0.94_0.02_75)]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.55_0.16_40)] mb-4 block">{t.heritage.eyebrow}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 leading-tight">{t.heritage.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16">
            {t.heritage.desc}
          </p>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 text-left">
            {t.heritage.steps.map((s) => (
              <div key={s.n} className="border-t border-[oklch(0.72_0.14_75)] pt-6">
                <span className="text-[oklch(0.72_0.14_75)] font-serif text-2xl">{s.n}</span>
                <h3 className="font-serif text-2xl mt-3 mb-3">{s.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="py-16 md:py-32 px-6 sm:px-8 md:px-16 text-white text-center" style={{ background: "var(--gradient-hero)" }}>
        <img src={logoUrl} alt="Haydar" className="h-32 sm:h-40 md:h-56 mx-auto mb-6 md:mb-8 brightness-0 invert" />
        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl max-w-3xl mx-auto mb-4 md:mb-6 leading-tight">{t.cta.title}</h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8 md:mb-10">{t.cta.desc}</p>
        <OrderForm lang={lang} price={price} available={available} soldOutLabel={soldOutLabel} />
      </section>

      <SiteFooter lang={lang} />
      <PromoPopup />
    </div>
  );
}

const PHONE = "+212700591954";
const PHONE_DISPLAY = "+212 700 591 954";
const EMAIL = "contact@haydar.com";
const WHATSAPP = "212700591954";
const SOCIALS = {
  instagram: "https://www.instagram.com/haydar.elegance?igsh=czF2b3pkZ2R2cTY3",
  facebook: "https://www.facebook.com/share/195STzgA1h/",
  tiktok: "https://www.tiktok.com/@haydar.elegance6",
  linkedin: "https://www.linkedin.com/",
};

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.6 6.3a5.6 5.6 0 0 1-3.5-1.3 5.6 5.6 0 0 1-2-3.5h-3.4v13.1a2.9 2.9 0 1 1-2-2.7V8.4a6.3 6.3 0 1 0 5.4 6.2V9.3a8.9 8.9 0 0 0 5.5 1.9V7.8c-.1 0 0-1.5 0-1.5z" />
    </svg>
  );
}

function SiteFooter({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const isFr = lang === "fr";
  const L = isFr
    ? {
        tagline: "Là où la tradition rencontre l'élégance. Gilets marocains faits main, expédiés du Maroc dans le monde entier.",
        contact: "Contact",
        follow: "Suivez-nous",
        service: "Service Client",
        legal: "Informations Légales",
        shipping: "Politique d'expédition",
        returns: "Politique de retour",
        privacy: "Politique de confidentialité",
        terms: "Conditions générales",
        faq: "FAQ",
        sizes: "Guide des tailles",
        track: "Suivi de commande",
        support: "Nous contacter",
        rights: "Tous droits réservés.",
        made: "Conçu et fabriqué au Maroc.",
      }
    : {
        tagline: "Where tradition meets elegance. Handcrafted Moroccan waistcoats, shipped worldwide from Morocco.",
        contact: "Contact",
        follow: "Follow Us",
        service: "Customer Service",
        legal: "Legal",
        shipping: "Shipping Policy",
        returns: "Return Policy",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        faq: "FAQ",
        sizes: "Size Guide",
        track: "Track Order",
        support: "Contact Support",
        rights: "All rights reserved.",
        made: "Designed and crafted in Morocco.",
      };

  const socialLink =
    "grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40 transition-colors";
  const linkCls = "text-white/60 hover:text-white transition-colors";

  return (
    <footer className="bg-[oklch(0.18_0.025_40)] text-white/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 py-14 md:py-20">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logoUrl} alt="Haydar" className="h-16 mb-5 brightness-0 invert" />
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">{L.tagline}</p>
            <div className="flex items-center gap-3 mt-6">
              <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialLink}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialLink}>
                <Facebook className="w-4 h-4" />
              </a>
              <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={socialLink}>
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialLink}>
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={socialLink}>
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">{L.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                <a href={`tel:${PHONE}`} className={linkCls}>{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                <a href={`mailto:${EMAIL}`} className={linkCls}>{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                <span className="text-white/60">Morocco</span>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">{L.service}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className={linkCls}>{L.support}</Link></li>
              <li><Link to="/track" className={linkCls}>{L.track}</Link></li>
              <li><Link to="/size-guide" className={linkCls}>{L.sizes}</Link></li>
              <li><Link to="/faq" className={linkCls}>{L.faq}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">{L.legal}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className={linkCls}>{L.privacy}</Link></li>
              <li><Link to="/terms" className={linkCls}>{L.terms}</Link></li>
              <li><Link to="/shipping" className={linkCls}>{L.shipping}</Link></li>
              <li><Link to="/returns" className={linkCls}>{L.returns}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50 tracking-wide">
          <span>© {year} HAYDAR. {L.rights}</span>
          <span>{L.made}</span>
        </div>
      </div>
    </footer>
  );
}
