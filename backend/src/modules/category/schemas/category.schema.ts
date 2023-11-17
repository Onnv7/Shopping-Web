import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import mongoose from 'mongoose';
import { Image } from '../../../common/embedded/image.embedded';

@Schema({ timestamps: true })
export class Category {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
