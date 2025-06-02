import axios from 'axios';

// Define the base URL for our API with a fallback
const API_URL = process.env.BACKEND_URL || 'http://localhost:3000/api';

console.log('API URL:', API_URL); // Debug the API URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add CORS headers directly in requests to help with CORS issues
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  // Add timeout to prevent hanging requests
  timeout: 15000, // Increased timeout
  // Disable withCredentials as it can cause CORS issues with simple requests
  withCredentials: false,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // You can modify request config here (add auth tokens, etc.)
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Error Response:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('API Error:', error.message);
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
}

// API functions for products
export const ProductService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Get a single product by id
  async getById(id: string): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
    // Create a new product
  async create(product: Product): Promise<Product> {
    try {
      console.log('API: Creating product with data:', product);
      console.log('API: Using endpoint:', `${API_URL}/products`);
      
      const response = await api.post<Product>('/products', product);
      console.log('API: Server response:', response);
      
      if (!response.data || !response.data.id) {
        console.warn('API: Created product missing ID or data:', response.data);
      }
        return response.data;
    } catch (error: unknown) {
      console.error('Error creating product:', error);
      // Type-safe error handling
      if (error instanceof Error) {
        console.error('Error details:', error.message);      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: unknown }; message?: string };
        console.error('Error details:', axiosError.response?.data || axiosError.message);
      }
      throw error;
    }
  },

  // Update an existing product
  async update(id: string, product: Product): Promise<Product> {
    try {
      const response = await api.patch<Product>(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },  // Delete a product
  async delete(id: string): Promise<void> {
    try {
      console.log(`Deleting product ${id}`);
      
      // Delete the product from database
      await api.delete(`/products/${id}`);
      console.log(`Product ${id} deleted from database`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
  
  // Search products
  async search(query: string): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>(`/products?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};
