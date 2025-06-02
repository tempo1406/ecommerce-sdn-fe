import axios from 'axios';

// Define the base URL for our API with a fallback
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  timeout: 15000,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
    } else if (error.request) {
    } else {
    }
    return Promise.reject(error);
  }
);

// Product interface based on the model
export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Filter interface for product filtering
export interface ProductFilter {
  categories: string[];
  inStock?: boolean;
  minStock?: number;
  sortBy: 'name' | 'price' | 'stock' | 'newest';
  sortOrder: 'asc' | 'desc';
}

// API functions for products
export const ProductService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get a single product by id
  async getById(id: string): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
    // Create a new product
  async create(product: Product): Promise<Product> {
    try {
      const response = await api.post<Product>('/products', product);
      if (!response.data || !response.data.id) {
      }
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  },

  // Update an existing product
  async update(id: string, product: Product): Promise<Product> {
    try {
      const response = await api.patch<Product>(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      throw error;
    }
  },  // Delete a product
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Search products
  async search(query: string): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>(`/products?q=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
