import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.email) {
        return res.status(401).json({ message: "Нэвтрээгүй байна" });
      }

      const user = await prisma.users.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      }

      const { ticketId } = req.body;

      const existingSavedTicket = await prisma.savedTickets.findFirst({
        where: {
          user_id: user.user_id,
          ticket_id: ticketId,
        },
      });

      if (existingSavedTicket) {
        return res.status(400).json({ message: "Энэ тасалбар аль хэдийн хадгалагдсан байна." });
      }

      const savedTicket = await prisma.savedTickets.create({
        data: {
          user_id: user.user_id,
          ticket_id: ticketId,
        },
      });

      res.status(201).json(savedTicket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Тасалбар хадгалахад алдаа гарлаа" });
    }
  } else if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.email) {
        return res.status(401).json({ message: "Нэвтрээгүй байна" });
      }

      const user = await prisma.users.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      }

      const savedTickets = await prisma.savedTickets.findMany({
        where: { user_id: user.user_id },
        include: {
          ticket: true,
        },
      });

      res.status(200).json(savedTickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Хадгалсан тасалбаруудыг авахад алдаа гарлаа" });
    }
  } else if (req.method === 'DELETE') {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.email) {
        return res.status(401).json({ message: "Нэвтрээгүй байна" });
      }

      const user = await prisma.users.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      }

      const { ticketId } = req.query;

      if (!ticketId) {
        return res.status(400).json({ message: "ticketId параметр алга байна" });
      }

      await prisma.savedTickets.deleteMany({
        where: {
          user_id: user.user_id,
          ticket_id: parseInt(ticketId),
        },
      });

      res.status(200).json({ message: "Тасалбар амжилттай устгагдлаа" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Тасалбар устгахад алдаа гарлаа" });
    }
  } else {
    res.status(405).end();
  }
}
