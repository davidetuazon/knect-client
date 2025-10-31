import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5000";
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
        throw new Error('Login failed');
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
        throw new Error('Registration failed');
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

export const like = async (id: string) => {
    try {
        const res = await api.post('/discover/like', { likedUserId: id });
        return res.data;
    } catch (e) {
        throw new Error('Failed to send like invitation');
    }
}

export const skip = async (id: string) => {
    try {
        const res = await api.post('/discover/skip', { skippedUserId: id });
        return res.data;
    } catch (e) {
        throw new Error('Failed to skip user')
    }
}

export const getUser = async (id: string) => {
    try {
        const res = await api.get(`/discover/profile/${id}`);
        return res.data;
    } catch (e) {
        throw new Error('Failed to view user profile');
    }
}

export const getConversations = async () => {
    try {
        const res = await api.get('/messages');
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch messages');
    }
}

export const updateProfile = async (params: {
    fullName: string,
    age: string,
    bio: string,
}) => {
    try {
        const res = await api.patch('/settings/profile', params, {});
        return res.data;
    } catch (e) {
        throw new Error('Failed to update profile info');
    }
}

export const updatePhoto = async (formData: FormData) => {
    try {
        console.log('Sending formData:', formData.get('profilePhoto'));

        const res = await api.patch('/settings/profile-photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (e) {
        throw new Error('Failed to update profile photo');
    }
}

export const getMatchList = async () => {
    try {
        const res = await api.get('/matches');
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch match list');
    }
}

export const getLikerList = async () => {
    try {
        const res = await api.get('/likes');
        return res.data;
    } catch(e) {
        throw new Error('Failed to fetch liker list');
    }
}

export const getMessages = async (id: string) => {
    try {
        const res = await api.get(`/messages/${id}`)
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch messages');
    }
}