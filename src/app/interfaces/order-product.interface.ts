import { Product } from './product.interface';

export interface OrderProduct {
  readonly _id: string;
  product: Product;
  quantity: number;
}
