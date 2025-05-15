const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.news.createMany({
    data: [
      {
        id: 1,
        title: 'Мэдээ 1',
        summary: 'Товч агуулга 1',
        content: 'Бүтэн агуулга 1',
        imageUrl: 'https://example.com/news1.jpg',
        author: 'Зохиогч 1',
        createdAt: new Date('2025-05-15'),
      },
      {
        id: 2,
        title: 'Мэдээ 2',
        summary: 'Товч агуулга 2',
        content: 'Бүтэн агуулга 2',
        imageUrl: 'https://example.com/news2.jpg',
        author: 'Зохиогч 2',
        createdAt: new Date('2025-05-14'),
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());