import Link from "next/link";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { BUSINESS } from "@/data/config";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="flex flex-col gap-4 items-center justify-center max-w-6xl mx-auto px-4 py-12">
        <address className="flex items-center justify-center gap-6">
          <div className="flex items-start gap-2 text-sm text-muted-foreground mt-8">
            <MapPin className="size-4 mt-0.5 shrink-0" />
            <span>
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.postalCode} {BUSINESS.address.city}
            </span>
          </div>
          <Logo size={"compact"} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-8">
            <Phone className="size-4 shrink-0" />
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`} className="hover:text-foreground transition-colors">
              {BUSINESS.phone}
            </a>
          </div>
        </address>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          Pizzeria artisanale. Pâte maison, produits frais,
          <br />
          cuite au feu de bois.
        </p>
        <div className="flex gap-3">
          <Link
            href={BUSINESS.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Davez Pizza"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="size-5" />
          </Link>
          <Link
            href={BUSINESS.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Davez Pizza"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Facebook className="size-5" />
          </Link>
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

{
  /* Contact */
}
{
  /* <div>
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
                </div> */
}
