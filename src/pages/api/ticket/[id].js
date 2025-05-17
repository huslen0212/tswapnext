import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ticket = await prisma.tickets.findUnique({
      where: { ticket_id: parseInt(id) },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Тасалбар олдсонгүй' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error('API алдаа:', error);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
}
