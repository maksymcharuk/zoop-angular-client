import { Status } from '../../../enums';
import { Category, Product } from '../../../interfaces';

export interface CatalogProduct {
  readonly _id: string;
  name: string;
  category: Category;
  products: Product[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
