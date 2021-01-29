import { Status } from '../enums';

export interface Category {
  readonly _id: string;
  description: string;
  name: string;
  parentCategory: Category;
  status: Status;
  updatedAt: Date;
  createdAt: Date;
}
