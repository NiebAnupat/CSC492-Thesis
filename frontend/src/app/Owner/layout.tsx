import type { Metadata } from "next";
import { Noto_Serif_Thai } from "next/font/google";

import "@/styles/globals.css";

import SideNav from "@/components/SideNav/side-nav";
import MarginWidthWrapper from "@/components/SideNav/margin-width-wrapper";
import HeaderMobile from "@/components/SideNav/header-mobile";
import PageWrapper from "@/components/SideNav/page-wrapper";

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
        <div className="flex">
          <SideNav />
          <main className="flex-1">
            <MarginWidthWrapper>
              {/* <Header /> */}
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
