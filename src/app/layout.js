import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "../components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dandi Github Analyzer - Unlock GitHub Insights",
  description: "Get powerful insights, summaries, and analytics for open source GitHub repositories. Discover trends, track important updates, and stay ahead of the curve.",
  keywords: ["GitHub", "analytics", "insights", "open source", "repositories", "trends", "research"],
  authors: [{ name: "Dandi AI" }],
  creator: "Dandi AI",
  publisher: "Dandi AI",
  robots: "index, follow",
  openGraph: {
    title: "Dandi Github Analyzer - Unlock GitHub Insights",
    description: "Get powerful insights, summaries, and analytics for open source GitHub repositories.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dandi Github Analyzer - Unlock GitHub Insights",
    description: "Get powerful insights, summaries, and analytics for open source GitHub repositories.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
