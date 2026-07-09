import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import logoAsset from "@/assets/haydar-logo.png.asset.json";
import heroVideo from "@/assets/haydar-hero.mp4.asset.json";
import heroImage from "@/assets/haydar-hero.jpg.asset.json";
import detailImage from "@/assets/haydar-detail.jpg.asset.json";
import embroideryImage from "@/assets/haydar-embroidery.jpg.asset.json";
import fabricTexture from "@/assets/moroccan-fabric-texture.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const gallery = [
  { src: heroImage.url, alt: "Haydar waistcoat worn in the medina of Essaouira" },
  { src: detailImage.url, alt: "Green star and sfifa braiding detail" },
  { src: embroideryImage.url, alt: "Maroc 2026 golden trophy embroidery" },
];

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx8j6jt7jrFrvAJnrOGh8S3UN12JkHow-XrMzeDa7TRWG1TiIWDlbHpFed91qVOcW8f/exec";
const PRODUCT_NAME = "Haydar Maroc 2026 Waistcoat";
const PRODUCT_PRICE = "69";
const PRODUCT_PRICE_ORIGINAL = "189";
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

function OrderForm({ lang }: { lang: Lang }) {
  const t = T[lang].form;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [qty, setQty] = useState(1);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      nom: String(fd.get("nom") ?? ""),
      telephone: String(fd.get("telephone") ?? ""),
      ville: String(fd.get("ville") ?? ""),
      produit: PRODUCT_NAME,
      taille: String(fd.get("taille") ?? ""),
      quantite: Number(fd.get("quantite") ?? 1),
      prix: PRODUCT_PRICE,
      source: typeof window !== "undefined" ? window.location.href : "web",
    };
    setStatus("sending");
    setErrorMsg("");
    console.log("[OrderForm] Envoi vers Apps Script:", APPS_SCRIPT_URL, payload);
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      console.log("[OrderForm] Réponse HTTP:", res.status, res.statusText);
      const text = await res.text();
      console.log("[OrderForm] Corps de la réponse:", text);
      if (!res.ok) throw new Error(`HTTP ${res.status} — ${text || res.statusText}`);
      window.fbq?.("track", "Lead", {
        content_name: PRODUCT_NAME,
        value: Number(PRODUCT_PRICE) * Number(fd.get("quantite") ?? 1),
        currency: "USD",
      });
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

  const field = "w-full bg-white/10 border border-white/30 px-5 py-3.5 text-sm placeholder:text-white/50 focus:outline-none focus:border-[oklch(0.72_0.14_75)] text-white";
  const label = "text-xs tracking-[0.2em] uppercase text-white/70 mb-2 block text-left";

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
        disabled={status === "sending"}
        className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition font-medium disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
      {status === "ok" && <p className="text-center text-sm text-[oklch(0.85_0.15_145)]">{t.ok}</p>}
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

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 md:px-16">
        <img src={logoAsset.url} alt="Haydar" className="h-32 md:h-44 brightness-0 invert" />
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase text-white/80">
          <a href="#collection" className="hover:text-white transition">{t.nav.collection}</a>
          <a href="#heritage" className="hover:text-white transition">{t.nav.heritage}</a>
          <a href="#contact" className="hover:text-white transition">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-xs tracking-[0.2em] uppercase text-white/80">
            <button onClick={() => setLang("fr")} aria-label="Français" className={`px-2 py-1 transition ${lang === "fr" ? "text-white font-medium" : "text-white/50 hover:text-white"}`}>FR</button>
            <span className="text-white/30">|</span>
            <button onClick={() => setLang("en")} aria-label="English" className={`px-2 py-1 transition ${lang === "en" ? "text-white font-medium" : "text-white/50 hover:text-white"}`}>EN</button>
          </div>
          <a href="#collection" className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-5 py-2.5 hover:bg-white hover:text-[oklch(0.38_0.14_20)] transition">{t.nav.shop}</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen grid md:grid-cols-2" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex flex-col justify-center px-8 md:px-16 py-32 text-white relative z-10">
          {/* Moroccan fabric texture overlay — left side only, fades toward center */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              backgroundImage: `url(${fabricTexture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.13,
              WebkitMaskImage: "linear-gradient(to right, black 0%, black 45%, transparent 95%)",
              maskImage: "linear-gradient(to right, black 0%, black 45%, transparent 95%)",
            }}
          />
          <div className="relative z-10">
            <span className="text-xs tracking-[0.4em] uppercase text-fabric mb-6 block">{t.hero.eyebrow}</span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">
              {t.hero.title1}<br/>{t.hero.title2}<em className="text-fabric not-italic">{t.hero.titleEm}</em>
            </h1>
            <p className="text-lg text-white/80 max-w-md mb-10 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#collection" className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition font-medium">{t.hero.cta1}</a>
              <a href="#heritage" className="border border-white/50 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white/10 transition">{t.hero.cta2}</a>
            </div>
            <div className="flex items-center gap-8 mt-16 text-xs tracking-widest uppercase text-white/60">
              <span>{t.hero.tags[0]}</span><span className="w-px h-4 bg-white/30" /><span>{t.hero.tags[1]}</span><span className="w-px h-4 bg-white/30" /><span>{t.hero.tags[2]}</span>
            </div>
          </div>
        </div>
        <div className="relative min-h-[60vh] md:min-h-screen">
          <video
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.38_0.14_20)] via-transparent to-transparent md:from-[oklch(0.38_0.14_20)]/60" />
          <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur px-6 py-4 text-xs tracking-widest uppercase text-[oklch(0.22_0.03_40)] shadow-2xl">
            <span className="text-[oklch(0.55_0.18_145)]">★</span> {t.hero.badge}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      <section id="collection" className="py-24 md:py-32 px-8 md:px-16 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.55_0.16_40)] mb-4 block">{t.product.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">{t.product.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t.product.desc}
            </p>
            <dl className="grid grid-cols-2 gap-6 mb-10 border-t border-border pt-8">
              {t.product.specs.map((s) => (
                <div key={s.k}><dt className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{s.k}</dt><dd className="font-serif text-lg">{s.v}</dd></div>
              ))}
            </dl>
            <div className="flex items-baseline gap-4 mb-6 flex-wrap">
              <span className="font-serif text-6xl md:text-7xl font-bold text-[oklch(0.38_0.14_20)]">${PRODUCT_PRICE}</span>
              <span className="font-serif text-2xl text-muted-foreground line-through">${PRODUCT_PRICE_ORIGINAL}</span>
              <span className="text-sm text-muted-foreground w-full md:w-auto">{t.product.shipping}</span>
            </div>
            <a href="#contact" className="inline-block bg-[oklch(0.38_0.14_20)] text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-[oklch(0.28_0.10_25)] transition" style={{ boxShadow: "var(--shadow-elegant)" }}>{t.product.reserve}</a>
          </div>
          <div className="order-1 md:order-2">
            <AutoCarousel />
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section id="heritage" className="py-24 md:py-32 px-8 md:px-16 bg-[oklch(0.94_0.02_75)]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.55_0.16_40)] mb-4 block">{t.heritage.eyebrow}</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">{t.heritage.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
            {t.heritage.desc}
          </p>
          <div className="grid md:grid-cols-3 gap-12 text-left">
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
      <section id="contact" className="py-24 md:py-32 px-8 md:px-16 text-white text-center" style={{ background: "var(--gradient-hero)" }}>
        <img src={logoAsset.url} alt="Haydar" className="h-44 md:h-56 mx-auto mb-8 brightness-0 invert" />
        <h2 className="font-serif text-4xl md:text-6xl max-w-3xl mx-auto mb-6 leading-tight">{t.cta.title}</h2>
        <p className="text-white/70 max-w-xl mx-auto mb-10">{t.cta.desc}</p>
        <OrderForm lang={lang} />
      </section>

      <footer className="py-10 px-8 md:px-16 bg-[oklch(0.22_0.03_40)] text-white/60 text-xs tracking-widest uppercase flex flex-col md:flex-row justify-between gap-4">
        <span>{t.footer.left}</span>
        <span>{t.footer.right}</span>
      </footer>
    </div>
  );
}
