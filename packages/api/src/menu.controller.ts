import { Controller, Get } from '@nestjs/common';
import { PrismaService }   from './prisma.service';

@Controller('menu')
export class MenuController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.menuItem.findMany();
  }
}
