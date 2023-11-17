import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './schemas/category.schema';
import { GetCategoryByIdResponse } from './dto/category.response';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from './dto/category.request';
import { plainToInstance } from 'class-transformer';
import { validateObjectId } from '../../common/utils/validate_id';
import { StatusCode } from '../../common/constant/response.constant';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(category: CreateCategoryRequest): Promise<Category> {
    const data = plainToInstance(Category, category);

    return this.categoryRepository.createCategory(data);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  async getCategoryById(id: string): Promise<GetCategoryByIdResponse> {
    validateObjectId(id);
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) {
      throw new HttpException('Category not found', StatusCode.NOT_FOUND);
    }
    return category;
  }
  async deleteCategoryById(id: string): Promise<void> {
    const result = await this.categoryRepository.deleteCategoryById(id);

    if (!result) {
      throw new BadRequestException(`Delete category ${id} failed`);
    }
  }

  async updateCategoryById(
    id: string,
    category: UpdateCategoryRequest,
  ): Promise<void> {
    const result = await this.categoryRepository.updateCategoryById(
      id,
      category,
    );
    if (!result) {
      throw new BadRequestException(`Update category ${id} failed`);
    }
  }
}
