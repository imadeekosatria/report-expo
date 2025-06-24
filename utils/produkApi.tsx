import axios, { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { authStorageKey } from "./authContext";

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/produk`, {
      headers: {
        'Authorization': await SecureStore.getItemAsync(authStorageKey)
      },
      timeout: 5000
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.errors || 'Failed to fetch products';
    } else {
      return 'An unexpected error occurred';
    }
  }
};

const getProductById = async (id: string) => {
  // Fetch a single product by ID from the API
};

const createProduct = async (data: any) => {
  // Create a new product in the API
};

const updateProduct = async (id: string, data: any) => {
  // Update an existing product in the API
};

const deleteProduct = async (id: string) => {
  // Delete a product from the API
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
