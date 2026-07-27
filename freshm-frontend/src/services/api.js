//import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });



// api.interceptors.request.use(
//   (config) => {
//     const user = localStorage.getItem("user");

//     if (user) {
//       const parsedUser = JSON.parse(user);

//       if (parsedUser.token) {
//         config.headers.Authorization = `Bearer ${parsedUser.token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const user = localStorage.getItem("user");

//     if (user) {
//       const parsedUser = JSON.parse(user);

//       if (parsedUser?.token) {
//         config.headers.Authorization = `Bearer ${parsedUser.token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
api.interceptors.request.use((config) => {

  // Login request ला token add करू नको
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
});
export default api;