import Link from "next/link";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BUSINESS, SCHEDULE, getCurrentSeason, SUMMER_PERIOD, type DaySlot } from "@/data/config";
import { cn } from "@/lib/utils";

function SlotLabel({ slot }: { slot: DaySlot }) {
  if ("closed" in slot) return null;
  return <span>{slot.open} – {slot.close}</span>;
}

export function HoursAddress() {
  const season = getCurrentSeason();
  const hours = SCHEDULE[season];
  const seasonLabel = season === "summer"
    ? `d\u2019été (${SUMMER_PERIOD.start.replace("-", "/")} – ${SUMMER_PERIOD.end.replace("-", "/")})`
    : `d\u2019hiver`;

  return (
    <section className="w-full py-20 px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Horaires & accès
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche : horaires + contact */}
          <div className="flex flex-col gap-10">
            {/* Horaires */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Clock className="size-6 text-primary" />
                <h3 className="text-2xl font-semibold">Horaires d&apos;ouverture</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6 ml-9">
                Horaires {seasonLabel}
              </p>
              <ul className="space-y-2">
                {hours.map((h) => {
                  const morningClosed = "closed" in h.morning;
                  const eveningClosed = "closed" in h.evening;
                  const allClosed = morningClosed && eveningClosed;
                  return (
                    <li
                      key={h.day}
                      className="grid grid-cols-[1fr_auto] gap-4 py-2 border-b border-border last:border-0"
                    >
                      <span className={cn("font-medium", allClosed && "text-muted-foreground")}>{h.day}</span>
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

            {/* Téléphone */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="size-6 text-primary" />
                <h3 className="text-2xl font-semibold">Nous appeler</h3>
              </div>
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto"
                )}
              >
                {BUSINESS.phone}
              </a>
            </div>

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full sm:w-auto text-center"
              )}
            >
              Nous contacter
            </Link>
          </div>

          {/* Colonne droite : carte + adresse */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="size-6 text-primary" />
                <h3 className="text-2xl font-semibold">Nous trouver</h3>
              </div>
              <address className="not-italic text-muted-foreground leading-relaxed mb-4">
                {BUSINESS.address.street}<br />
                {BUSINESS.address.postalCode} {BUSINESS.address.city}
              </address>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border aspect-video shadow-sm">
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

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS.name}, ${BUSINESS.address.street}, ${BUSINESS.address.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "self-start text-muted-foreground gap-1.5"
              )}
            >
              <ExternalLink className="size-4" />
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

