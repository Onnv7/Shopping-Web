import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorator/roles.decorator';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateOrderRequest } from './dto/order.request';
import { Public } from '../../common/decorator/public.decorator';
import { isValidObjectId } from 'mongoose';
import { SwaggerConstant } from '../../common/constant/swagger.constant';
import { ValidateObjectIdPipe } from '../../common/pipes/object-id.pipe';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { SerializerInterceptor } from '../../common/interceptors/serializer.interceptor';
import {GetOrderByUserIdAndStatus, GetOrderDetailsById} from './dto/order.response';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: SwaggerConstant.ORDER_CREATE_SUM,
    description: SwaggerConstant.ORDER_CREATE_DESC,
  })
  @Post()
  @Roles(Role.USER)
  async createOrder(@Body() body: CreateOrderRequest): Promise<Order> {
    return await this.orderService.createOrder(body);
  }

  @ApiOperation({
    summary: SwaggerConstant.ORDER_GET_BY_USER_ID_AND_STATUS_SUM,
    description: SwaggerConstant.ORDER_GET_BY_USER_ID_AND_STATUS_DESC,
  })
  @ApiQuery({
    name: 'status',
    enum: OrderStatus,
    description: 'Order status',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'User ID',
    example: '6123456789abcdef01234567',
  })
  @Get('/user/:userId')
  @UseInterceptors(new SerializerInterceptor(GetOrderByUserIdAndStatus))
  @Roles(Role.USER)
  async getOrderByUserIdAndStatus(
    @Param('userId', ValidateObjectIdPipe) id: string,
    @Query('status') orderStatus: OrderStatus,
  ): Promise<Order[]> {
    return await this.orderService.getOrderByUserIdAndStatus(id, orderStatus);
  }

  @ApiOperation({
    summary: SwaggerConstant.ORDER_GET_BY_ID_SUM,
    description: SwaggerConstant.ORDER_GET_BY_ID_DESC,
  })
  @UseInterceptors(new SerializerInterceptor(GetOrderDetailsById)  )
  @Get('/:orderId')
  @Roles(Role.USER)
  async getOrderDetailsById(
    @Param('orderId', ValidateObjectIdPipe) id: string,
  ): Promise<Order> {
    return await this.orderService.getOrderDetailsById(id);
  }

}
