import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Зөвхөн GET хүсэлт зөвшөөрөгдөнө' });
  }

  try {
    const newsItems = await prisma.news.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    res.status(200).json(newsItems);
  } catch (error) {
    console.error('Мэдээ татахад алдаа:', error);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
}
