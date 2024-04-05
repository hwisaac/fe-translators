import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DummyHeader from '@/components/DummyHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Header />
          <DummyHeader />
          {children}

          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
