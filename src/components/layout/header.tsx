"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Navigation } from "@/components/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ui/theme-toggle";
import { m } from "motion/react";

export const Header: React.FC<React.ComponentProps<"header">> = ({ className, ...props }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const active = !isHome || scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex items-center justify-end w-full py-4 px-4 md:px-8 transition-all duration-1000",
        active
          ? "backdrop-blur-lg bg-background border-b-2 border-b-primary"
          : "bg-transparent border-b border-transparent",
        className,
      )}
      {...props}
    >
      <ThemeToggle />
      <Navigation />
      <m.div
        className={cn("absolute left-1/2 -translate-x-1/2", active ? "top-2" : "top-5")}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Logo size={active ? "compact" : "default"} border={active ? "bottom" : "none"} />
      </m.div>
    </header>
  );
};
