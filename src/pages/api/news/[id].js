import { prisma } from '../../../../lib/prisma';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ error: 'ID буруу байна' });
  }

  switch (method) {
    case 'GET':
      try {
        const newsItem = await prisma.news.findUnique({
          where: { id: numericId },
        });

        if (!newsItem) {
          return res.status(404).json({ error: 'Мэдээ олдсонгүй' });
        }

        return res.status(200).json(newsItem);
      } catch (error) {
        console.error('GET алдаа:', error);
        return res.status(500).json({ error: 'Мэдээ авахад алдаа гарлаа' });
      }

    case 'PUT':
      try {
        const { title, summary, content, author } = req.body;

        const updatedNews = await prisma.news.update({
          where: { id: numericId },
          data: { title, summary, content, author },
        });

        return res.status(200).json(updatedNews);
      } catch (error) {
        console.error('PUT алдаа:', error);
        return res.status(500).json({ error: 'Засвар хадгалахад алдаа гарлаа' });
      }

    case 'DELETE':
      try {
        await prisma.news.delete({
          where: { id: numericId },
        });

        return res.status(200).json({ message: 'Мэдээ амжилттай устлаа' });
      } catch (error) {
        console.error('DELETE алдаа:', error);
        return res.status(500).json({ error: 'Устгах үед алдаа гарлаа' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} зөвшөөрөгдөөгүй` });
  }
}
