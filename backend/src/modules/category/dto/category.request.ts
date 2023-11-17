import { IsNotEmpty, IsString } from 'class-validator';
import { SwaggerConstant } from '../../../common/constant/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export class CreateCategoryRequest {
  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.CATEGORY_NAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // @ApiProperty({ type: 'string', format: 'binary', required: true })
  // // @IsNotEmpty()
  // readonly image: Express.Multer.File;
}

export class UpdateCategoryRequest {
  @ApiProperty({
    description: SwaggerConstant.NOT_EMPTY,
    example: SwaggerConstant.CATEGORY_NAME_EX,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // @ApiProperty({
  //   description: SwaggerConstant.NOT_EMPTY,
  //   example: SwaggerConstant.CATEGORY_IMAGE_EX,
  // })
  // @IsNotEmpty()
  // @IsString()
  // readonly imageUrl: string;
}
