import { prisma } from '../../../../lib/prisma';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: parseInt(id),
      },
      select: {
        email: true,
        phone_number: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('User info fetch error:', error);
    res.status(500).json({ message: 'Алдаа гарлаа' });
  }
}
