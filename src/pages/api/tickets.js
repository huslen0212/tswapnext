import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    const tickets = await prisma.tickets.findMany();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
