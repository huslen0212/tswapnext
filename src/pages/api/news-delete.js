import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID илгээх шаардлагатай' });
    }

    try {
      await prisma.news.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({ message: 'Амжилттай устгагдлаа' });
    } catch (error) {
      console.error('Устгах үед алдаа:', error);
      return res.status(500).json({ error: 'Устгах үед алдаа гарлаа' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
