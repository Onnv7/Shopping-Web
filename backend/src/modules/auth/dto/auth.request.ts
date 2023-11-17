import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SwaggerConstant } from '../../../common/constant/swagger.constant';

export class LoginRequest {
  @ApiProperty({
    description: SwaggerConstant.MIN_LENGTH_6,
    example: SwaggerConstant.USERNAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly username: string;

  @ApiProperty({
    description: SwaggerConstant.MIN_LENGTH_6,
    example: SwaggerConstant.PASSWORD_EX,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class SignInRequest {
  @ApiProperty({
    description: SwaggerConstant.MIN_LENGTH_6,
    example: SwaggerConstant.USERNAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly username: string;

  @ApiProperty({
    description: SwaggerConstant.MIN_LENGTH_6,
    example: SwaggerConstant.PASSWORD_EX,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.FIRST_NAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.LAST_NAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
