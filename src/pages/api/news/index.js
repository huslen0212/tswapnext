import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Зөвшөөрөгдөөгүй метод' });
  }

  const { category } = req.query;

  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        summary: true,
        content: true,
        imageUrl: true,
        author: true,
        createdAt: true,
      },
    });

    const formattedNews = news.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      summary: item.summary,
      content: item.content,
      image_url: item.imageUrl,
      author: item.author || 'Нэргүй',
      created_at: item.createdAt,
    }));

    res.status(200).json(formattedNews);
  } catch (error) {
    console.error('Мэдээ татахад алдаа:', error);
    res.status(500).json({ error: 'Мэдээний мэдээлэл авахад алдаа гарлаа' });
  } finally {
    await prisma.$disconnect();
  }
}