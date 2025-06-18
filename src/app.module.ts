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
import { Point } from './typeorm/Point';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './auth/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'6911',
    database:'Club',
    entities:[User,Product,Order,Point],
    autoLoadEntities: true
  }),ConfigModule.forRoot({
      isGlobal: true, // ensures all modules can access config
      envFilePath: '.env', // make sure this path is correct
      load: [jwtConfig], // load your custom config
    }), UserModule, ProductModule, OrderModule, PointModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
