import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextUiProvider from "./Providers/Nextuiprovider";
import "./globals.css";
import Nav from "./components/Nav";
import Head from "next/head";
import Script from "next/script";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });
import { redirect, useRouter } from "next/navigation";
import Providers from "./assest/providers";
import SessionProvider from "./Providers/sessionProvider";
import { useSession } from "next-auth/react";
export const metadata: Metadata = {
  title: "Realswitch",
  description: "what you want we have, look for your best housing options",
  icons: "/logo.png",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  // const sesssion = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/signIn")
  //   }
  // })
  return (
    <html lang="en">
      <meta http-equiv="Cross-Origin-Opener-Policy" content="allow-popups"></meta>
      <body className={inter.className}>
        <SessionProvider>
          <Providers>
            <Nav />
            {children}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
