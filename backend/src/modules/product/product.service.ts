import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './schemas/product.schema';
import {
  CreateProductRequest,
  UpdateProductRequest,
} from './dto/product.request';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryConstant } from '../../common/constant/cloudinary.constant';
import { Image } from '../../common/embedded/image.embedded';
import { StatusCode } from '../../common/constant/response.constant';
import { isValidObjectId } from 'mongoose';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cloudinayService: CloudinaryService,
    private readonly categoryService: CategoryService,
  ) {}

  async createProduct(
    product: CreateProductRequest,
    image: Express.Multer.File,
  ): Promise<Product> {
    await this.categoryService.getCategoryById(product.categoryId);

    const uploadedImage = await this.cloudinayService.uploadFile(
      image,
      CloudinaryConstant.PRODUCT_PATH,
    );

    const productImage = {
      publicId: uploadedImage.public_id,
      imageUrl: uploadedImage.url,
    } as Image;

    const data = {
      ...product,
      image: productImage,
    } as unknown as Product;

    return await this.productRepository.createProduct(data);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id: string): Promise<Product> {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid Product ID ', StatusCode.BAD_REQUEST);

    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new HttpException('Product not found', StatusCode.NOT_FOUND);
    }
    return product;
  }

  async getProductsByCategoryId(id: string): Promise<Product[]> {

    const product = await this.productRepository.getProductsByCategoryId(id);
    if (!product) {
      throw new HttpException('Product not found', StatusCode.NOT_FOUND);
    }
    return product;
  }
  async deleteProductById(id: string): Promise<void> {
    const result = await this.productRepository.deleteProductById(id);
    if (!result) {
      throw new BadRequestException(`Delete ${id} is failed`);
    }
  }

  async updateProductById(
    id: string,
    image: Express.Multer.File,
    data: UpdateProductRequest,
  ): Promise<void> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new HttpException('Product not found', StatusCode.NOT_FOUND);
    }
    let productImage = null;
    if (image) {
      await this.cloudinayService.deleteFileFromPublicId(
        product.image.publicId,
      );
      const uploadedImage = await this.cloudinayService.uploadFile(
        image,
        CloudinaryConstant.PRODUCT_PATH,
      );
      productImage = {
        publicId: uploadedImage.public_id,
        imageUrl: uploadedImage.url,
      } as Image;
    }

    const productInfo = {
      ...data,
      image: productImage ?? undefined,
    } as Product;
    const result = await this.productRepository.updateProductById(
      id,
      productInfo,
    );

    if (!result) {
      throw new BadRequestException(`Update ${id} is failed`);
    }
  }
}
