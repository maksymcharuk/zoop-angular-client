import { AbstractProduct } from '.';
import { Status } from '../enums';

export interface Product {
  readonly _id: string;
  code: string;
  name: string;
  shortDescription: string;
  description: string;
  abstractProduct: AbstractProduct;
  price: number;
  imageUrl: string;
  stringId: string;
  color: string;
  height: string;
  width: string;
  weight: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
