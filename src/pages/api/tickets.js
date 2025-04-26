import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    const { category } = req.query;

    const where = category && category !== 'all' 
      ? { ticket_category: category } 
      : {};

    const tickets = await prisma.tickets.findMany({ where });
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
