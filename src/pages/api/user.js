// pages/api/user.js

let mockUser = {
    firstName: 'Эрдэнэ',
    lastName: 'Бат',
    phone: '99119911',
    email: 'bat@example.com',
  };
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json(mockUser);
    } else if (req.method === 'PUT') {
      const { firstName, lastName, phone, email } = req.body;
  
      // Мэдээллийг шинэчилж байна
      mockUser = { firstName, lastName, phone, email };
  
      res.status(200).json(mockUser);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  