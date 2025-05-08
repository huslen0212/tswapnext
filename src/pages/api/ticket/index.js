import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.query;

  try {
    const tickets = await prisma.tickets.findMany({
      where: category && category !== 'all' ? { ticket_category: category } : {},
      orderBy: { date: 'asc' },
      select: {
        ticket_id: true,
        ticket_title: true,
        ticket_image: true,
        description: true,
        date: true,
        place: true,
        ticket_category: true,
        ticket_type: true,
      },
    });

    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
}
