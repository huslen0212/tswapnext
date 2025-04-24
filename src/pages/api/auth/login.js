import { prisma } from '../../../../lib/prisma';
import { serialize } from 'cookie'; // ✅ Import cookie serializer

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Find the user by email (username)
      const user = await prisma.users.findUnique({
        where: { email: username },
      });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // ✅ Set cookie: userEmail
      const cookie = serialize('userEmail', user.email, {
        httpOnly: false, // Set to true if you want it unreadable by JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      res.setHeader('Set-Cookie', cookie);

      // Success response
      return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
