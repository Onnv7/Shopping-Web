import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';

import { Product } from './schemas/product.schema';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/enums/role.enum';

import { Public } from '../../common/decorator/public.decorator';
import { ValidateObjectIdPipe } from '../../common/pipes/object-id.pipe';

import {
  CreateProductRequest,
  UpdateProductRequest,
} from './dto/product.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { SwaggerConstant } from '../../common/constant/swagger.constant';
import { SerializerInterceptor } from '../../common/interceptors/serializer.interceptor';
import {
  GetAllProductsResponse,
  GetProductByIdResponse,
} from './dto/products.response';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(new SerializerInterceptor(GetAllProductsResponse))
  @Public()
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @UseInterceptors(new SerializerInterceptor(GetProductByIdResponse))
  @Public()
  @Get('/:productId')
  async getProductById(
    @Param('productId', ValidateObjectIdPipe) id: string,
  ): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @UseInterceptors(new SerializerInterceptor(GetAllProductsResponse))
  @Public()
  @Get('/category/:categoryId')
  async getProductByCategoryId(
    @Param('categoryId', ValidateObjectIdPipe) categoryId: string,
  ): Promise<Product[]> {
    return await this.productService.getProductsByCategoryId(categoryId);
  }

  @Roles(Role.ADMIN)
  @ApiConsumes(SwaggerConstant.MULTIPART_FORM_DATA)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateProductRequest,
  ): Promise<void> {
    await this.productService.createProduct(body, image);
  }

  @Roles(Role.ADMIN)
  @Delete('/:productId')
  async deleteProductById(
    @Param('productId', ValidateObjectIdPipe) id: string,
  ): Promise<void> {
    await this.productService.deleteProductById(id);
  }

  @Roles(Role.ADMIN)
  @ApiConsumes(SwaggerConstant.MULTIPART_FORM_DATA)
  @UseInterceptors(FileInterceptor('image'))
  @Put('/:productId')
  async updateProductById(
    @Param('productId', ValidateObjectIdPipe) id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() body: UpdateProductRequest,
  ): Promise<void> {
    await this.productService.updateProductById(id, image, body);
  }
}
