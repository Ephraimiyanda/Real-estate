import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import NextUiProvider from "./Providers/NEXTUIProvider/Nextuiprovider";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Real estatate",
  description: "what you want we have",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUiProvider>
          <Nav />
          {children}
        </NextUiProvider>
      </body>
    </html>
  );
}
