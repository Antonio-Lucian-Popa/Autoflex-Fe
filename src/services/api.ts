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

export interface BookingResponse {
  id: string;
  car: unknown;
  carId: string;
  clientId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const createBooking = async (data: BookingData): Promise<BookingResponse> => {
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

// Payments
// === 1. Creează link de onboarding pentru owner ===
export const createStripeOnboardingLink = async (ownerId: string): Promise<string> => {
  const res = await api.post(`/payments/onboarding-link/${ownerId}`);
  return res.data.onboardingUrl;
};

// === 2. Verifică statusul contului Stripe al ownerului ===
export interface StripeStatus {
  hasStripeAccount: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}

export const getOwnerStripeStatus = async (ownerId: string): Promise<StripeStatus> => {
  const res = await api.get(`/payments/owner-status/${ownerId}`);
  return res.data;
};

// === 3. Obține detalii despre checkout pentru un booking ===
export interface CheckoutDetails {
  userId: string;
  ownerId: string;
  ownerStripeAccountId: string;
  amountCents: number;
  feeCents: number;
}

export const getCheckoutDetails = async (bookingId: string): Promise<CheckoutDetails> => {
  const res = await api.get(`/bookings/${bookingId}/checkout-details`);
  return res.data;
};

// === 4. Creează o sesiune Stripe Checkout ===
export const createStripeCheckoutSession = async (details: CheckoutDetails & {
  bookingId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> => {
  const res = await api.post('/payments/checkout', details);
  return res.data.url;
};


export default api;
