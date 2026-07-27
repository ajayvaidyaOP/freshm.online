import api from "./api";

export const getLetterHeads = () => api.get("/letter-head");

export const getLetterHeadById = (id) =>
  api.get(`/letter-head/${id}`);

export const createLetterHead = (data) =>
  api.post("/letter-head", data);

export const updateLetterHead = (id, data) =>
  api.put(`/letter-head/${id}`, data);

export const deleteLetterHead = (id) =>
  api.delete(`/letter-head/${id}`);