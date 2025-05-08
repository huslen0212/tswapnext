import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";
import Ticket from "@/components/Ticket";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ message: "Нэвтрээгүй байна." });
    }

    // Session-с авсан email-аар хэрэглэгчийг өгөгдлийн сангаас хайна
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
    }

    // user_id-г ашиглаж тасалбаруудыг авна
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
