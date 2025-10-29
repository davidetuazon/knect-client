import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_APP_URL || "http://localhost:5000";
const BASE_PATH = `${BASE_URL}/api/v1`;

const api = axios.create({
    baseURL: BASE_PATH,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export const me = async () => {
    try {
        const res = await api.get('/me');
        return res.data;
    } catch (e) {
        throw new Error("Failed to fetch me");
    }
}

export const login = async (email: string, password: string) => {
    try {
        const res = await api.post('/user/login', { email, password }, {});
        return res.data;
    } catch (e) {
        throw new Error("Login failed");
    }
}

export const register = async (params: {
    fullName: string,
    email: string,
    password: string,
}) => {
    try {
        const res = await api.post('/user/register', params, {});
        return res.data;
    } catch (e: any) {
        console.log(e);
        if (e.response?.data?.error) {
            throw new Error(e.response.data.error);
        }
        throw new Error("Registration failed");
    }
}

export const discover = async () => {
    try {
        const res = await api.get('/discover');
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch potential matches');
    }
}