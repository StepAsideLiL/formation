import type { Metadata } from "next";
import "./globals.css";
import fonts from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Formation",
  description: "Create form to collect information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
