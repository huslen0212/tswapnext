import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Зөвхөн GET хүсэлт зөвшөөрөгдөнө' });
  }

  try {
    const newsItem = await prisma.news.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!newsItem) {
      return res.status(404).json({ error: 'Мэдээ олдсонгүй' });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    console.error('Серверийн алдаа:', error);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
}
