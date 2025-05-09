import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";
import formidable from 'formidable';
import path from 'path';


export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), '/public/photos'),
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ message: "Form parsing failed" });
    }

    // Authenticate user
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Find user in DB
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      ticket_title,
      ticket_type,
      ticket_category,
      place,
      description,
      date,
      ticket_price,
    } = fields;

    // Check and handle file upload
    const uploadedImage = files.ticket_image?.[0];
    if (!uploadedImage) {
      return res.status(400).json({ message: "Ticket image is required" });
    }

    const ticketImagePath = `/photos/${uploadedImage.newFilename}`;

    try {
      // Create ticket in database
      const newTicket = await prisma.tickets.create({
        data: {
          ticket_title: ticket_title?.[0] || '',
          ticket_type: ticket_type?.[0] || '',
          ticket_category: ticket_category?.[0] || '',
          place: place?.[0] || '',
          description: description?.[0] || '',
          date: date?.[0] ? new Date(date[0]) : new Date(),
          ticket_price: ticket_price?.[0] ? parseFloat(ticket_price[0]) : 0,
          ticket_image: ticketImagePath,
          ticket_status: 'available',
          user_id: user.user_id,
        },
      });

      return res.status(200).json(newTicket);
    } catch (error) {
      console.error("Error creating ticket:", error);
      return res.status(500).json({ message: "Failed to create ticket" });
    }
  });
}
