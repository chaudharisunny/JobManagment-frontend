// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:3000/api/v1",
//   withCredentials: true,
// });

// // Attach JWT automatically
// API.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token"); // ✅ FIX

//   console.log("API TOKEN:", sessionStorage.getItem("token"));
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Auto logout on token expire
//  API.interceptors.response.use(
//    (response) => response,
//    (error) => {
// //     if (error.response && error.response.status === 401) {
// //       sessionStorage.clear(); // ✅ FIX
// //       window.location.href = "/login";
// //     }

//      return Promise.reject(error);
//    }
//  );

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
console.log("API URL:", import.meta.env.VITE_API_URL);
// Attach JWT automatically
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auto logout on token expire
API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default API;