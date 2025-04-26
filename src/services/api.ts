import axios from 'axios';
import { API_URL } from '../utils/constants';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User
export const getUserProfile = async() => {
  const response = await api.get("/auth/user"); 
  return response.data; // -> UserResponseDto
}

// Cars
export interface CarFilters {
  search?: string;
  location?: string;
  transmission?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'year';
  direction?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export const getCars = async (filters?: CarFilters) => {
  const response = await api.get('/cars', { params: filters });
  return response.data;
};

export const getCarById = async (id: string) => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};

export const createCar = async (carData: FormData) => {
  const response = await api.post('/cars', carData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Bookings
export interface BookingData {
  carId: string;
  startDate: string;
  endDate: string;
}

export const createBooking = async (data: BookingData) => {
  const response = await api.post('/bookings', data);
  return response.data;
};

export const getCarBookings = async (carId: string) => {
  const response = await api.get(`/bookings/car/${carId}/occupied`);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/bookings/user');
  return response.data;
};

// Reviews
export interface ReviewData {
  carId: string;
  rating: number;
  comment: string;
}

export const createReview = async (data: ReviewData) => {
  const response = await api.post('/reviews', data);
  return response.data;
};

export const getCarReviews = async (carId: string) => {
  const response = await api.get(`/reviews/car/${carId}`);
  return response.data;
};

export const getImageUrl = (carId: string, filename: string) => {
  return `${API_URL}/images/${carId}/${filename}`;
};

export default api;
