import { Product } from "./product.model";
import { User } from "./user.model";

export interface OrderItem {
  product: string | Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;
  user: string | User;
  items: OrderItem[];
  totalPrice: number;
  status?: 'Pending' | 'Paid' | 'Canceled';
  paymentUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
