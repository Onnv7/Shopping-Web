import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from './dto/category.request';
import { Category } from './schemas/category.schema';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorator/roles.decorator';
import { Public } from '../../common/decorator/public.decorator';

import { ValidateObjectIdPipe } from '../../common/pipes/object-id.pipe';
import { SerializerInterceptor } from '../../common/interceptors/serializer.interceptor';
import {
  GetAllCategoryResponse,
  GetCategoryByIdResponse,
} from './dto/category.response';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.ADMIN)
  @Post()
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    // @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateCategoryRequest,
  ): Promise<void> {
    await this.categoryService.createCategory(body);
  }

  @UseInterceptors(new SerializerInterceptor(GetAllCategoryResponse))
  @Public()
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @UseInterceptors(
    ClassSerializerInterceptor,
    new SerializerInterceptor(GetCategoryByIdResponse),
  )
  @Roles(Role.ADMIN)
  @Get('/:categoryId')
  async getCategoryById(
    @Param('categoryId', ValidateObjectIdPipe) categoryId: string,
  ): Promise<GetCategoryByIdResponse> {
    return await this.categoryService.getCategoryById(categoryId);
  }

  @Roles(Role.ADMIN)
  @Delete('/:categoryId')
  async deleteCategoryById(
    @Param('categoryId', ValidateObjectIdPipe) categoryId: string,
  ): Promise<void> {
    await this.categoryService.deleteCategoryById(categoryId);
  }

  @Roles(Role.ADMIN)
  @Put('/:categoryId')
  async updateCategoryById(
    @Param('categoryId', ValidateObjectIdPipe) categoryId: string,
    @Body() body: UpdateCategoryRequest,
  ): Promise<void> {
    await this.categoryService.updateCategoryById(categoryId, body);
  }
}
