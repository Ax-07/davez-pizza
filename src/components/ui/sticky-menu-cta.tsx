"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const StickyMenuCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile : barre pleine largeur en bas */}
      <button
        aria-hidden={!visible}
        className={cn(
          "fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 md:hidden transition-all duration-300",
          visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <Link
          href="/menu"
          className={cn(buttonVariants({ size: "lg" }), "w-full p-2 text-lg rounded-none shadow-lg shadow-black/30")}
        >
          Voir la carte
        </Link>
      </button>

      {/* Desktop : onglet vertical ancré au centre droit */}
      <button
        aria-hidden={!visible}
        className={cn(
          "fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex transition-all duration-300",
          visible ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-4 pointer-events-none"
        )}
      >
        <Link
          href="/menu"
          className={cn(
            buttonVariants({ size: "default" }),
            "rotate-180 h-auto p-6 rounded-none rounded-r-lg shadow-lg shadow-black/30 text-sm tracking-widest uppercase"
          )}
          style={{ writingMode: "vertical-rl" }}
        >
          Voir la carte
        </Link>
      </button>
    </>
  );
};
