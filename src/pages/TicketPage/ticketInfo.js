import Footer from '@/components/Footer';
import Header from '../../components/Header';
import Image from "next/image";
import styles from "../TicketPage/TicketInfoPage.module.css";

export default function TicketInfo() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <h1 className={styles.ticketTitle}>PlayTime Music Festival</h1>
        <section className={styles.ticketList}>
          <div className={styles.ticketContainer}>
            <Image src="/photos/ticket.jpeg" alt="PlayTime Ticket" width={400} height={150} className={styles.ticketImage} />
            <div className="ticket-info">
              <p>Хаана: Монгол шилтгээн</p>
              <p>Хэзээ: 2025 оны 07 сар 14 өдөр</p>
              <p>Тасалбарын төрөл: Хөгжмийн наадам</p>
              <p>Үнэ: 240,000₮</p>
            </div>
            <button className={styles.saveButton}>Хадгалах</button>
            <button className={styles.paymentButton}>Төлбөр төлөх</button>
          </div>
          <div className={styles.ticketDescription}>
            <label>Тайлбар:</label>
            <textarea readOnly defaultValue="PlayTime-ийн тасалбар 7 сарын 14, 15, 16-ны тасалбар зарна шүү. Үнэ тохирч болно. Энэ бол хөгжмийн наадам бөгөөд Монголын хамгийн том наадам юм." />
            <h3>Холбоо барих утас: 9999-9999</h3>
            <h3>Цахим шуудан: example@gmail.com</h3>
            <div className={styles.offerSection}>
              <textarea placeholder="Сэтгэгдэл бичнэ үү..."></textarea>
              <button className={styles.commentButton}>Илгээх</button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
