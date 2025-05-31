'use client';

import { Product, ProductService } from '@/app/services/api';
import MainLayout from '@/app/components/MainLayout';
import ProductForm from '@/app/components/ProductForm';

export default function CreateProduct() {
  const handleSubmit = async (data: Product) => {
    try {
      console.log('Creating new product with data:', data);
      const createdProduct = await ProductService.create(data);
      console.log('Product created successfully:', createdProduct);
      // No return needed, just resolve the promise
    } catch (error) {
      console.error('Error in create product handler:', error);
      throw error; // Rethrow to let the form component handle the error
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Product</h1>
        
        <ProductForm 
          onSubmit={handleSubmit}
          buttonText="Create Product"
        />
      </div>
    </MainLayout>
  );
}
