import { Category, Product } from '.';
import { Status } from '../enums';

export interface AbstractProduct {
  readonly _id: string;
  name: string;
  category: Category;
  products: Product[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
