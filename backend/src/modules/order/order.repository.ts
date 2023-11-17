import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import mongoose, { Model } from 'mongoose';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { CreateOrderRequest } from './dto/order.request';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(order: Order): Promise<Order> {
    console.log(
      '🚀 ~ file: order.repository.ts:16 ~ OrderRepository ~ createOrder ~ order:',
      order,
    );
    return await this.orderModel.create(order);
  }

  async getAllOrdersByUserId(userId: string): Promise<Order[]> {
    return await this.orderModel.find({ userId });
  }
  async updateOrderStatusById(
    id: string,
    orderStatus: OrderStatus,
  ): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, { orderStatus });
  }

  async getOrderByUserIdAndStatus(
    userId: string,
    orderStatus: OrderStatus,
  ): Promise<Order[]> {
    const orders = await this.orderModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          orderStatus: orderStatus,
        },
      },
      {
        $addFields: {
          firstProduct: { $arrayElemAt: [{ $slice: ['$products', -1] }, 0] },
          itemSize: { $size: '$products' },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'firstProduct.productId',
          foreignField: '_id',
          as: 'firstProduct.data',
        },
      },
      { $unwind: '$firstProduct.data' },
      {
        $group: {
          _id: '$_id',
          totalPrice: { $first: '$totalPrice' },
          orderStatus: { $first: '$orderStatus' },
          createdAt: { $first: '$createdAt' },
          itemSize: { $first: '$itemSize' },
          imageUrl: { $first: '$firstProduct.data.image.imageUrl' },
          productName: { $first: '$firstProduct.data.name' },
          quantity: { $first: '$firstProduct.quantity' },
        },
      },
    ]);
    return orders;
  }

  async getOrderDetailsById(id: string): Promise<any> {
    const order = await this.orderModel.aggregate([
      {
        $match : { _id: new mongoose.Types.ObjectId(id)}
      },
      {
        $unwind: "$products"
      },
      {
        $lookup : { from: 'products', localField: 'products.productId', foreignField: '_id', as: 'products.productInfo' }
      },
      { $unwind: '$products.productInfo'},
      {
        $group: {
          _id: '$_id',
          totalPrice: {$first: '$totalPrice'},
          address: {$first: '$address'},
          phoneNumber: {$first: '$phoneNumber'},
          note: {$first: '$note'},
          createdAt: {$first: '$createdAt'},
          orderStatus: {$first: '$orderStatus'},
          products: {
            $push: {
              _id: '$products.productInfo._id',
              name: '$products.productInfo.name',
              imageUrl: '$products.productInfo.image.imageUrl',
              quantity: '$products.quantity',
              price: '$products.price',
            }
          },
        }
      },
    ]);
    return order.at(0);
  }
}
