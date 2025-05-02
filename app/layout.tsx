import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/navigation/Nav";
import Footer from "./components/footers/Footer";
const inter = Inter({ subsets: ["latin"] });
import Providers from "./Providers/providers";
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
      <meta
        http-equiv="Cross-Origin-Opener-Policy"
        content="allow-popups"
      ></meta>
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
