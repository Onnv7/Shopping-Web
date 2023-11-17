import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SwaggerConstant } from '../../../common/constant/swagger.constant';

export class ProductInfo {
  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRODUCT_ID_EX,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.QUANTITY_EX,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRICE_EX,
  })
  @IsNumber()
  price: number;
}

export class CreateOrderRequest {
  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.USER_ID_EX,
  })
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    type: [ProductInfo],
  })
  @IsNotEmpty()
  readonly products: ProductInfo[];

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRICE_EX,
  })
  @IsNumber()
  readonly totalPrice: number;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.ADDRESS_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PHONE_NUMBER_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.NOTE_EX,
  })
  @IsString()
  readonly note: string;
}
