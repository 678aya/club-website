import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './typeorm/User';
import { ProductModule } from './product/product.module';
import { Order } from './typeorm/Order';
import { Product } from './typeorm/Product';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'6911',
    database:'Club',
    entities:[User,Product,Order],
    synchronize:true,
    autoLoadEntities: true
  }), UserModule, ProductModule, OrderModule, PointModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
