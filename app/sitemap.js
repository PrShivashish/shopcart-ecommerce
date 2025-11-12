// app/sitemap.js

import { productDummyData } from '@/assets/assets';

export default function sitemap() {
  const baseUrl = 'https://gocart-ecommerce-ruddy.vercel.app';
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];
  
  const productPages = productDummyData.map(product => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  return [...staticPages, ...productPages];
}
