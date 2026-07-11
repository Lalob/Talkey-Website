import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  icons: {
    icon: "/climax/icon.svg",
    shortcut: "/climax/icon.svg",
  },
};

export default function ClimaxLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
