"use client";

import { useIsMobile } from "@/hooks/use-mobile"
import { MobileNav } from "./mobile-nav"
import { DesktopNav } from "./desktop-nav"

export const Navigation = () => {
    const isMobile = useIsMobile()

    return (
        <>
            {isMobile === undefined ? null : isMobile ? <MobileNav /> : <DesktopNav />}
        </>
    )
}