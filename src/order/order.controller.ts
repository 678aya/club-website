import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Status } from 'src/enums/status';
import { UpdateOrderAdminDto } from './dto/update-admin-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/createOrder/:productId')
  create(@Body() amount : number,
         @Req() req : any,
         @Param('productId') productId : number) {
    const userid = req.user.id     
    return this.orderService.createOrder(userid,productId,amount);
  }

  @Post('/setOrder/:productId')
  replace(@Req() req : any,
          @Param('productId') productId : number,
          createOrderDto : CreateOrderDto){
      const userid = req.user.id 
      return this.orderService.setOrder(userid,productId,createOrderDto)
  }

  @Get('/search/allOrders/:userName')
  findAll(@Param('userName') name : string) {
    return this.orderService.findAll(name);
  }

  @Get('/search/status/:status')
  findByStatus(@Param('status') status: Status) {
    return this.orderService.findByStatus(status);
  }

  @Patch('/updateByUser/:id')
  update(@Param('id') id: string,
         @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateByUser(+id, updateOrderDto);
  }

  @Patch('/updateByAdmin/:id')
  updateByAdmin(@Param('id') id: string,
                @Body() updateOrderAdminDto: UpdateOrderAdminDto) {
    return this.orderService.updateByAdmin(+id, updateOrderAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
