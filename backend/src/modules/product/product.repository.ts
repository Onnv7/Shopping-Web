import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose, { Model } from 'mongoose';
import path from 'path';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async findProductById(id: string): Promise<Product> {
    return await this.productModel.findById(id).select({
      enabled: 0,
    });
  }
  // =================================================================
  async createProduct(product: Product): Promise<Product> {
    return await this.productModel.create(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.aggregate([
      {
        $match: {
          enabled: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          imageUrl: '$image.imageUrl',
        },
      },
    ]);
  }
  async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
    return await this.productModel.aggregate([
      {
        $match: {
          enabled: true,
          categoryId:  new mongoose.Types.ObjectId(categoryId),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          imageUrl: '$image.imageUrl',
        },
      },
    ]);
  }
  async getProductById(id: string): Promise<Product> {
    // return await this.productModel.findById(id).
    const result = (
      await this.productModel.aggregate([
        {
          $match: {
            $and: [{ enabled: true }, { _id: new mongoose.Types.ObjectId(id) }],
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            description: 1,
            imageUrl: '$image.imageUrl',
          },
        },
      ])
    ).at(0);

    return result;
  }

  async deleteProductById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async updateProductById(id: string, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(
      id,
      { ...product },
      { new: true },
    );
  }
}
