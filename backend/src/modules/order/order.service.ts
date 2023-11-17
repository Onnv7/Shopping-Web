import { HttpException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './schemas/order.schema';
import { OrderStatus } from '../../common/enums/order-status.enum';
import mongoose, { isValidObjectId, mongo } from 'mongoose';
import { CreateOrderRequest, ProductInfo } from './dto/order.request';
import { ProductService } from '../product/product.service';
import { StatusCode } from '../../common/constant/response.constant';
import { UserService } from '../user/user.service';
import { Product } from '../product/schemas/product.schema';
import { ProductInfoEmbedded } from '../../common/embedded/productInfo.embedded';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async createOrder(order: CreateOrderRequest): Promise<Order> {
    await this.userService.getUserById(order.userId);

    const productInfo: ProductInfoEmbedded[] = [];

    const calculatorProduct = await Promise.all(
      order.products.map(async (product) => {
        const productDb = await this.productService.getProductById(
          product.productId,
        );
        if (product.price !== productDb.price) {
          throw new HttpException(
            "Invalid product's price",
            StatusCode.BAD_REQUEST,
          );
        }
        return productDb.price * product.quantity;
      }),
    );

    const realTotal = calculatorProduct.reduce(
      (total, price) => total + price,
      0,
    );

    if (order.totalPrice !== realTotal) {
      throw new HttpException(
        `Invalid total product's costs`,
        StatusCode.BAD_REQUEST,
      );
    }

    const data = {
      ...order,
      productInfo: productInfo,
      orderStatus: OrderStatus.CREATED,
    } as unknown as Order;

    return await this.orderRepository.createOrder(data);
  }

  async getAllOrdersByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepository.getAllOrdersByUserId(userId);
  }

  async updateOrderStatusById(id: string, status: OrderStatus): Promise<any> {
    return await this.orderRepository.updateOrderStatusById(id, status);

  }

  async getOrderByUserIdAndStatus(
    userId: string,
    status: OrderStatus,
  ): Promise<Order[]> {
    return await this.orderRepository.getOrderByUserIdAndStatus(userId, status);
  }

  async getOrderDetailsById(id: string): Promise<Order> {
    return await this.orderRepository.getOrderDetailsById(id);
  }
}
