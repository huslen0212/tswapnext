// pages/api/auth/logout.js
import { cookies } from 'next/headers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Delete the userEmail cookie
    res.setHeader('Set-Cookie', 'userEmail=; Max-Age=0; Path=/; SameSite=Lax');
    
    return res.status(200).json({ message: 'Logged out' });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
