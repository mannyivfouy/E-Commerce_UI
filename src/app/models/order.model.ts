export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;
  user: string;
  items: OrderItem[];
  totalPrice: number;
  status?: 'Pending' | 'Paid' | 'Canceled';
  paymentUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
