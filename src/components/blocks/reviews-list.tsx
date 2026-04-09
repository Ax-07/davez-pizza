"use client";

import { Star } from "lucide-react";
import { m } from "motion/react";
import type { GoogleReview } from "@/app/api/reviews/route";

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

export function ReviewsList({ reviews }: { reviews: GoogleReview[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {reviews.slice(0, 3).map((review, index) => (
        <m.article
          key={review.id}
          className="rounded-2xl border bg-card p-6 flex flex-col gap-4 shadow-sm"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{review.author}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
              Google
            </span>
          </div>
          <StarRating rating={review.rating} />
          <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
            &ldquo;{review.text}&rdquo;
          </blockquote>
        </m.article>
      ))}
    </div>
  );
}
