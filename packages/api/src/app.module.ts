import { Module }          from '@nestjs/common';
import { PrismaService }   from './prisma.service';
import { MenuController }  from './menu.controller';

@Module({
  controllers: [MenuController],
  providers:   [PrismaService],
  exports:     [PrismaService],
})
export class AppModule {}
