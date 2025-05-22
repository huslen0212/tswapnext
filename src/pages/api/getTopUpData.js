import { prisma } from '../../../lib/prisma'; // таны prisma client зам

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.wallet.findMany({
        where: {
          recharged_date: {
            not: null,
          },
          wallet_balance: {
            not: null,
          },
        },
        select: {
          user: {
            select: {
              email: true,
            },
          },
          wallet_balance: true,
          recharged_date: true,
        },
      });

      const formattedData = data.map(item => ({
        email: item.user.email,
        amount: item.wallet_balance,
        createdAt: item.recharged_date,
      }));

      res.status(200).json(formattedData);
    } catch (error) {
      console.error("API error:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
