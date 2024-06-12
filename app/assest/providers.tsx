"use client";
import NextUiProvider from "../Providers/Nextuiprovider";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return <NextUiProvider>{children}</NextUiProvider>;
}
