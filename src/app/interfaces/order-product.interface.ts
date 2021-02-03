import { Product } from '.';

export interface OrderProduct {
  readonly _id: string;
  product: Product;
  quantity: number;
}
