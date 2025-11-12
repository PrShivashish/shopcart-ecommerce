export const metadata = {
  title: 'Shop All Products | GoCart',
  description:
    'Browse thousands of products from multiple sellers. Find electronics, fashion, and more at competitive prices.',
  keywords: ['shop', 'products', 'buy online', 'marketplace'],
  
  openGraph: {
    title: 'Shop All Products | GoCart',
    description: 'Browse thousands of products from sellers.',
    url: 'https://gocart-ecommerce-ruddy.vercel.app/shop',
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

import ShopContent from './shop-content';

export default function Shop() {
  return <ShopContent />;
}
