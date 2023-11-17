import { Date } from 'mongoose';
import { OrderStatus } from '../../../common/enums/order-status.enum';
import {Expose, Transform, Type} from 'class-transformer';

export class GetOrderByUserIdAndStatus {
  @Expose()
  @Transform((params) => params.obj._id)
  id: string;

  @Expose()
  orderStatus: OrderStatus;

  @Expose()
  productName: string;

  @Expose()
  imageUrl: string;

  @Expose()
  totalPrice: number;

  @Expose()
  itemSize: number;

  @Expose()
  quantity: number;

  @Expose()
  createdAt: Date;
}
export class ProductDetails {
  @Expose()
  @Transform((params) => params.obj._id)
  id: string;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;

  @Expose()
  quantity: string;

  @Expose()
  price: string;
}
export class GetOrderDetailsById {
  @Expose()
  @Transform((params) => params.obj._id)
  id: string;

  @Expose()
  totalPrice: number;

  @Expose()
  address: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  note: string;

  @Expose()
  createdAt: Date;

  @Expose()
  orderStatus: OrderStatus;


  @Expose()
  @Type(() => ProductDetails)
  products: ProductDetails[]
}
