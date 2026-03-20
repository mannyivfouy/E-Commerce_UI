import { Category } from './category.model';

export interface Product {
  _id?: string;
  productName: string;
  price: number;
  stock?: number;
  description: string;
  status?: boolean;
  category: string | Category;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
