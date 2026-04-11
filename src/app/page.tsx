import { Hero } from "@/components/blocks/hero";
// import { Specialties } from "@/components/blocks/specialties";
// import { PromoBanner } from "@/components/blocks/promo-banner";
import { HoursAddress } from "@/components/blocks/hours-address";
import { Reviews } from "@/components/blocks/reviews";
import { About } from "@/components/blocks/about";
import { StickyMenuCta } from "@/components/ui/sticky-menu-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <StickyMenuCta />
      <About/>
      {/* <Specialties /> */}
      {/* <PromoBanner /> */}
      <HoursAddress />
      <Reviews />
    </main>
  );
}
