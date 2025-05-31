import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { initAnalytics } from "@/lib/analytics";

if (typeof window !== 'undefined') {
  initAnalytics({
    enabled: process.env.NEXT_PUBLIC_GA_ENABLED === 'true',
    debug: process.env.NODE_ENV === 'development',
    gaId: process.env.NEXT_PUBLIC_GA_ID || undefined
  });
}

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BTC Swap",
    description: "A simple BTC ↔ USD exchange demo",
};

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
