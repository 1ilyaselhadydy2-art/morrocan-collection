import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import logoAsset from "@/assets/haydar-logo.png.asset.json";
import heroVideo from "@/assets/haydar-hero.mp4.asset.json";
import heroImage from "@/assets/haydar-hero.jpg.asset.json";
import detailImage from "@/assets/haydar-detail.jpg.asset.json";
import embroideryImage from "@/assets/haydar-embroidery.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const gallery = [
  { src: heroImage.url, alt: "Haydar waistcoat worn in the medina of Essaouira" },
  { src: detailImage.url, alt: "Green star and sfifa braiding detail" },
  { src: embroideryImage.url, alt: "Maroc 2026 golden trophy embroidery" },
];

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxiAxFgpNYfW0xZS2W6UML-VE8to4xBzCvryxehoqrQHz23iB4c2jwxC9w-t0W2t33m/exec";
const PRODUCT_NAME = "Haydar Maroc 2026 Waistcoat";
const PRODUCT_PRICE = "189";
const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = ["Burgundy", "Green", "Black", "White"];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function OrderForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [qty, setQty] = useState(1);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = new URLSearchParams({
      Date: new Date().toISOString(),
      Nom: String(fd.get("nom") ?? ""),
      Téléphone: String(fd.get("telephone") ?? ""),
      Ville: String(fd.get("ville") ?? ""),
      Produit: String(fd.get("produit") ?? PRODUCT_NAME),
      Taille: String(fd.get("taille") ?? ""),
      Couleur: String(fd.get("couleur") ?? ""),
      Quantité: String(fd.get("quantite") ?? "1"),
      Prix: PRODUCT_PRICE,
      Source: typeof window !== "undefined" ? window.location.href : "web",
    });
    setStatus("sending");
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      window.fbq?.("track", "Lead", { content_name: PRODUCT_NAME, value: Number(PRODUCT_PRICE) * Number(fd.get("quantite") ?? 1), currency: "USD" });
      setStatus("ok");
      form.reset();
      setQty(1);
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full bg-white/10 border border-white/30 px-5 py-3.5 text-sm placeholder:text-white/50 focus:outline-none focus:border-[oklch(0.72_0.14_75)] text-white";
  const label = "text-xs tracking-[0.2em] uppercase text-white/70 mb-2 block text-left";

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto grid gap-5 text-left">
      <div>
        <label className={label}>Nom complet</label>
        <input name="nom" required className={field} placeholder="Votre nom" />
      </div>
      <div>
        <label className={label}>Téléphone (WhatsApp)</label>
        <input name="telephone" required type="tel" inputMode="tel" className={field} placeholder="+212 6 00 00 00 00" />
      </div>
      <div>
        <label className={label}>Ville</label>
        <input name="ville" required className={field} placeholder="Casablanca" />
      </div>
      <div>
        <label className={label}>Produit</label>
        <input name="produit" readOnly defaultValue={PRODUCT_NAME} className={field} />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={label}>Taille</label>
          <select name="taille" required defaultValue="" className={field}>
            <option value="" disabled className="text-black">Choisir</option>
            {SIZES.map((s) => <option key={s} value={s} className="text-black">{s}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Couleur</label>
          <select name="couleur" required defaultValue="" className={field}>
            <option value="" disabled className="text-black">Choisir</option>
            {COLORS.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label}>Quantité</label>
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
        {status === "sending" ? "Envoi..." : "Commander maintenant"}
      </button>
      {status === "ok" && <p className="text-center text-sm text-[oklch(0.85_0.15_145)]">Merci ! Votre commande a été enregistrée. Nous vous contactons sur WhatsApp.</p>}
      {status === "error" && <p className="text-center text-sm text-red-300">Une erreur est survenue. Réessayez.</p>}
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 md:px-16">
        <img src={logoAsset.url} alt="Haydar" className="h-20 md:h-28 brightness-0 invert" />
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase text-white/80">
          <a href="#collection" className="hover:text-white transition">Collection</a>
          <a href="#heritage" className="hover:text-white transition">Heritage</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <a href="#collection" className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-5 py-2.5 hover:bg-white hover:text-[oklch(0.38_0.14_20)] transition">Shop</a>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen grid md:grid-cols-2" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex flex-col justify-center px-8 md:px-16 py-32 text-white relative z-10">
          <span className="text-xs tracking-[0.4em] uppercase text-fabric mb-6">Moroccan Craftsmanship · Est. Handmade</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">
            Where Tradition<br/>Meets <em className="text-fabric not-italic">Elegance</em>
          </h1>
          <p className="text-lg text-white/80 max-w-md mb-10 leading-relaxed">
            The official Moroccan team waistcoat for the FIFA World Cup 2026. Woven in Fès with centuries old artistry, embroidered with the green star and the Maroc 2026 trophy.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#collection" className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition font-medium">Discover the Vest</a>
            <a href="#heritage" className="border border-white/50 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white/10 transition">Our Story</a>
          </div>
          <div className="flex items-center gap-8 mt-16 text-xs tracking-widest uppercase text-white/60">
            <span>Handwoven</span><span className="w-px h-4 bg-white/30" /><span>Fès, Morocco</span><span className="w-px h-4 bg-white/30" /><span>Limited Run</span>
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
            <span className="text-[oklch(0.55_0.18_145)]">★</span> Signature Star Edition
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      <section id="collection" className="py-24 md:py-32 px-8 md:px-16 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.55_0.16_40)] mb-4 block">The Signature Piece</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">The Maroc 2026 Waistcoat</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cut from densely woven wool in a deep marrakchi burgundy, the Haydar waistcoat celebrates the Moroccan team at the FIFA World Cup 2026. Trimmed with hand braided sfifa in emerald green, the chest bears the national star while the hem carries the golden Maroc 2026 trophy.
            </p>
            <dl className="grid grid-cols-2 gap-6 mb-10 border-t border-border pt-8">
              <div><dt className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Fabric</dt><dd className="font-serif text-lg">Wool blend</dd></div>
              <div><dt className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Embroidery</dt><dd className="font-serif text-lg">Silk thread</dd></div>
              <div><dt className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Origin</dt><dd className="font-serif text-lg">Fès, Morocco</dd></div>
              <div><dt className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Made</dt><dd className="font-serif text-lg">By hand</dd></div>
            </dl>
            <div className="flex items-baseline gap-6 mb-6">
              <span className="font-serif text-4xl text-[oklch(0.38_0.14_20)]">$189</span>
              <span className="text-sm text-muted-foreground">Free worldwide shipping</span>
            </div>
            <a href="#contact" className="inline-block bg-[oklch(0.38_0.14_20)] text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-[oklch(0.28_0.10_25)] transition" style={{ boxShadow: "var(--shadow-elegant)" }}>Reserve Yours</a>
          </div>
          <div className="order-1 md:order-2">
            <AutoCarousel />
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section id="heritage" className="py-24 md:py-32 px-8 md:px-16 bg-[oklch(0.94_0.02_75)]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.55_0.16_40)] mb-4 block">Heritage</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Woven in the medinas of Fès</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
            Every Haydar piece begins in a small atelier where three generations of tailors have preserved the sfifa braiding technique. We work with them directly, no middlemen, no shortcuts.
          </p>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              { n: "01", t: "Hand-woven", d: "Traditional looms operated by master weavers with decades of practice." },
              { n: "02", t: "Naturally dyed", d: "Deep burgundies pulled from madder root; greens from mint and pomegranate." },
              { n: "03", t: "Star embroidered", d: "The five point star and the Maroc 2026 trophy stitched by hand, the mark of a finished Haydar." },
            ].map((s) => (
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
        <img src={logoAsset.url} alt="Haydar" className="h-28 md:h-36 mx-auto mb-8 brightness-0 invert" />
        <h2 className="font-serif text-4xl md:text-6xl max-w-3xl mx-auto mb-6 leading-tight">Wear a piece of Morocco.</h2>
        <p className="text-white/70 max-w-xl mx-auto mb-10">Limited quantities. Each vest is numbered and shipped from Fès within seven days.</p>
        <OrderForm />
      </section>

      <footer className="py-10 px-8 md:px-16 bg-[oklch(0.22_0.03_40)] text-white/60 text-xs tracking-widest uppercase flex flex-col md:flex-row justify-between gap-4">
        <span>© Haydar · Fès, Morocco</span>
        <span>Where Tradition Meets Elegance</span>
      </footer>
    </div>
  );
}
