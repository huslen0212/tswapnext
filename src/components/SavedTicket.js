// SavedTicket.js
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/SavedTicket.module.css';
import Modal from './modal';  // Make sure this matches the export (default export)

export default function SavedTicket({ ticket, onClick, onDelete }) {
  if (!ticket) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);  // Modal-ийг нээж байна
  };

  const handleConfirmDelete = () => {
    onDelete(ticket.ticket_id);
    setShowModal(false);  // Modal-ийг хаана
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Modal-ийг хаана
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

      {/* Modal-ийг харуулах */}
      <Modal 
        show={showModal} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
}
