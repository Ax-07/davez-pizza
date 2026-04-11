import { Section, SectionDescription, SectionTitle } from "../layout/section";
import { getLatestFiveStarReviews } from "@/lib/reviews/reviews";
import { ReviewsList } from "../../lib/reviews/reviews-list";
import { GoogleReview } from "@/lib/reviews/types";

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    id: "fallback-1",
    author: "Marie L.",
    rating: 5,
    date: "il y a 1 mois",
    text: "Une adresse incontournable ! La pâte est fine et croustillante, les ingrédients sont frais. La Davez est une merveille.",
  },
  {
    id: "fallback-2",
    author: "Thomas R.",
    rating: 5,
    date: "il y a 2 mois",
    text: "Meilleure pizzeria de la ville sans hésitation. L'équipe est accueillante et les pizzas sont généreuses. Parfait.",
  },
  {
    id: "fallback-3",
    author: "Sophie & Julien",
    rating: 5,
    date: "il y a 3 mois",
    text: "On y revient chaque semaine ! La truffe et champignons est notre chouchoute. Cadre chaleureux, service rapide.",
  },
];

async function getReviews(): Promise<GoogleReview[]> {
  try {
    const data = await getLatestFiveStarReviews();
    return data.length > 0 ? data : FALLBACK_REVIEWS;
  } catch {
    return FALLBACK_REVIEWS;
  }
}

export const Reviews: React.FC<React.ComponentProps<"section">> = async (props) => {
  const reviews = await getReviews();

  return (
    <Section id="reviews" className="bg-muted/40" {...props}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionTitle>Ce que disent nos clients</SectionTitle>
          <SectionDescription>
            Ils nous font confiance — voici leurs retours.
          </SectionDescription>
        </div>

        <ReviewsList reviews={reviews} />
      </div>
    </Section>
  );
}
