export const dynamic = "force-dynamic";

import { Hero } from "@/components/blocks/hero";
import { Specialties } from "@/components/blocks/specialties";
import { PromoBanner } from "@/components/blocks/promo-banner";
import { HoursAddress } from "@/components/blocks/hours-address";
import { Reviews } from "@/components/blocks/reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <Specialties />
      <PromoBanner />
      <HoursAddress />
      <Reviews />
    </main>
  );
}
