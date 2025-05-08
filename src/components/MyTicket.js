import Image from 'next/image';
import styles from '../styles/MyTicket.module.css';

export default function MyTicket({ ticket }) {
  if (!ticket) return null;

  return (
    <div className={styles.ticketContainer}>
      <Image
        src={ticket.ticket_image || '/photos/ticket.jpeg'}
        alt={ticket.ticket_title || "Тасалбар"}
        width={350}
        height={150}
        className={styles.ticketImage}
      />

      <div className={styles.ticketInfo}>
        <p>Хаана: {ticket.place || "Байршил тодорхойгүй"}</p>
        <p>Хэзээ: {ticket.date ? new Date(ticket.date).toISOString().split('T')[0] : "Огноо байхгүй"}</p>
        <p>Тасалбарын төрөл: {ticket.ticket_category || "Төрөл тодорхойгүй"}</p>
        <p>Үнэ: {ticket.ticket_price}₮</p>
        <p>Худалдаалах хэлбэр: {ticket.ticket_type || "Төрөл тодорхойгүй"}</p>

        <div className={styles.ticketDescription}>
          <label>Тайлбар:</label>
          <textarea
            readOnly
            defaultValue={ticket.description || "Тайлбар байхгүй."}
          />
        </div>

        <button className={styles.editButton}>Засах</button>
        <button className={styles.deleteButton}>Устгах</button>
      </div>
    </div>
  );
}
