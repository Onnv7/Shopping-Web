import { Prop } from '@nestjs/mongoose';

export class Image {
  @Prop()
  publicId: string;
  @Prop()
  imageUrl: string;
}
