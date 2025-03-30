import Image from 'next/image';
import styles from '../styles/MyTicket.module.css';

export default function SavedTicket() {
  return (
    <div className={styles.ticketContainer}>
      <Image 
        src="/photos/ticket.jpeg" 
        alt="PlayTime Ticket" 
        width={350} 
        height={150} 
        className={styles.ticketImage} 
      />

      <div className={styles.ticketInfo}>
        <p>Хаана: Монгол шилтгээн</p>
        <p>Хэзээ: 2025 оны 07 сар 14 өдөр</p>
        <p>Тасалбарын төрөл: Хөгжмийн наадам</p>
        <p>Үнэ: 240,000₮</p>

        <div className={styles.ticketDescription}>
          <label>Тайлбар:</label>
          <textarea readOnly defaultValue="PlayTime-ийн тасалбар 7 сарын 14, 15, 16-ны тасалбар зарна шүү. Үнэ тохирч болно." />
        </div>

        <button className={styles.editButton}>Засах</button>
        <button className={styles.deleteButton}>Устгах</button>
      </div>
    </div>
  );
}
