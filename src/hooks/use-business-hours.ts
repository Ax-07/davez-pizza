"use client";

import { useMemo } from "react";
import { SCHEDULE, SUMMER_PERIOD, getCurrentSeason, type BusinessHour, type DaySlot } from "@/data/config";

const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function getOpenStatus(schedule: BusinessHour[]): { open: boolean; label: string } {
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

export function useBusinessHours() {
  const season = getCurrentSeason();
  const hours = SCHEDULE[season];
  const seasonLabel = season === "summer"
    ? `Été (${SUMMER_PERIOD.start.replace("-", "/")} – ${SUMMER_PERIOD.end.replace("-", "/")})`
    : "Hiver";
  const todayName = DAY_NAMES[new Date().getDay()];
  const status = useMemo(() => getOpenStatus(hours), [hours]);

  return { season, hours, seasonLabel, todayName, status };
}
