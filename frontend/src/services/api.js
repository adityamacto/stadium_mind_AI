import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const api = axios.create({
    baseURL: apiUrl,
    timeout:15000,
    headers:{
        "Content-Type":"application/json"
    }
});

api.interceptors.request.use((config) => {
    if (!apiUrl) {
        return Promise.reject(
            new Error("VITE_API_URL must be configured before using the API.")
        );
    }

    return config;
});

export default api;
