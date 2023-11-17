import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { SwaggerConstant } from '../../../common/constant/swagger.constant';
import { Optional } from '@nestjs/common';

export class CreateProductRequest {
  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRODUCT_NAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRICE_EX,
  })
  @IsNotEmpty()
  @IsNumberString({}, { message: 'Is number' })
  readonly price: number;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRODUCT_DESC_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.OBJECT_ID_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly categoryId: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  // @IsNotEmpty()
  readonly image: Express.Multer.File;
}

export class UpdateProductRequest {
  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRODUCT_NAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRICE_EX,
  })
  @IsNotEmpty()
  @IsNumberString({}, { message: 'Is number' })
  readonly price: number;

  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.PRODUCT_DESC_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly image: Express.Multer.File;
}
