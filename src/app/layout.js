import Header from '@/components/header';
import { Inter } from 'next/font/google';
import '@/styles/styles.sass';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Analytics from '@/components/analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Nutri & Trela',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
