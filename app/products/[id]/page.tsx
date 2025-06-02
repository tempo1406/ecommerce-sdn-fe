'use client';

import { Product, ProductService } from '@/app/services/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getById(id as string);
        setProduct(data);      } catch (err: unknown) {
        console.error('Error fetching product:', err);
        // Show more descriptive error if available
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to load product. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await ProductService.delete(id as string);
      toast.success('Product deleted successfully');
      router.push('/');
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Failed to delete product');
      setIsDeleting(false);
    }
  };

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }  if (error || !product) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm relative">
        <h3 className="text-lg font-semibold">Error Loading Product</h3>
        <p className="mt-2">{error || 'Product not found'}</p>
        
        {error && error.includes('Network error') && (
          <div className="mt-3 p-3 bg-red-100 rounded-sm text-sm">
            <p className="font-medium">Troubleshooting Tips:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Ensure the backend server is running</li>
              <li>Check network connection and CORS settings</li>
            </ul>
          </div>
        )}
        
        <div className="mt-4 flex gap-3">
          <Link href="/" className="text-primary-600 hover:text-primary-800 flex items-center gap-1 px-3 py-1.5 border border-primary-600 rounded-md">
            <FaArrowLeft />
            Back to products
          </Link>
          
          <button 
            onClick={() => window.location.reload()} 
            className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Back button */}
      <div className="mb-6">
        <Link href="/" className="text-primary-600 hover:text-primary-800 flex items-center gap-1">
          <FaArrowLeft />
          Back to products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">{/* Product Image */}
          <div className="md:w-1/2 relative h-[400px] bg-gray-100">
            {product.image && product.image.includes('cloudinary.com') ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized={false}
              />
            ) : (
              <Image
                src={product.image || 'https://via.placeholder.com/500x500?text=No+Image'}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized={true}
              />
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="mb-6">
              <p className="text-3xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Link
                href={`/products/${id}/edit`}
                className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaEdit /> Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-400 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <FaTrash /> {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>        </div>
        
      </div>
    </>
  );
}
