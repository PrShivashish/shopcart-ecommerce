'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productDummyData } from '@/assets/assets';

export async function generateMetadata({ params }) {
  const { id } = params;
  const product = productDummyData.find(p => p.id === id);
  
  if (!product) {
    return {
      title: 'Product Not Found | GoCart',
      description: 'This product could not be found.',
    };
  }
  
  const description = product.description.substring(0, 160);
  
  return {
    title: `${product.name} - Buy at GoCart`,
    description: description,
    keywords: [product.name, product.category, 'buy', 'shop'],
    
    openGraph: {
      type: 'product',
      title: product.name,
      description: description,
      url: `https://gocart-ecommerce-ruddy.vercel.app/product/${id}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: description,
      images: [product.image],
    },
  };
}

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);

    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        scrollTo(0, 0)
    }, [productId,products]);

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrums */}
                <div className="  text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.category}
                </div>

                {/* Product Details */}
                {product && (<ProductDetails product={product} />)}

                {/* Description & Reviews */}
                {product && (<ProductDescription product={product} />)}
            </div>
        </div>
    );
}
