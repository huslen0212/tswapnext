import { prisma } from '../../../lib/prisma';
import formidable from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/photos'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        res.status(500).json({ error: 'Зураг хүлээн авахад алдаа гарлаа' });
        return;
      }

      const { title, summary, content, author } = fields;
      const uploadedImage = files.image?.[0];
      const imagePath = uploadedImage ? `/photos/${uploadedImage.newFilename}` : null;

      try {
        const created = await prisma.news.create({
          data: {
            title: title?.[0] || '',
            summary: summary?.[0] || '',
            content: content?.[0] || '',
            author: author?.[0] || '',
            image_url: imagePath,
          },
        });

        res.status(201).json(created);
        return; 
      } catch (error) {
        console.error('Хадгалах үед алдаа гарлаа:', error);
        res.status(500).json({ error: 'Хадгалах үед алдаа гарлаа' });
        return;
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
