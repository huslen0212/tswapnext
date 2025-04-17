import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    const wallets = await prisma.wallet.findMany();
    res.status(200).json(wallets);
  } catch (error) {
    console.error('Error fetching wallets:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
