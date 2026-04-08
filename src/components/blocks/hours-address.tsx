"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BUSINESS, SCHEDULE, getCurrentSeason, SUMMER_PERIOD, type DaySlot } from "@/data/config";
import { cn } from "@/lib/utils";
import { Parallax, ParallaxContent, ParallaxImage } from "../ui/parallax";
import devantureDavezPizza from "@/assets/devanture_davez_pizza.jpeg";

const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function getOpenStatus(schedule: typeof SCHEDULE[keyof typeof SCHEDULE]): { open: boolean; label: string } {
  const now = new Date();
  const todayName = DAY_NAMES[now.getDay()];
  const todayEntry = schedule.find((h) => h.day === todayName);
  if (!todayEntry) return { open: false, label: "Fermé" };

  const hhmm = now.getHours() * 60 + now.getMinutes();

  function inSlot(slot: DaySlot): boolean {
    if ("closed" in slot) return false;
    const [oh, om] = slot.open.replace("h", ":").split(":").map(Number);
    const [ch, cm] = slot.close.replace("h", ":").split(":").map(Number);
    return hhmm >= oh * 60 + om && hhmm < ch * 60 + cm;
  }

  if (inSlot(todayEntry.morning) || inSlot(todayEntry.evening)) {
    return { open: true, label: "Ouvert maintenant" };
  }
  return { open: false, label: "Fermé" };
}

function SlotCell({ slot }: { slot: DaySlot }) {
  if ("closed" in slot)
    return <span className="text-muted-foreground/50 italic text-xs">—</span>;
  return (
    <span className="tabular-nums text-sm font-extralight whitespace-nowrap">
      {slot.open}&nbsp;–&nbsp;{slot.close}
    </span>
  );
}

export function HoursAddress() {
  const season = getCurrentSeason();
  const hours = SCHEDULE[season];
  const seasonLabel = season === "summer"
    ? `Été (${SUMMER_PERIOD.start.replace("-", "/")} – ${SUMMER_PERIOD.end.replace("-", "/")})`
    : "Hiver";

  const [status, todayName] = useMemo(() => [
    getOpenStatus(hours),
    DAY_NAMES[new Date().getDay()],
  ], [hours]);

  return (
    <Parallax size="full" className="w-full">
      <ParallaxImage>
        <Image
          src={devantureDavezPizza}
          alt="Devanture Davez Pizza"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/65" />
      </ParallaxImage>

      <ParallaxContent className="flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-20">

        {/* En-tête */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Horaires &amp; accès
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
              status.open
                ? "bg-green-500/15 text-green-600 dark:text-green-400"
                : "bg-muted text-muted-foreground"
            )}>
              <span className={cn(
                "size-2 rounded-full",
                status.open ? "bg-green-500 animate-pulse" : "bg-muted-foreground/50"
              )} />
              {status.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl items-start">

          {/* Colonne gauche : horaires + contact */}
          <div className="h-full rounded-2xl border bg-background/80 backdrop-blur-md p-6 md:p-8 flex flex-col gap-8 shadow-lg">

            {/* Horaires */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-5 text-primary" />
                  <h3 className="text-xl font-semibold">Horaires d&apos;ouverture</h3>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {seasonLabel}
                </span>
              </div>

              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-muted-foreground/60">
                    <th className="text-left font-medium pb-2 pl-3 w-[40%]">Jour</th>
                    <th className="text-center font-medium pb-2 w-[30%]">Midi</th>
                    <th className="text-center font-medium pb-2 pr-3 w-[30%]">Soir</th>
                  </tr>
                </thead>
                <tbody>
                  {hours.map((h) => {
                    const allClosed = "closed" in h.morning && "closed" in h.evening;
                    const isToday = h.day === todayName;
                    return (
                      <tr
                        key={h.day}
                        className={cn(
                          "border-b border-border/50 last:border-0 transition-colors",
                          isToday && "bg-primary/8"
                        )}
                      >
                        <td className={cn(
                          "py-2.5 pl-3 font-medium",
                          allClosed && "text-muted-foreground",
                          isToday && "text-primary font-semibold"
                        )}>
                          {h.day}
                        </td>
                        <td className="py-2.5 text-center">
                          <SlotCell slot={h.morning} />
                        </td>
                        <td className="py-2.5 pr-3 text-center">
                          <SlotCell slot={h.evening} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Separator />

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Phone className="size-5 text-primary" />
                <h3 className="text-xl font-semibold">Nous appeler</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1 sm:flex-none")}
                >
                  {BUSINESS.phone}
                </a>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }), "flex-1 sm:flex-none gap-2")}
                >
                  <MessageCircle className="size-4" />
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>

          {/* Colonne droite : carte + adresse */}
          <div className="h-full rounded-2xl border bg-background/80 backdrop-blur-md p-6 md:p-8 flex flex-col gap-6 shadow-lg">
            <div className="flex items-center gap-2.5">
              <MapPin className="size-5 text-primary" />
              <h3 className="text-xl font-semibold">Nous trouver</h3>
            </div>

            <address className="not-italic text-muted-foreground leading-relaxed text-sm">
              {BUSINESS.address.street}<br />
              {BUSINESS.address.postalCode} {BUSINESS.address.city}
            </address>

            {/* Google Maps embed */}
            <div className="rounded-xl overflow-hidden border aspect-video shadow-sm">
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
                "self-start text-muted-foreground gap-1.5 -ml-2"
              )}
            >
              <ExternalLink className="size-4" />
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>

      </ParallaxContent>
    </Parallax>
  );
}

