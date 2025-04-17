import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    const orders = await prisma.orders.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
