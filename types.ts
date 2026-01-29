
export type Category = 'Development' | 'Design' | 'Marketing' | 'Writing' | 'Business';

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  category: Category;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
}

export interface CartItem {
  serviceId: string;
  quantity: number;
  service: Service;
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface AppState {
  cart: CartItem[];
  user: User | null;
}
