import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextUiProvider from "./Providers/NEXTUIProvider/Nextuiprovider";
import "./globals.css";
import Nav from "./components/Nav";
import Head from "next/head";
import Script from "next/script";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
import Providers from "./assest/providers";
export const metadata: Metadata = {
  title: "Real estatate",
  description: "what you want we have, look for your best housing options",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
