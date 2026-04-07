import Link from "next/link";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { navigation_pages } from "@/components/navigation/config";
import { BUSINESS } from "@/data/config";

export const Footer = () => {
    return (
        <footer className="border-t bg-background">
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Identité */}
                <div className="flex flex-col gap-4">
                    <Logo />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Pizzeria artisanale. Pâte maison, produits frais,<br />
                        cuite au feu de bois.
                    </p>
                    <div className="flex gap-3">
                        <a
                            href={BUSINESS.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram Davez Pizza"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Instagram className="size-5" />
                        </a>
                        <a
                            href={BUSINESS.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook Davez Pizza"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Facebook className="size-5" />
                        </a>
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold mb-4">Navigation</h3>
                    <ul className="space-y-2">
                        {Object.values(navigation_pages).map((page) => (
                            <li key={page.href}>
                                <Link
                                    href={page.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {page.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <address className="not-italic space-y-3">
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="size-4 mt-0.5 shrink-0" />
                            <span>
                                {BUSINESS.address.street}<br />
                                {BUSINESS.address.postalCode} {BUSINESS.address.city}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="size-4 shrink-0" />
                            <a
                                href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                                className="hover:text-foreground transition-colors"
                            >
                                {BUSINESS.phone}
                            </a>
                        </div>
                    </address>
                </div>
            </div>

            <div className="border-t py-4 text-center text-xs text-muted-foreground">
                <p>
                    &copy; {new Date().getFullYear()} {BUSINESS.name}. Tous droits réservés.{" "}
                    <Link href="/legal" className="underline underline-offset-4 hover:text-foreground transition-colors">
                        Mentions légales
                    </Link>
                </p>
            </div>
        </footer>
    );
};