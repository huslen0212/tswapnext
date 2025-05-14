import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
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
      select: {
        wallet_balance: true,
      },
    });

    if (wallet) {
      return res.status(200).json({ balance: wallet.wallet_balance || 0.00 });
    } else {
      return res.status(404).json({ message: "Wallet not found" });
    }
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return res.status(500).json({ message: "Failed to fetch balance" });
  }
}
