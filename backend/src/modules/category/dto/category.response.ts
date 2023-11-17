import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetAllCategoryResponse {
  @Expose()
  id: string;
  @Expose()
  name: string;
}

@Exclude()
export class GetCategoryByIdResponse {
  @Expose()
  id: string;
  @Expose()
  name: string;
}
