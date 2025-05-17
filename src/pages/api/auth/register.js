import { prisma } from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { last_name, first_name, phone_number, email, password } = req.body;

    try {
      const existingUser = await prisma.users.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Цахим шуудан бүртгэлтэй байна!' });
      }

      const newUser = await prisma.users.create({
        data: {
          last_name,
          first_name,
          phone_number,
          email,
          password,
          wallet: {
            create: {
              wallet_balance: 0, 
              recharged_date: new Date() 
            }
          }
        },
        include: {
          wallet: true
        }
      });

      return res.status(201).json({
        message: 'Хэрэглэгч амжилттай бүртгэгдлээ',
        user: newUser
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Дотоод алдаа гарлаа' });
    }
  } else {
    res.status(405).json({ error: 'Зөвхөн POST хүсэлт дэмжигдэнэ' });
  }
}
