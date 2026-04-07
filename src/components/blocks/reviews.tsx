import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    author: "Marie L.",
    rating: 5,
    date: "Mars 2026",
    text: "Une adresse incontournable ! La pâte est fine et croustillante, les ingrédients sont frais. La Davez est une merveille.",
    source: "Google",
  },
  {
    id: 2,
    author: "Thomas R.",
    rating: 5,
    date: "Février 2026",
    text: "Meilleure pizzeria de la ville sans hésitation. L'équipe est accueillante et les pizzas sont généreux. Parfait.",
    source: "TripAdvisor",
  },
  {
    id: 3,
    author: "Sophie & Julien",
    rating: 5,
    date: "Janvier 2026",
    text: "On y revient chaque semaine ! La truffe et champignons est notre chouchoute. Cadre chaleureux, service rapide.",
    source: "Google",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Ce que disent nos clients
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ils nous font confiance — voici leurs retours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border bg-card p-6 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                  {review.source}
                </span>
              </div>
              <StarRating rating={review.rating} />
              <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
