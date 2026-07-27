import api from "./api";

// Purchase APIs
export const createPurchase = async (purchaseData) => {
  const response = await api.post("/purchases", purchaseData);
  return response.data;
};

export const getAllPurchases = async () => {
  const response = await api.get("/purchases");
  return response.data;
};

export const getPurchaseById = async (id) => {
  const response = await api.get(`/purchases/${id}`);
  return response.data;
};

// Vendor APIs
export const getAllVendors = async () => {
  const response = await api.get("/vendors");
  return response.data;
};

// Farmer APIs
export const getAllFarmers = async () => {
  const response = await api.get("/farmers");
  return response.data;
};

// Product APIs
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};