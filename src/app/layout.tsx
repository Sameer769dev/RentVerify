import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/components/auth-provider';
import "leaflet/dist/leaflet.css";
import PageShell from '@/components/page-shell';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'GharBhada',
  description: 'GharBhada – Your Trusted Rental Partner in Nepal',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          inter.variable
        )}
      >
        <AuthProvider>
          <PageShell>
            {children}
          </PageShell>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
