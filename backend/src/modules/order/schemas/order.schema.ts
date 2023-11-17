import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { OrderStatus } from '../../../common/enums/order-status.enum';
import { Product } from '../../product/schemas/product.schema';
import { ProductInfo } from '../dto/order.request';
import { ProductInfoEmbedded } from '../../../common/embedded/productInfo.embedded';

@Schema({ timestamps: true })
export class Order {
  _id?: mongoose.Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop([{ type: ProductInfoEmbedded }])
  products: ProductInfoEmbedded[];

  @Prop({ type: 'number' })
  totalPrice: number;

  @Prop({ type: 'string', enum: [OrderStatus] })
  orderStatus: OrderStatus;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
