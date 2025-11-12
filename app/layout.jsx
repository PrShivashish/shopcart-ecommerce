import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: {
    default: 'GoCart - Multi-Vendor E-Commerce Marketplace',
    template: '%s | GoCart',
  },
  description:
    'GoCart is a modern multi-vendor e-commerce platform. Shop electronics, fashion, home essentials from thousands of sellers with secure payments and fast delivery.',
  keywords: [
    'ecommerce',
    'marketplace',
    'online shopping',
    'multi-vendor',
    'electronics',
    'fashion',
  ],
  authors: [{ name: 'Shivashish Prusty' }],
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gocart-ecommerce-ruddy.vercel.app',
    siteName: 'GoCart',
    title: 'GoCart - Multi-Vendor E-Commerce Marketplace',
    description: 'Shop from thousands of sellers on GoCart marketplace.',
    images: [
      {
        url: 'https://gocart-ecommerce-ruddy.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoCart Marketplace',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'GoCart - Multi-Vendor E-Commerce',
    description: 'Shop from thousands of sellers on GoCart',
    images: ['https://gocart-ecommerce-ruddy.vercel.app/og-image.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://gocart-ecommerce-ruddy.vercel.app" />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <StoreProvider>
          <Toaster />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
