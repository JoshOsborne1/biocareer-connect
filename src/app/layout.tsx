import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import SiteHeader from '@/components/SiteHeader';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'BioCareer Connect · Bristol Biomedical Pathways',
  description: 'Curated biomedical science sponsorships, placements, and cover letter tools for Bristol students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-24 sm:px-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
