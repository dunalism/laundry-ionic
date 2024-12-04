export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface LaundryProvider {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  image: string;
}

export interface LaundryService {
  id: string;
  providerId: string;
  name: string;
  type: string;
  price: number;
  unit: string;
}

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'paid' | 'processing' | 'completed';
  paymentMethod?: string;
}