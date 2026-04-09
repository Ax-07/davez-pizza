import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { navigation_pages } from "./config";

export const MobileNav: React.FC<React.ComponentProps<"nav">> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const handleClose = () => {
    setTimeout(() => {
        setIsOpen(false);
    }, 100);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} aria-describedby="mobile-menu">
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Ouvrir le menu" onClick={() => setIsOpen(true)}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto pt-24 z-100 px-6" aria-describedby="mobile-menu">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" onClick={handleClose} className="flex">
                <Logo className="mx-auto"/>
            </Link>
          </SheetTitle>

        </SheetHeader>
        <nav className="flex flex-col items-center space-y-6" id="mobile-menu">
            {Object.values(navigation_pages).map((page) => (
                <Link
                    key={page.name}
                    href={page.href}
                    aria-current={pathname === page.href ? "page" : undefined}
                    className={cn(
                        "text-lg font-semibold transition-colors hover:text-primary",
                        pathname === page.href ? "text-primary" : "text-foreground"
                    )}
                    onClick={handleClose}
                >
                    {page.name}
                </Link>
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
