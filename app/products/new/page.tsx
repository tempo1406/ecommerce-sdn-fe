"use client";

import { Product, ProductService } from "@/app/services/api";
import ProductForm from "@/app/components/ProductForm";

export default function CreateProduct() {
    const handleSubmit = async (data: Product) => {
        try {
            await ProductService.create(data);
        } catch (error) {
            throw error;
        }
    };
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Create New Product
            </h1>

            <ProductForm onSubmit={handleSubmit} buttonText="Create Product" />
        </div>
    );
}
