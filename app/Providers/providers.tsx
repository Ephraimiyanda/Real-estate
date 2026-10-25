"use client";

import NextUiProvider from "./Nextuiprovider";
import SessionProvider from "./sessionProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <NextUiProvider>{children}</NextUiProvider>
    </SessionProvider>
  );
}
