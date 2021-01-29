import { DeliveryType, OrderStatus } from '../enums';
import { OrderProduct } from './order-product.interface';

export interface Order {
  readonly _id: string;
  owner: any;
  recieverDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryDetails: {
    type: DeliveryType;
    address: string;
    city: string;
    state: string;
    details: string;
  };
  products: OrderProduct[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
