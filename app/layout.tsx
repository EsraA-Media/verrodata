
import type { Metadata } from "next";
import GlobalStyles from "@/components/GlobalStyles";
import "styles/globals.css"

export const metadata: Metadata = {
  title: "Verrodata",
  description: "Saubere Daten. Klare Strukturen. Mehr Umsatz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
