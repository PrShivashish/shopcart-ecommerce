import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";

export const metadata = {
  title: 'GoCart - Shop Online Marketplace',
  description:
    'Welcome to GoCart! Shop from thousands of trusted sellers. Discover electronics, fashion, home essentials and more. Fast checkout, secure payments.',
  keywords: [
    'shop online',
    'ecommerce',
    'marketplace',
    'buy products',
  ],
  
  openGraph: {
    title: 'GoCart - Multi-Vendor Marketplace',
    description: 'Shop from thousands of sellers.',
    url: 'https://gocart-ecommerce-ruddy.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://gocart-ecommerce-ruddy.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
    return (
        <div>
            <Hero />
            <LatestProducts />
            <BestSelling />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
