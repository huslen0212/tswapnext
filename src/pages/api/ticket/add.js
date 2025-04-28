// /pages/api/ticket.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { place, date, ticket_category, price, description } = req.body;

    if (!place || !date || !ticket_category || !price || !description) {
      return res.status(400).json({ error: 'Бүх талбаруудыг бөглөнө үү.' });
    }

    try {
      const ticket = await prisma.ticket.create({
        data: {
          place,
          date,
          ticket_category,
          price,
          description,
        },
      });
      return res.status(201).json(ticket);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Серверийн алдаа' });
    }
  } else {
    res.status(405).json({ error: 'Метод зөвшөөрөгдөөгүй' });
  }
}
