import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = session.token;
    }
    return config;
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = '/login';
      toast.error('Sessão expirada, faça login novamente');
    } else {
      return Promise.reject(error);
    }
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = '/login';
      toast.error('Sessão expirada, faça login novamente');
    } else {
      return Promise.reject(error);
    }
  },
);

export default api;
