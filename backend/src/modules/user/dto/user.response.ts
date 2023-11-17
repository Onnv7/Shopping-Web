import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserByIdResponse {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
}
