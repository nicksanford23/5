import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MenuController } from './menu.controller';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [MenuController, OrdersController],
  providers:   [PrismaService, OrdersService],
})
export class AppModule {}
