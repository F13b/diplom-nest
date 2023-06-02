import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  create(@Body() params: {
    userId: number,
    statusId: number,
    carId: number
  }) {
    return this.ordersService.create({
      Users: {
        connect: {
          id: params.userId
        }
      },
      Status: {
        connect: {
          id: params.statusId
        }
      },
      Car: {
        connect: {
          id: params.carId
        }
      },
      date: new Date()
    });
  }

  @Get()
  findAll() {
    return this.ordersService.findAll({});
  }

  @Get('/user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.ordersService.findAll({where: {userId: Number(userId)}});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne({id: id});
  }

  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body() params: {
        userId: number,
        statusId: number,
        carId: number
      }) {
    console.log(params)
    return this.ordersService.update(
        {id: id},
        {
          Users: {
            connect: {
              id: params.userId
            }
          },
          Status: {
            connect: {
              id: params.statusId
            }
          },
          Car: {
            connect: {
              id: params.carId
            }
          },
          date: new Date()
        }
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove({id: id});
  }
}
