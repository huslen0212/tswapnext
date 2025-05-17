import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
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

    if (req.method === "GET") {
      const wallet = await prisma.wallet.findUnique({
        where: { user_id: user.user_id },
        select: { wallet_balance: true },
      });

      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      return res.status(200).json({ balance: wallet.wallet_balance || 0.0 });

    } else if (req.method === "POST") {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Буруу дүн байна" });
      }

      const updatedWallet = await prisma.wallet.update({
        where: { user_id: user.user_id },
        data: {
          wallet_balance: {
            increment: amount,
          },
          recharged_date: new Date(),
        },
      });

      // 🟣 event dispatch logic ашиглавал дараах кодыг front-end талд дуудаж болно
      return res.status(200).json({
        message: "Данс амжилттай цэнэглэгдлээ",
        balance: updatedWallet.wallet_balance,
      });

    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }

  } catch (error) {
    console.error("Wallet API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
