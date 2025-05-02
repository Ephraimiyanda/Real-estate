"use client";
import NextUiProvider from "./Nextuiprovider";
import { useRouter } from "next/navigation";
import SessionProvider from "./sessionProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUiProvider>{children}</NextUiProvider>
    </SessionProvider>
  );
}
