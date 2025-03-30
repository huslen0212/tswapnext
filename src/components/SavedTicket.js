import Image from 'next/image';
import styles from '../styles/Ticket.module.css';

export default function Ticket() {
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
          <textarea readOnly>
            PlayTime-ийн тасалбар 7 сарын 14, 15, 16-ны тасалбар зарна шүү. Үнэ тохирч болно.
          </textarea>
        </div>

        <button className={styles.deleteButton}>Хасах</button>
      </div>
    </div>
  );
}
