import { OrderProduct } from './order-product.inteface';

export interface Cart {
  owner: string;
  totalPrice: number;
  products: OrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}
