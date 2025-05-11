import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ message: "Нэвтрээгүй байна." });
    }

    const { ticket_id, place, date, ticket_category, ticket_price, ticket_type, description } = req.body;

    const updatedTicket = await prisma.tickets.update({
      where: { ticket_id },
      data: {
        place,
        date: new Date(date),
        ticket_category,
        ticket_price: Number(ticket_price),
        ticket_type,
        description,
      },
    });

    return res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Тасалбар засах үед алдаа гарлаа:", error);
    return res.status(500).json({ message: "Тасалбар засахад алдаа гарлаа." });
  }
}
