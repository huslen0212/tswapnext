import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '../../components/Header';
import Image from "next/image";
import styles from "../TicketPage/TicketInfoPage.module.css";
import { useSession } from 'next-auth/react';

export default function TicketInfo() {
  const router = useRouter();
  const { id, fromSaved } = router.query;
  const { data: session } = useSession();
  const [ticket, setTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaved, setIsSaved] = useState(fromSaved === 'true'); // State to track if ticket is saved

  useEffect(() => {
    if (!id) return;
    async function fetchTicket() {
      try {
        const res = await fetch(`/api/ticket/${id}`);
        if (!res.ok) {
          throw new Error('Тасалбарын мэдээлэл авахад алдаа гарлаа.');
        }
        const data = await res.json();
        setTicket(data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Тасалбарын мэдээлэл авахад алдаа гарлаа.');
      }
    }
    fetchTicket();
  }, [id]);

  async function handleSaveTicket() {
    try {
      if (!session) {
        alert('Хэрэглэгч ороогүй байна. Нэвтэрч орно уу.');
        return;
      }

      const res = await fetch(`/api/savedticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          ticketId: ticket.ticket_id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || 'Тасалбар хадгалах үед алдаа гарлаа.');
        return;
      }

      setIsSaved(true); // Mark ticket as saved
      alert('Тасалбар амжилттай хадгалагдлаа!');
    } catch (error) {
      console.error(error);
      alert('Хадгалах үед алдаа гарлаа.');
    }
  }

  async function handleDeleteSavedTicket() {
    try {
      const res = await fetch(`/api/savedticket?ticketId=${ticket.ticket_id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Хадгалсан тасалбар устгахад алдаа гарлаа.');
      }
      setIsSaved(false); // Mark ticket as not saved
      alert('Амжилттай устгагдлаа!'); // устгасны дараа хадгалсан тасалбарууд руу буцаана
    } catch (error) {
      console.error(error);
      alert('Устгах үед алдаа гарлаа.');
    }
  }

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

            {/* --- Энд хадгалах эсвэл хасах товч харуулна --- */}
            {isSaved ? (
              <button className={styles.deleteButton} onClick={handleDeleteSavedTicket}>
                Хасах
              </button>
            ) : (
              <button className={styles.saveButton} onClick={handleSaveTicket}>
                Хадгалах
              </button>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {/* --- --- */}

            <button className={styles.paymentButton}>Төлбөр төлөх</button>
          </div>

          <div className={styles.ticketDescription}>
            <label>Тайлбар:</label>
            <textarea readOnly defaultValue={ticket.description || "Тайлбар байхгүй"} />
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
