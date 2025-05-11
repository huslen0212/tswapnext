import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Нэвтрээгүй байна." });
  }

  if (req.method === "GET") {
    try {
      const user = await prisma.users.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
      }

      const tickets = await prisma.tickets.findMany({
        where: {
          user_id: user.user_id,
        },
      });

      return res.status(200).json(tickets);
    } catch (error) {
      console.error("Миний тасалбаруудыг авахад алдаа гарлаа:", error);
      return res.status(500).json({ message: "Тасалбаруудыг авахад алдаа гарлаа." });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { ticketId } = req.body; // Body-с ticket ID авч байна

      if (!ticketId) {
        return res.status(400).json({ message: "Тасалбарын ID дутуу байна." });
      }

      // Устгах эрхийг зөвхөн тухайн хэрэглэгчид харьяалагддаг тасалбар дээр зөвшөөрнө
      const user = await prisma.users.findUnique({
        where: { email: session.user.email },
      });

      const ticket = await prisma.tickets.findUnique({
        where: { ticket_id: ticketId },
      });

      if (!ticket || ticket.user_id !== user.user_id) {
        return res.status(403).json({ message: "Устгах эрхгүй байна." });
      }

      await prisma.tickets.delete({
        where: { ticket_id: ticketId },
      });

      return res.status(200).json({ message: "Тасалбар амжилттай устгагдлаа." });
    } catch (error) {
      console.error("Тасалбар устгах үед алдаа гарлаа:", error);
      return res.status(500).json({ message: "Тасалбар устгахад алдаа гарлаа." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
