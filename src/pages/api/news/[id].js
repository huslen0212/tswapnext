import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Зөвшөөрөгдөөгүй метод' });
  }

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID буруу эсвэл алга байна' });
  }

  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(id) },
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

    if (!news) {
      return res.status(404).json({ error: `Мэдээний мэдээлэл олдсонгүй (ID: ${id})` });
    }

    const formattedNews = {
      id: news.id.toString(),
      title: news.title,
      summary: news.summary,
      content: news.content,
      image_url: news.imageUrl,
      author: news.author || 'Нэргүй',
      created_at: news.createdAt,
    };

    res.status(200).json(formattedNews);
  } catch (error) {
    console.error('Мэдээ татахад алдаа:', error);
    res.status(500).json({ error: 'Серверийн алдаа: Мэдээллийг авахад алдаа гарлаа' });
  } finally {
    await prisma.$disconnect();
  }
}