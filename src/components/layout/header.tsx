"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Navigation } from "@/components/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!isHome) return;
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    const active = !isHome || scrolled;

    return (
        <header className={`fixed top-0 z-50 flex items-center justify-end w-full py-4 px-4 md:px-8 transition-all duration-1000 ${active ? "backdrop-blur-lg bg-background border-b-2 border-b-primary border-border/40" : "bg-transparent border-b border-transparent"}`}>
            <Navigation/>
            <Logo
                size={active ? 'compact' : 'default'}
                border={active ? 'bottom' : 'none'}
                className={cn(
                    "absolute left-1/2 -translate-x-1/2",
                    active ? "top-2" : "top-5"
                )}
            />
        </header>
    );
};
