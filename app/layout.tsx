import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BELNEX ENERGY | Site Under Maintenance",
  description:
    "BELNEX ENERGY provides professional electrical installations, smart home automation, solar energy, EV chargers, CCTV, networking and industrial electrical solutions across Belgium.",
  keywords: [
    "electrical installations Belgium",
    "smart home Belgium",
    "solar energy",
    "EV chargers",
    "CCTV",
    "BELNEX ENERGY",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo/favicon-32.png",
    shortcut: "/logo/favicon-32.png",
  },
  openGraph: {
    title: "BELNEX ENERGY | Site Under Maintenance",
    description:
      "Professional electrical, smart home, solar and security solutions across Belgium.",
    type: "website",
    locale: "en_BE",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="bg-canvas font-sans antialiased">{children}</body>
    </html>
  );
}
