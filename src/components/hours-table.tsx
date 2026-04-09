import { type BusinessHour, type DaySlot } from "@/data/config";
import { cn } from "@/lib/utils";
import { useBusinessHours } from "@/hooks/use-business-hours";

function SlotCell({ slot }: { slot: DaySlot }) {
  if ("closed" in slot)
    return <span className="text-muted-foreground/50 italic text-xs">—</span>;
  return (
    <span className="tabular-nums text-sm font-extralight whitespace-nowrap">
      {slot.open}&nbsp;–&nbsp;{slot.close}
    </span>
  );
}

export function HoursTable({ hours }: { hours: BusinessHour[] }) {
  const { todayName } = useBusinessHours();

  return (
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
  );
}
