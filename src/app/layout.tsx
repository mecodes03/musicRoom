import "./globals.css";

import type { Metadata } from "next";

import { Libre_Franklin } from "next/font/google";
import { Archivo } from "next/font/google";

import NextTopLoader from "nextjs-toploader";

import { Providers } from "../providers/Providers";
import { cn } from "@/lib/utils";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          archivo.variable + " " + libre_franklin.variable
        )}
      >
        <NextTopLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
