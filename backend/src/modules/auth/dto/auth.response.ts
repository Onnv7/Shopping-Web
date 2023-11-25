import { Exclude, Expose } from 'class-transformer';

export class LoginResponse {
  @Expose()
  userId: string;
  @Expose()
  token: string;
}

export class SignInResponse {
  @Expose()
  userId: string;
  @Expose()
  token: string;
}
