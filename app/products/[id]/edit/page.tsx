'use client';

import { Product, ProductService } from '@/app/services/api';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/app/components/MainLayout';
import ProductForm from '@/app/components/ProductForm';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getById(id as string);
        setProduct(data);
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (data: Product) => {
    await ProductService.update(id as string, data);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size="large" />
        </div>
      </MainLayout>
    );
  }
  if (error || !product) {
    return (
      <MainLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm relative">
          <h3 className="text-lg font-semibold">Error Loading Product for Editing</h3>
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
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link href={`/products/${id}`} className="text-primary-600 hover:text-primary-800 flex items-center gap-1">
            <FaArrowLeft />
            Back to product
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>
        
        <ProductForm 
          product={product}
          onSubmit={handleSubmit}
          buttonText="Update Product"
        />
      </div>
    </MainLayout>
  );
}
