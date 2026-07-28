import api from "./api";

// Sale invoices (sell to a buyer). Backend computes totals + amount-in-words.
export const getAllSales = async () => {
  const res = await api.get("/sales");
  return res.data?.data ?? res.data ?? [];
};

export const getSale = async (id) => {
  const res = await api.get(`/sales/${id}`);
  return res.data?.data ?? res.data;
};

export const createSale = async (payload) => {
  const res = await api.post("/sales", payload);
  return res.data?.data ?? res.data;
};

export const deleteSale = async (id) => {
  const res = await api.delete(`/sales/${id}`);
  return res.data;
};
