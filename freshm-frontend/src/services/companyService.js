import api from "./api";

/* Super Admin ⇄ backend integration.
   All routes live under /api/super-admin/companies.
   Creating a company also auto-creates its ADMIN login on the
   backend (email = company email, password = "Admin@123"). */

export const getAllCompanies = async () => {
  const res = await api.get("/super-admin/companies");
  return res.data?.data ?? res.data ?? [];
};

export const getCompany = async (id) => {
  const res = await api.get(`/super-admin/companies/${id}`);
  return res.data?.data ?? res.data;
};

export const createCompany = async (payload) => {
  const res = await api.post("/super-admin/companies", payload);
  return res.data?.data ?? res.data;
};

export const updateCompany = async (id, payload) => {
  const res = await api.put(`/super-admin/companies/${id}`, payload);
  return res.data?.data ?? res.data;
};

// Backend soft-disables (active = false)
export const disableCompany = async (id) => {
  const res = await api.delete(`/super-admin/companies/${id}`);
  return res.data;
};
