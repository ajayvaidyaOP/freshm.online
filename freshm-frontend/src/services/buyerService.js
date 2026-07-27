import api from "./api";

// Buyer = customer company the admin sells produce to
// (e.g. GAURI TRADING COMPANY on the sale invoice).

// GET ALL BUYERS  (backend already scopes to the logged-in tenant)
export const getAllBuyers = async () => {
    const response = await api.get("/buyers");
    return response.data;
};

// GET BUYER BY ID
export const getBuyerById = async (id) => {
    const response = await api.get(`/buyers/${id}`);
    return response.data;
};

// CREATE BUYER  (plain JSON, no file upload needed)
export const createBuyer = async (buyerData) => {
    const response = await api.post("/buyers", buyerData);
    return response.data;
};

// UPDATE BUYER
export const updateBuyer = async (id, data) => {
    const response = await api.put(`/buyers/${id}`, data);
    return response.data;
};

// CHANGE STATUS  (active / inactive)
export const changeBuyerStatus = async (id, status) => {
    const response = await api.put(`/buyers/${id}/status?status=${status}`);
    return response.data;
};

// DELETE BUYER  (soft delete on the backend)
export const deleteBuyer = async (id) => {
    const response = await api.delete(`/buyers/${id}`);
    return response.data;
};
