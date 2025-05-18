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
import { deleteNewsById } from '@/lib/news'; 

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await deleteNewsById(id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Delete failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

