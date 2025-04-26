import api from './api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CLIENT_ID, KEYCLOAK_URL } from '../utils/constants';
import { redirectToLogin } from '../utils/redirect';


interface JwtPayload {
  exp: number;
}

// Decode token and check expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

// Refresh token
const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', CLIENT_ID);
    params.append('refresh_token', refreshToken);

    const response = await axios.post(
      `${KEYCLOAK_URL}/protocol/openid-connect/token`,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token } = response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return access_token;
  } catch (error) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    throw error;
  }
};

// Inject token into every request
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token');

  if (token && isTokenExpired(token)) {
    try {
      token = await refreshAccessToken();
    } catch (error) {
      redirectToLogin();
      return Promise.reject(error);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401s
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Interfaces
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole: 'CLIENT' | 'OWNER';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

// Auth functions
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  localStorage.setItem('access_token', response.data.access_token);
  localStorage.setItem('refresh_token', response.data.refresh_token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  redirectToLogin();
};

export const checkAuth = (): boolean => {
  const token = localStorage.getItem('access_token');
  return !!token && !isTokenExpired(token);
};

export default api;
