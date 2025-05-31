"use client";

import { Product } from "@/app/services/api";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaCloudversify } from "react-icons/fa";
import Badge from "./Badge";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {    // Get image URL - check if it's from Cloudinary to apply optimizations
      const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=No+Image';
    


    // Format price to currency
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col group">
            {/* Product Image with hover effect */}
            <Link href={`/products/${product.id}`} className="relative">
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          {/* Product badges - Add random badges for visual interest */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.price >= 100 && (
              <Badge text="Premium" color="primary" />
            )}
            {Math.random() > 0.5 && (
              <Badge text="Free Shipping" color="success" />
            )}
            {Math.random() > 0.7 && (
              <Badge text="Sale" color="danger" />
            )}
          </div>
        </div>
      </Link>

            {/* Product Info */}
            <div className="p-4 flex-grow flex flex-col">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                {/* Brief description preview */}
                {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}
                <p className="text-xl font-bold text-primary-600 mt-auto">
                    {formatPrice(product.price)}
                </p>
            </div>
            {/* View Details Link */}
            <Link
                href={`/products/${product.id}`}
                className="mt-auto w-full bg-primary-600 text-white py-2 px-4 text-center font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
                View Details <FaExternalLinkAlt size={14} />
            </Link>
        </div>
    );
}
