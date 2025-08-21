import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Space_Grotesk } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BloodDropBackground from '@/components/blood-drop-background';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'BloodLink',
  description: 'Blood Donation Alert System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${spaceGrotesk.variable} dark`}>
      <body className="font-body antialiased relative flex flex-col min-h-screen">
        <BloodDropBackground />
        <Header />
        <main className="flex-grow container mx-auto px-6 py-12 pt-32 space-y-24 relative z-10">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
