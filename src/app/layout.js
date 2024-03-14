import Header from '@/components/header'
import { Inter } from "next/font/google";
import '@/styles/styles.sass'


const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
 });

export const metadata = {
  title: "Nutri & Trela",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout