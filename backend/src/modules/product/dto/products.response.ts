import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetProductByIdResponse {
  @Expose()
  @Transform((params) => params.obj._id)
  id: string;
  @Expose()
  name: string;
  @Expose()
  price: number;
  @Expose()
  description: string;
  @Expose()
  imageUrl: string;
}

@Exclude()
export class GetAllProductsResponse {
  @Expose()
  @Transform((params) => params.obj._id)
  id: string;
  @Expose()
  name: string;
  @Expose()
  price: number;
  @Expose()
  imageUrl: string;
}
