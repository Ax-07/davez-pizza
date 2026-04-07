import type { Metadata } from "next";
import { Geist, Geist_Mono, Italianno, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

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
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Davez Pizza — Pizzeria artisanale à Bordeaux",
    template: "%s | Davez Pizza",
  },
  description:
    "Davez Pizza, votre pizzeria artisanale. Pâte maison, produits frais, cuites au feu de bois. Sur place, à emporter ou en livraison.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Davez Pizza",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${italianno.variable} ${robotoSerif.variable} antialiased font-roboto-serif`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
