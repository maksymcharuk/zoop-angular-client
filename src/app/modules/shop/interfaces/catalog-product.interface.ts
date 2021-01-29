import { Status } from '../../../enums';
import { Category, Product } from '../../../interfaces';

export interface CatalogProduct {
  category: Category;
  name: string;
  products: Product[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
