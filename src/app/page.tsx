import { Hero } from "@/components/blocks/hero";
// import { Specialties } from "@/components/blocks/specialties";
// import { PromoBanner } from "@/components/blocks/promo-banner";
import { HoursAddress } from "@/components/blocks/hours-address";
import { Reviews } from "@/components/blocks/reviews";
import { About } from "@/components/blocks/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      {/* <Specialties /> */}
      {/* <PromoBanner /> */}
      <HoursAddress />
      <Reviews />
    </main>
  );
}
