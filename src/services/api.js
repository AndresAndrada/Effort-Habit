import axios from 'axios';
import { API_ENDPOINTS } from '../types/api.js';

/**
 * Cliente HTTP configurado con interceptores para autenticación
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de request: adjunta access token si existe
 */
api.interceptors.request.use(
  (config) => {
    const tokens = getStoredTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor de response: maneja refresh token automático en 401
 */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthStorage();
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Obtiene tokens del localStorage
 * @returns {{accessToken: string, refreshToken: string, expiresIn: number}|null}
 */
function getStoredTokens() {
  try {
    const stored = localStorage.getItem('auth-tokens');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Guarda tokens en localStorage
 * @param {{accessToken: string, refreshToken: string, expiresIn: number}} tokens
 */
function setStoredTokens(tokens) {
  localStorage.setItem('auth-tokens', JSON.stringify(tokens));
}

/**
 * Limpia storage de autenticación
 */
function clearAuthStorage() {
  localStorage.removeItem('auth-tokens');
  localStorage.removeItem('user-storage');
}

/**
 * Refresca el access token usando refresh token
 * @returns {Promise<string>} Nuevo access token
 */
async function refreshAccessToken() {
  const tokens = getStoredTokens();
  if (!tokens?.refreshToken) throw new Error('No refresh token');

  const response = await axios.post(
    `${api.defaults.baseURL}${API_ENDPOINTS.AUTH_REFRESH}`,
    { refreshToken: tokens.refreshToken }
  );

  const newTokens = {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken || tokens.refreshToken,
    expiresIn: response.data.expiresIn || 3600,
  };
  setStoredTokens(newTokens);
  return newTokens.accessToken;
}

/**
 * Helpers para requests comunes
 */
export const apiClient = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  patch: (url, data, config) => api.patch(url, data, config),
  delete: (url, config) => api.delete(url, config),
};

/**
 * Endpoints de autenticación
 */
export const authApi = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH_LOGIN, credentials),
  register: (data) => api.post(API_ENDPOINTS.AUTH_REGISTER, data),
  logout: () => api.post(API_ENDPOINTS.AUTH_LOGOUT),
  me: () => api.get(API_ENDPOINTS.AUTH_ME),
};

/**
 * Endpoints de usuarios
 */
export const userApi = {
  list: (params) => api.get(API_ENDPOINTS.USERS_LIST, { params }),
  get: (id) => api.get(API_ENDPOINTS.USERS_GET.replace(':id', id)),
  create: (data) => api.post(API_ENDPOINTS.USERS_CREATE, data),
  update: (id, data) => api.put(API_ENDPOINTS.USERS_UPDATE.replace(':id', id), data),
  delete: (id) => api.delete(API_ENDPOINTS.USERS_DELETE.replace(':id', id)),
};

/**
 * Endpoints de ejercicios
 */
export const exerciseApi = {
  list: (params) => api.get(API_ENDPOINTS.EXERCISES_LIST, { params }),
  get: (id) => api.get(API_ENDPOINTS.EXERCISES_GET.replace(':id', id)),
  create: (data) => api.post(API_ENDPOINTS.EXERCISES_CREATE, data),
  update: (id, data) => api.put(API_ENDPOINTS.EXERCISES_UPDATE.replace(':id', id), data),
  delete: (id) => api.delete(API_ENDPOINTS.EXERCISES_DELETE.replace(':id', id)),
};

/**
 * Endpoints de sesiones
 */
export const sessionApi = {
  list: (params) => api.get(API_ENDPOINTS.SESSIONS_LIST, { params }),
  get: (id) => api.get(API_ENDPOINTS.SESSIONS_GET.replace(':id', id)),
  create: (data) => api.post(API_ENDPOINTS.SESSIONS_CREATE, data),
  update: (id, data) => api.put(API_ENDPOINTS.SESSIONS_UPDATE.replace(':id', id), data),
  delete: (id) => api.delete(API_ENDPOINTS.SESSIONS_DELETE.replace(':id', id)),
  complete: (id, data) => api.post(API_ENDPOINTS.SESSIONS_COMPLETE.replace(':id', id), data),
};

export default api;