export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type LaundryProvider = {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  image: string;
};

export type LaundryService = {
  id: string;
  name: string;
  providerId: string;
  type: string;
  price: number;
  unit: string;
};

export type Order = {
  id: string;
  userId: string;
  serviceId: string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "paid" | "processing" | "completed";
  paymentMethod?: string;
};

export type LaundryServiceExtended = LaundryService & LaundryProvider;
