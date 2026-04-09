import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Italianno, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Analytics } from "@vercel/analytics/next";
import { BUSINESS } from "@/data/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const italianno = Italianno({
  variable: "--font-italiano",
  subsets: ["latin"],
  weight: "400",
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const OG_IMAGE = {
  url: "/salle-davez-pizza.jpeg",
  width: 1200,
  height: 630,
  alt: "Davez Pizza — Pizzeria artisanale à Davézieux",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://davezpizza.fr"),
  title: {
    default: "Davez Pizza — Pizzeria artisanale à Davézieux",
    template: "%s | Davez Pizza",
  },
  description:
    "Davez Pizza, votre pizzeria artisanale. Pâte maison, produits frais, cuites au feu de bois. Sur place, à emporter ou en livraison.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Davez Pizza",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Davez Pizza — Pizzeria artisanale à Davézieux",
    description:
      "Davez Pizza, votre pizzeria artisanale. Pâte maison, produits frais, cuites au feu de bois.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://davezpizza.fr",
    telephone: BUSINESS.phone.replace(/\s/g, ""),
    email: BUSINESS.email,
    servesCuisine: "Pizza",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: "FR",
    },
    sameAs: [BUSINESS.social.instagram, BUSINESS.social.facebook],
    hasMenu: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://davezpizza.fr"}/menu`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://davezpizza.fr"}/salle-davez-pizza.jpeg`,
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${italianno.variable} ${robotoSerif.variable} antialiased font-roboto-serif`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <Header />
            {children}
            <Footer />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
