import { MobileNav } from "./mobile-nav"
import { DesktopNav } from "./desktop-nav"

export const Navigation = () => {
    return (
        <>
            <span className="md:hidden"><MobileNav /></span>
            <span className="hidden md:flex"><DesktopNav /></span>
        </>
    )
}