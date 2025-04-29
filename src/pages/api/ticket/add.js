import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      ticket_title,
      ticket_type,
      ticket_category,
      place,
      description,
      date,
      ticket_price,
      ticket_image,
      ticket_status
    } = req.body;

    // Талбарууд дутуу эсэхийг шалгах
    if (
      !ticket_title ||
      !ticket_type ||
      !ticket_category ||
      !place ||
      !description ||
      !date ||
      !ticket_price ||
      !ticket_image ||
      !ticket_status
    ) {
      return res.status(400).json({ error: 'Бүх талбаруудыг бөглөнө үү.' });
    }

    try {
      const ticket = await prisma.ticket.create({
        data: {
          ticket_title,
          ticket_type,
          ticket_category,
          place,
          description,
          date,
          ticket_price,
          ticket_image,
          ticket_status,
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
