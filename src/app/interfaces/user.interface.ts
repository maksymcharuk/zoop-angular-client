export interface User {
  readonly _id: string;
  seller: boolean;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}
