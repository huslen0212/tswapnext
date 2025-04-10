import { prisma } from '../../../../lib/prisma'; // Assuming you have Prisma set up

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Find the user in the database by username
      const user = await prisma.users.findUnique({
        where: { email: username }, // Assuming the username is stored in the 'email' column
      });

      // If user is not found
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Directly compare the stored password with the entered password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Optionally, create a session or JWT token here for user authentication
      // Example: Returning a success message (or JWT token)
      return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
