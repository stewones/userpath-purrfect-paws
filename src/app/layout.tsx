import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/contexts/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purrfect Paws - Find Your Perfect Feline Friend",
  description: "Discover adorable cats and kittens looking for their forever homes. From playful kittens to gentle seniors, find your purrfect companion today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* UserPath Browser Pixel - Alternative integration method */}
        {/* Uncomment below if you prefer browser pixel over JavaScript SDK */}
        {/* 
        {process.env.NEXT_PUBLIC_USERPATH_APP_ID && (
          <script
            src="https://api.userpath.co/v1/px.js"
            data-app={process.env.NEXT_PUBLIC_USERPATH_APP_ID}
            async
          />
        )}
        */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
          <CartProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
      </body>
    </html>
  );
}
