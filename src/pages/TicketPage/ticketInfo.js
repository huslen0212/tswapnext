import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '../../components/Header';
import Image from "next/image";
import styles from "../TicketPage/TicketInfoPage.module.css";

export default function TicketInfo() {
  const router = useRouter();
  const { id } = router.query;

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchTicket() {
      const res = await fetch(`/api/ticket/${id}`);
      const data = await res.json();
      setTicket(data);
    }

    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <p>Уншиж байна...</p>;
  }

  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <h1 className={styles.ticketTitle}>{ticket.ticket_title || "Тасалбарын гарчиг алга"}</h1>
        <section className={styles.ticketList}>
          <div className={styles.ticketContainer}>
            <Image
              src={ticket.ticket_image || "/photos/default-ticket.jpg"}
              alt="Ticket Image"
              width={400}
              height={150}
              className={styles.ticketImage}
            />
            <div className="ticket-info">
              <p>Хаана: {ticket.place || "Байршил тодорхойгүй"}</p>
              <p>Хэзээ: {ticket.date ? new Date(ticket.date).toISOString().split('T')[0] : "Огноо байхгүй"}</p>
              <p>Тасалбарын төрөл: {ticket.ticket_category || "Төрөл тодорхойгүй"}</p>
              <p>Үнэ: {ticket.ticket_price ? `${ticket.ticket_price.toLocaleString()}₮` : "Үнэ тодорхойгүй"}</p>
            </div>
            <button className={styles.saveButton}>Хадгалах</button>
            <button className={styles.paymentButton}>Төлбөр төлөх</button> 
          </div>
          <div className={styles.ticketDescription}>
            <label>Тайлбар:</label>
            <textarea
              readOnly
              defaultValue={ticket.description || "Тайлбар байхгүй"}
            />
            <h3>Холбоо барих утас: 9999-9999</h3>
            <h3>Цахим шуудан: example@gmail.com</h3>
            <div className={styles.offerSection}>
              <textarea placeholder="Сэтгэгдэл бичнэ үү..." />
              <button className={styles.commentButton}>Илгээх</button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

//ticket.status === "sold" ? (

//if(ticketstatus==="sold"){



//if(guilgesn tsag == 30) {ticket.status='available'}