// pages/api/users.js
import { prisma } from '../../../lib/prisma';  // Adjust the import path as necessary

export default async function handler(req, res) {
  try {
    const users = await prisma.users.findMany();  // Model is called "User", not "users"
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}