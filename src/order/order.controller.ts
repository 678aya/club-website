import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Status } from 'src/enums/status';
import { UpdateOrderAdminDto } from './dto/update-admin-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from 'src/auth/guards/refresh-auth/refresh-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/enums/roles';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Get('/createOrder/:productId')
  // create(@Body() amount : number,
  //        @Request() req : any,
  //        @Param('productId') productId : number) {
  //   const userid = req.user.id     
  //   return this.orderService.createOrder(userid,productId,amount);
  // }

  
  @Roles(Role.Player,Role.Admin,Role.Coach)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/setOrder/:productId')
  replace(@Request() req : any,
          @Param('productId') productId : number,
          @Body() createOrderDto : CreateOrderDto){
      const userid = req.user.id 
      return this.orderService.setOrder(userid,productId,createOrderDto)
  }

  @Roles(Role.Admin,Role.Player,Role.Coach)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  findAll(@Param('userName') name : string) {
    return this.orderService.findAll(name);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/search/status/:status')
  findByStatus(@Param('status') status: Status) {
    return this.orderService.findByStatus(status);
  }

  @Roles(Role.Player,Role.Admin,Role.Coach)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/updateByUser/:id')
  update(@Param('id') id: string,
         @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateByUser(+id, updateOrderDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/updateByAdmin/:id')
  updateByAdmin(@Param('id') id: string,
                @Body() updateOrderAdminDto: UpdateOrderAdminDto) {
    return this.orderService.updateByAdmin(+id, updateOrderAdminDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
