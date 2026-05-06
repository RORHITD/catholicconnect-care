import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://catholicconnect.care"),
  title: {
    default: "The Catholic Connect Foundation — Supporting Charitable Initiatives",
    template: "%s | The Catholic Connect Foundation",
  },
  description:
    "Join us in helping Catholic priests, nuns, orphanages, and other nonprofits achieve their humanitarian and charitable missions. Donate today.",
  openGraph: {
    type: "website",
    siteName: "The Catholic Connect Foundation",
    images: ["/wp/wp-content/uploads/2022/07/Rectangle-5209.png"],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/branding/logo-icon.jpg",
    apple: "/branding/logo-icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
