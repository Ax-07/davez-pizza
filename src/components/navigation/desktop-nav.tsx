import Link from "next/link";
import { navigation_pages } from "./config";

export const DesktopNav: React.FC<React.ComponentProps<'nav'>> = (props) => {
    return (
        <nav className="flex items-center justify-between py-4 ml-8 space-x-4" {...props}>
            {Object.values(navigation_pages).map((page) => (
                <Link key={page.name} href={page.href} className="text-lg font-semibold">
                    {page.name}
                </Link>
            ))}
        </nav>
    );
}