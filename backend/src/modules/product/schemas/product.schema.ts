import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Image } from '../../../common/embedded/image.embedded';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: Image;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: true, required: false })
  enabled?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
