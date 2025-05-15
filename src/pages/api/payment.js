import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { user_id: user.user_id },
    });

    if (!wallet || wallet.wallet_balance < 500) {
      return res.status(400).json({ message: "Үлдэгдэл хүрэлцэхгүй байна." });
    }

    const updatedWallet = await prisma.wallet.update({
      where: { user_id: user.user_id },
      data: {
        wallet_balance: {
          decrement: 500,
        },
      },
    });

    return res.status(200).json({
      message: "Төлбөр амжилттай",
      balance: updatedWallet.wallet_balance,
    });
  } catch (error) {
    console.error("Error in payForTicket:", error);
    return res.status(500).json({ message: "Алдаа гарлаа." });
  }
}
