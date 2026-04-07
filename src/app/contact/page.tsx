export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { Main } from "@/components/layout/main";
import { ContactForm } from "@/components/blocks/contact-form";
import { BUSINESS, SCHEDULE, getCurrentSeason, SUMMER_PERIOD, type DaySlot } from "@/data/config";

function SlotLabel({ slot }: { slot: DaySlot }) {
  if ("closed" in slot) return null;
  return <span>{slot.open} – {slot.close}</span>;
}

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Davez Pizza — formulaire de contact, adresse, téléphone et horaires d'ouverture.",
};

export default function ContactPage() {
  const season = getCurrentSeason();
  const hours = SCHEDULE[season];
  const seasonLabel = season === "summer"
    ? `d\u2019été (${SUMMER_PERIOD.start.replace("-", "/")} – ${SUMMER_PERIOD.end.replace("-", "/")})`
    : `d\u2019hiver`;

  return (
    <Main className="block py-0">
      <section className="bg-muted/40 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Contact & accès
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Une question ? Une réservation ? N&apos;hésitez pas à nous écrire ou nous appeler.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulaire */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Nous écrire</h2>
            <ContactForm />
          </div>

          {/* Infos pratiques */}
          <div className="flex flex-col gap-10">
            {/* Horaires */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Clock className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Horaires</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-6 ml-9">
                Horaires {seasonLabel}
              </p>
              <ul className="space-y-3">
                {hours.map((h) => {
                  const morningClosed = "closed" in h.morning;
                  const eveningClosed = "closed" in h.evening;
                  const allClosed = morningClosed && eveningClosed;
                  return (
                    <li
                      key={h.day}
                      className="grid grid-cols-[1fr_auto] gap-4 py-2 border-b border-border last:border-0"
                    >
                      <span className="font-medium">{h.day}</span>
                      {allClosed ? (
                        <span className="text-muted-foreground text-sm">Fermé</span>
                      ) : (
                        <div className="text-right text-sm text-muted-foreground space-y-0.5">
                          {!morningClosed && <SlotLabel slot={h.morning} />}
                          {!eveningClosed && <SlotLabel slot={h.evening} />}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Adresse */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Adresse</h2>
              </div>
              <address className="not-italic text-muted-foreground leading-relaxed mb-4">
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.postalCode} {BUSINESS.address.city}
              </address>
              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden border aspect-video">
                <iframe
                  src={BUSINESS.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte Google Maps – Davez Pizza"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Téléphone</h2>
              </div>
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                className="text-2xl font-semibold hover:text-primary transition-colors"
              >
                {BUSINESS.phone}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">
                Disponible pendant les heures d&apos;ouverture
              </p>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}
