import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qr-Tickets",
  description: "Smart QR-based ticket booking system for inter-city commutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
        </body>
    </html>
  );
}
