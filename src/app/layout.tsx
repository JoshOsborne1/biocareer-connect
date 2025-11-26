import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Providers from './providers';
import HeaderBar from '@/components/HeaderBar';

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
  title: 'BioCareer Connect',
  description: 'AI-assisted job discovery for biomedical science graduates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}>
        <Providers>
          <HeaderBar />
          <main className="min-h-screen pt-24">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
