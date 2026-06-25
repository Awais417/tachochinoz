import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Jomhuria,
  Potta_One,
  Jost,
  Mynerve,
} from "next/font/google";
import "./globals.css";
import "photoswipe/dist/photoswipe.css";
import { SanityLive } from "@/sanity/lib/live";

const jomhuria = Jomhuria({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jomhuria",
});

const pottaOne = Potta_One({
  weight: ["400"],
  variable: "--font-potta-one",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
});

const mynerve = Mynerve({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mynerve",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
  },
};
export const revalidate = 3600;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jomhuria.variable} ${pottaOne.variable} ${jost.variable} ${mynerve.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
