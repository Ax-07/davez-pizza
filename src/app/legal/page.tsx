import type { Metadata } from "next";
import { Main } from "@/components/layout/main";
import { BUSINESS } from "@/data/config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Davez Pizza.",
};

export default function LegalPage() {
  return (
    <Main className="block">
      <div className="max-w-3xl mx-auto w-full px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Mentions légales</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Éditeur du site</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>{BUSINESS.name}</strong><br />
            {BUSINESS.address.street}<br />
            {BUSINESS.address.postalCode} {BUSINESS.address.city}<br />
            Téléphone : {BUSINESS.phone}<br />
            Email : {BUSINESS.email}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Hébergement</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, États-Unis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Propriété intellectuelle</h2>
          <p className="text-muted-foreground leading-relaxed">
            L&apos;ensemble des contenus présents sur ce site (textes, images,
            graphismes, logo) sont la propriété exclusive de {BUSINESS.name} et
            sont protégés par le droit d&apos;auteur. Toute reproduction est
            interdite sans autorisation préalable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Données personnelles (RGPD)</h2>
          <p className="text-muted-foreground leading-relaxed">
            Les données collectées via le formulaire de contact (nom, email,
            téléphone, message) sont utilisées uniquement pour répondre à votre
            demande. Elles ne sont jamais cédées à des tiers. Conformément au
            RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
            de suppression en nous contactant à{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ce site utilise uniquement des cookies techniques essentiels au bon
            fonctionnement du site (thème clair/sombre). Aucun cookie de
            traçage publicitaire n&apos;est utilisé.
          </p>
        </section>

        <p className="text-xs text-muted-foreground mt-10">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </Main>
  );
}
