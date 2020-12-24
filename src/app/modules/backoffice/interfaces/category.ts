import { Status } from '../enums';

export interface Category {
  readonly _id: string;
  name: string;
  parentCategory?: Category;
  description?: string;
  status: Status;
}
