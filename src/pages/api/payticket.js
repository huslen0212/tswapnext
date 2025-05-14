import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/lib/db"; // Та Prisma эсвэл өөр DB client ашиглаж байгаа бол тохируулна уу

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Нэвтрэх шаардлагатай." });

  const userEmail = session.user.email;

  try {
    const user = await db.user.findUnique({ where: { email: userEmail } });

    if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });

    if (user.balance < 500) {
      return res.status(400).json({ message: "Үлдэгдэл хүрэлцэхгүй байна." });
    }

    const newBalance = user.balance - 500;

    await db.user.update({
      where: { email: userEmail },
      data: { balance: newBalance },
    });

    return res.status(200).json({ message: "Амжилттай төлөгдлөө.", newBalance });
  } catch (err) {
    console.error("Payment error:", err);
    return res.status(500).json({ message: "Дотоод серверийн алдаа." });
  }
}
