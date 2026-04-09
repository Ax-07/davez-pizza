import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation_pages } from "./config";
import { cn } from "@/lib/utils";

export const DesktopNav: React.FC<React.ComponentProps<'nav'>> = (props) => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between py-4 ml-8 space-x-4" {...props}>
            {Object.values(navigation_pages).map((page) => (
                <Link
                    key={page.name}
                    href={page.href}
                    aria-current={pathname === page.href ? "page" : undefined}
                    className={cn(
                        "text-lg font-semibold transition-colors hover:text-primary",
                        pathname === page.href ? "text-primary" : "text-foreground"
                    )}
                >
                    {page.name}
                </Link>
            ))}
        </nav>
    );
}