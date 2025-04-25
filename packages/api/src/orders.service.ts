import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { scheduleOrder } from './kitchen-engine/scheduler';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { item: true } } },
    });
  }

  async create(dto: { bay: number; items: { id: string; qty: number }[] }) {
    const menu = await this.prisma.menuItem.findMany({
      where: { id: { in: dto.items.map(i => i.id) } },
    });

    const scheduled = scheduleOrder(dto.items, menu);

    return this.prisma.order.create({
      data: {
        bay: dto.bay,
        status: 'NEW',
        items: {
          create: scheduled.map(s => ({
            itemId: s.id,
            qty:    s.qty,
            fireAt: s.fireAt,
          })),
        },
      },
      include: { items: { include: { item: true } } },
    });
  }
}
