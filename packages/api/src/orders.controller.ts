import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @Get()
  list() {
    return this.svc.getAll();
  }

  @Post()
  create(@Body() dto: { bay: number; items: { id: string; qty: number }[] }) {
    return this.svc.create(dto);
  }
}
