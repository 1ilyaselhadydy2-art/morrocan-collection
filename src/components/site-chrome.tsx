import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Mail, Phone, MessageCircle, MapPin, ChevronRight, ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import logoAsset from "@/assets/haydar-logo.png.asset.json";

export const PHONE = "+212700591954";
export const PHONE_DISPLAY = "+212 700 591 954";
export const EMAIL = "sipport.haydar@gmail.com";
export const WHATSAPP = "212700591954";
export const SOCIALS = {
  instagram: "https://www.instagram.com/haydar.elegance?igsh=czF2b3pkZ2R2cTY3",
  facebook: "https://www.facebook.com/share/195STzgA1h/",
  tiktok: "https://www.tiktok.com/@haydar.elegance6",
  linkedin: "https://www.linkedin.com/",
};

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.6 6.3a5.6 5.6 0 0 1-3.5-1.3 5.6 5.6 0 0 1-2-3.5h-3.4v13.1a2.9 2.9 0 1 1-2-2.7V8.4a6.3 6.3 0 1 0 5.4 6.2V9.3a8.9 8.9 0 0 0 5.5 1.9V7.8c-.1 0 0-1.5 0-1.5z" />
    </svg>
  );
}

export function SubpageHeader() {
  return (
    <header className="sticky top-0 z-30 bg-[oklch(0.22_0.03_40)]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-16 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Haydar" className="h-12 sm:h-14 md:h-16 brightness-0 invert" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/80 border border-white/30 px-4 py-2 min-h-[44px] hover:bg-white hover:text-[oklch(0.38_0.14_20)] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Accueil
        </Link>
      </div>
    </header>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section
      className="relative text-white px-6 sm:px-8 md:px-16 py-20 md:py-28 text-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_45%)]" />
      <div className="relative max-w-3xl mx-auto animate-fade-in">
        {eyebrow && (
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[oklch(0.85_0.15_75)] block mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight">{title}</h1>
        {description && <p className="mt-5 text-white/80 text-base md:text-lg leading-relaxed">{description}</p>}
      </div>
    </section>
  );
}

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-6 sm:px-8 md:px-16 py-5 text-xs sm:text-sm text-muted-foreground">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link to="/" className="hover:text-[oklch(0.38_0.14_20)] transition">Accueil</Link>
        </li>
        <ChevronRight className="w-3.5 h-3.5" />
        <li className="text-foreground font-medium">{current}</li>
      </ol>
    </nav>
  );
}

export function ContactCta() {
  return (
    <section className="px-6 sm:px-8 md:px-16 py-16 md:py-24 text-center text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Une question ?</h2>
        <p className="text-white/75 mb-8">Notre équipe est à votre disposition et vous répond sous 24 heures.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/contact"
            className="bg-[oklch(0.72_0.14_75)] text-[oklch(0.22_0.03_40)] px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-white transition font-medium"
          >
            Contactez-nous
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/50 text-white px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-white/10 transition inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function BackHome() {
  return (
    <div className="text-center py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 border border-[oklch(0.38_0.14_20)] text-[oklch(0.38_0.14_20)] px-6 py-3 min-h-[44px] text-sm tracking-widest uppercase hover:bg-[oklch(0.38_0.14_20)] hover:text-white transition rounded-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SubpageHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socialLink =
    "grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40 transition-colors";
  const linkCls = "text-white/60 hover:text-white transition-colors";

  return (
    <footer className="bg-[oklch(0.18_0.025_40)] text-white/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 py-14 md:py-20">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <img src={logoAsset.url} alt="Haydar" className="h-16 mb-5 brightness-0 invert" />
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Là où la tradition rencontre l'élégance. Gilets marocains faits main, expédiés du Maroc dans le monde entier.
            </p>
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
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 text-[11px] tracking-widest uppercase text-white/50">
              <span>✓ Paiement sécurisé</span>
              <span>✓ Livraison rapide</span>
              <span>✓ Support client</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-5">Contact</h4>
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
                <span className="text-white/60">Maroc</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-5">Service Client</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className={linkCls}>Nous contacter</Link></li>
              <li><Link to="/track" className={linkCls}>Suivi de commande</Link></li>
              <li><Link to="/size-guide" className={linkCls}>Guide des tailles</Link></li>
              <li><Link to="/faq" className={linkCls}>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-5">Informations Légales</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className={linkCls}>Politique de confidentialité</Link></li>
              <li><Link to="/terms" className={linkCls}>Conditions générales</Link></li>
              <li><Link to="/shipping" className={linkCls}>Politique d'expédition</Link></li>
              <li><Link to="/returns" className={linkCls}>Politique de retour</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50 tracking-wide">
          <span>© {year} HAYDAR. Tous droits réservés.</span>
          <span>Conçu et fabriqué au Maroc.</span>
        </div>
      </div>
    </footer>
  );
}