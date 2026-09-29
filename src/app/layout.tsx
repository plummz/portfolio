import type { Metadata, Viewport } from "next";
import { Anybody, Atkinson_Hyperlegible_Next, Caveat, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { LensProvider } from "@/lib/lens";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
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
  title: "John Rey Marquillero, UX engineer, writer and researcher",
  description:
    "I make screens people get through on the first try. Case studies: Study Arena, a calm study app, and BOCO-FI, a bottle-recycling kiosk.",
  openGraph: {
    title: "John Rey Marquillero",
    description:
      "UX engineer, writer and researcher from the Philippines. Peel back the research, the words and the build.",
    images: ["/img/john-portrait.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f8fc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-lens="finished"
      suppressHydrationWarning
      className={`${anybody.variable} ${atkinson.variable} ${caveat.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=new URLSearchParams(location.search).get("lens");if(l==="research"||l==="words"||l==="build")document.documentElement.dataset.lens=l}catch(e){}`,
          }}
        />
      </head>
      <body>
        <SmoothScroll />
        <LensProvider>{children}</LensProvider>
      </body>
    </html>
  );
}
