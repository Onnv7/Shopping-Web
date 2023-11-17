import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import {
  GetAllCategoryResponse,
  GetCategoryByIdResponse,
} from './dto/category.response';
import { plainToClass } from 'class-transformer';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from './dto/category.request';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(category: Category): Promise<Category> {
    return await this.categoryModel.create(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find().select({ name: 1 });
  }

  async getCategoryById(id: string): Promise<GetCategoryByIdResponse> {
    return await this.categoryModel.findById(id);
  }

  async deleteCategoryById(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndDelete(id);
  }

  async updateCategoryById(
    id: string,
    category: UpdateCategoryRequest,
  ): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(
      id,
      { ...category },
      { new: true },
    );
  }
}
