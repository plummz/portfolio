import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "John Rey Marquillero · UX Engineer, Writer & Researcher",
  description:
    "Portfolio of John Rey Marquillero, a UX engineer, writer and researcher from the Philippines. Study Arena, BOCO-FI and more.",
  openGraph: {
    title: "John Rey Marquillero",
    description: "UX Engineer, UX Writer and UX Researcher. Come see what I've built.",
    images: ["/img/john-portrait.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c11",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* skip the intro screen before first paint on repeat visits */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("jr-intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-seen")}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
