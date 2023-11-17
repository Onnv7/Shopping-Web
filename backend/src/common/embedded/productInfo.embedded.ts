import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { SchemaTypes, Types } from 'mongoose';

@Schema({ _id: false })
export class ProductInfoEmbedded {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId: Types.ObjectId;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}
