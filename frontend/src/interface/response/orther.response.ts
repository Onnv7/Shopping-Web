import { OrderStatus } from "../../enums/OrderStatus.enum";

export interface GetAllOrderHistoryByUserIdAnd {
  id: string;
  productName: string;
  orderStatus: OrderStatus;
  imageUrl: string;
  totalPrice: number;
  itemSize: number;
  quantity: number;
  createdAt: Date;
}

export interface ProductDetails {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}
export interface GetOrderDetailsById {
  id: string;
  totalPrice: number;
  address: string;
  phoneNumber: string;
  note: string;
  createdAt: Date;
  orderStatus: OrderStatus;
  products: ProductDetails[];
}
