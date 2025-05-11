import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Session-аар хэрэглэгчийг хайж олно
  const user = await prisma.users.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.method === 'GET') {
    try {
      res.status(200).json(user); // хэрэглэгчийн мэдээлэл буцаана
    } catch (error) {
      console.error('Алдаа:', error);
      res.status(500).json({ message: 'Серверийн алдаа' });
    }
  } else if (req.method === 'PUT') {
    const { first_name, last_name, phone_number, home_address, email } = req.body;

    try {
      const updatedUser = await prisma.users.update({
        where: { user_id: user.user_id }, // анхаар: та id биш user_id гэж ашиглаж байна!
        data: { first_name, last_name, phone_number, home_address, email },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Шинэчлэх алдаа:', error);
      res.status(500).json({ message: 'Серверийн алдаа' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
