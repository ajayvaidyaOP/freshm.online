import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Login API me token mat bhejo
    if (config.url === "/auth/login") {
      return config;
    }

    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);

      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
