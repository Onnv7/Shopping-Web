import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SwaggerConstant } from '../../../common/constant/swagger.constant';

export class UpdateUserRequest {
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

export class UpdatePasswordRequest {
  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PASSWORD_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PASSWORD_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
