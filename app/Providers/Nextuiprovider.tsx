"use client";
import "../globals.css"
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function NextUiProvider({
  children,
}: {
  children: React.ReactNode;
  }) {
  const router = useRouter();
  return (
       
        <NextUIProvider>{children}</NextUIProvider>
    );
}
