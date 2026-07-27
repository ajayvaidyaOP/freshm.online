import api from "./api";

// Create Product (Article)
export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Get All Products
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Get Product By Id
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Update Product
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};