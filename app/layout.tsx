import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SessionProv from "@/components/SessionProv";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devstock Hub",
  description: "More than just e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-[var(--base-white-2)] min-h-screen mx-auto  flex flex-col max-w-[1440px]`}
      >
        <SessionProv>
          <Header />
          {children}
          <Footer />
        </SessionProv>
      </body>
    </html>
  );
}
