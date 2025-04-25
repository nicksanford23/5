import { PrismaClient } from '@prisma/client';
import menu from './menu.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany(); // clear for repeatable runs

  for (const m of menu) {
    await prisma.menuItem.create({
      data: {
        id:         m.id,
        name:       m.name,
        station:    m.station,
        cookTime:   m.cookTime,
        priceCents: Math.round(m.price * 100)
      }
    });
  }
  console.log(`🌱  Seeded ${menu.length} menu items`);
}

main().finally(() => prisma.$disconnect());