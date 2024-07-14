import type { Metadata } from "next";
import { Noto_Serif_Thai } from "next/font/google";

import "@/styles/globals.css";

const notoSerifThai = Noto_Serif_Thai({ subsets: ["thai"] });

export const metadata: Metadata = {
  title: "Dental Clinical",
  description: "This is a clinical management system for dental clinics. Project for CSC492.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSerifThai.className}>
        {children}
      </body>
    </html>
  );
}