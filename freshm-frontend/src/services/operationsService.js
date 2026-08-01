import api from "./api";

const unwrap = (res) => res.data?.data ?? res.data ?? [];

// Receiving
export const createReceipt = async (payload) => unwrap(await api.post("/operations/receipts", payload));
export const getReceipts   = async () => unwrap(await api.get("/operations/receipts"));
export const getReceipt    = async (id) => unwrap(await api.get(`/operations/receipts/${id}`));
export const deleteReceipt = async (id) => unwrap(await api.delete(`/operations/receipts/${id}`));

// Returns (reject)
export const createReturn  = async (payload) => unwrap(await api.post("/operations/returns", payload));
export const getReturns    = async () => unwrap(await api.get("/operations/returns"));
export const deleteReturn  = async (id) => unwrap(await api.delete(`/operations/returns/${id}`));

// Sorting + packing
export const createPacking = async (payload) => unwrap(await api.post("/operations/packing", payload));
export const getPacking    = async () => unwrap(await api.get("/operations/packing"));
export const deletePacking = async (id) => unwrap(await api.delete(`/operations/packing/${id}`));
