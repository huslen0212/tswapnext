import Image from 'next/image';
import styles from '../styles/SavedTicket.module.css';

export default function SavedTicket({ ticket, onClick, onDelete }) {
  if (!ticket) return null;

  const handleDelete = (e) => {
    e.stopPropagation();
    alert("Хадгалсан тасалбар амжилттай хасагдлаа!") 
      onDelete(ticket.ticket_id);
  };

  return (
    <div 
      className={styles.ticketContainer}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={ticket.ticket_image || "/photos/default-ticket.jpg"}
          alt="Ticket Image" 
          width={350} 
          height={150} 
          className={styles.ticketImage} 
        />
      </div>
      
      <div className={styles.ticketInfo}>
        <p>Хаана: {ticket.place || "Байршил тодорхойгүй"}</p>
        <p>Хэзээ: {ticket.date ? new Date(ticket.date).toISOString().split('T')[0] : "Огноо байхгүй"}</p>
        <p>Тасалбарын төрөл: {ticket.ticket_category || "Төрөл тодорхойгүй"}</p>
        <p>Үнэ: {ticket.ticket_price ? `${ticket.ticket_price.toLocaleString()}₮` : "Үнэ тодорхойгүй"}</p>
        <p>Худалдааны хэлбэр: {ticket.ticket_type || "Төрөл тодорхойгүй"}</p>

        <div className={styles.ticketDescription}>
          <label>Тайлбар:</label>
          <textarea readOnly defaultValue={ticket.description || "Тайлбар байхгүй"} />
        </div>

        <button 
          className={styles.deleteButton} 
          onClick={handleDelete}
        >
          Хасах
        </button>
      </div>
    </div>
  );
}