import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { PageShell, PageHero, Breadcrumbs, BackHome, PHONE, PHONE_DISPLAY, EMAIL, WHATSAPP } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contactez-nous — HAYDAR" },
      { name: "description", content: "Contactez l'équipe HAYDAR par téléphone, WhatsApp ou email. Réponse sous 24 heures." },
      { property: "og:title", content: "Contactez-nous — HAYDAR" },
      { property: "og:description", content: "Notre équipe est à votre disposition pour toutes vos questions." },
    ],
    links: [{ rel: "canonical", href: "https://morrocan-collection.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const infos = [
    { icon: Phone, title: "Téléphone", value: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: MessageCircle, title: "WhatsApp", value: PHONE_DISPLAY, href: `https://wa.me/${WHATSAPP}` },
    { icon: Mail, title: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Clock, title: "Horaires", value: "Lun - Sam · 09:00 - 19:00" },
  ];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
  }

  const field =
    "w-full bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.38_0.14_20)] focus:ring-2 focus:ring-[oklch(0.72_0.14_75)]/30 transition";
  const label = "text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block";

  return (
    <PageShell>
      <PageHero
        eyebrow="Support"
        title="Contactez-nous"
        description="Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos produits, votre commande ou votre livraison."
      />
      <Breadcrumbs current="Contact" />

      <section className="max-w-5xl mx-auto px-6 sm:px-8 md:px-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infos.map((info) => {
            const Icon = info.icon;
            const content = (
              <div className="h-full rounded-xl border border-border bg-card p-6 text-center hover-scale transition-shadow hover:shadow-lg">
                <div className="mx-auto w-12 h-12 rounded-full grid place-items-center bg-[oklch(0.38_0.14_20)]/10 text-[oklch(0.38_0.14_20)] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{info.title}</p>
                <p className="font-serif text-lg text-foreground">{info.value}</p>
              </div>
            );
            return info.href ? (
              <a key={info.title} href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={info.title}>{content}</div>
            );
          })}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Temps de réponse&nbsp;: nous répondons généralement sous 24 heures.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 sm:px-8 md:px-16 pb-16">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-center">Envoyez-nous un message</h2>
          {sent ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="mx-auto w-14 h-14 rounded-full bg-[oklch(0.55_0.18_145)]/15 text-[oklch(0.45_0.18_145)] grid place-items-center mb-4 text-2xl">✓</div>
              <h3 className="font-serif text-2xl mb-2">Merci !</h3>
              <p className="text-muted-foreground">
                Votre message a été envoyé avec succès.<br />Notre équipe vous répondra dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <div>
                <label className={label}>Nom complet</label>
                <input required name="name" className={field} placeholder="Votre nom" />
              </div>
              <div>
                <label className={label}>Adresse e-mail</label>
                <input required type="email" name="email" className={field} placeholder="vous@exemple.com" />
              </div>
              <div>
                <label className={label}>Téléphone</label>
                <input required type="tel" name="phone" className={field} placeholder="+212 6 00 00 00 00" />
              </div>
              <div>
                <label className={label}>Sujet</label>
                <input required name="subject" className={field} placeholder="Sujet de votre message" />
              </div>
              <div>
                <label className={label}>Message</label>
                <textarea required name="message" rows={5} className={field} placeholder="Votre message..." />
              </div>
              <button
                type="submit"
                className="bg-[oklch(0.38_0.14_20)] text-white px-8 py-4 min-h-[48px] text-sm tracking-widest uppercase hover:bg-[oklch(0.28_0.10_25)] transition rounded-sm"
              >
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </section>

      <BackHome />
    </PageShell>
  );
}