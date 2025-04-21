import type { Metadata } from "next";
import "./globals.css";
import fonts from "@/lib/fonts";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: "%s - Formation",
    default: "Formation",
  },
  description: "Create form to collect information",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
