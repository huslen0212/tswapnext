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
  const [isSaved, setIsSaved] = useState(fromSaved === 'true');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState(null);

  useEffect(() => {
    if (!id || !session) return;

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

    const cached = localStorage.getItem(`ownerInfo-${id}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      const now = new Date().getTime();
      const isValid = now - parsed.timestamp < 30 * 60 * 1000;

      if (isValid && parsed.userEmail === session?.user?.email) {
        setOwnerInfo(parsed.data);
        setShowPaymentInfo(true);
      } else {
        localStorage.removeItem(`ownerInfo-${id}`);
      }
    }
  }, [id, session]);

  async function handleSaveTicket() {
    try {
      if (!session) {
        alert('Хэрэглэгч ороогүй байна. Нэвтэрч орно уу.');
        return;
      }

      if (session?.user?.email === ticket?.user?.email) {
        alert('Та өөрийн оруулсан тасалбараа хадгалаж болохгүй.');
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

      setIsSaved(true);
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
      setIsSaved(false);
      alert('Хадгалсан тасалбар амжилттай хасагдлаа!');
    } catch (error) {
      console.error(error);
      alert('Устгах үед алдаа гарлаа.');
    }
  }

  async function handlePaymentClick() {
    if (!ticket?.user_id) {
      alert('Тасалбарын эзэмшигчийн мэдээлэл алга.');
      return;
    }

    if (session?.user?.email === ticket?.user?.email) {
      alert('Та өөрийн оруулсан тасалбар дээр төлбөр төлж болохгүй.');
      return;
    }

    const paidKey = `ownerInfo-${ticket.ticket_id}`;
    const paidCache = localStorage.getItem(paidKey);

    if (paidCache) {
      const parsed = JSON.parse(paidCache);
      const now = new Date().getTime();
      const isValid = now - parsed.timestamp < 30 * 60 * 1000;
      if (isValid && parsed.userEmail === session?.user?.email) {
        alert('Та аль хэдийн энэ тасалбар дээр төлбөр төлсөн байна.');
        return;
      }
    }

    const confirmed = confirm('Төлбөр төлсний дараа таны данснаас 500₮ суутгагдана. Та зөвшөөрч байна уу?');
    if (!confirmed) return;

    try {
      const payRes = await fetch('/api/payment', { method: 'POST' });
      const payData = await payRes.json();

      if (!payRes.ok) {
        alert(payData.message || 'Төлбөрийн үед алдаа гарлаа.');
        return;
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event("balanceUpdated"));
      }

      const ownerRes = await fetch(`/api/userinfo/${ticket.user_id}`);
      if (!ownerRes.ok) throw new Error('Эзэмшигчийн мэдээлэл авахад алдаа гарлаа.');

      const ownerData = await ownerRes.json();
      setOwnerInfo(ownerData);
      setShowPaymentInfo(true);

      localStorage.setItem(paidKey, JSON.stringify({
        data: ownerData,
        timestamp: new Date().getTime(),
        userEmail: session?.user?.email,
      }));
    } catch (error) {
      console.error(error);
      alert('Алдаа гарлаа.');
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
              <p>Худалдаалах хэлбэр: {ticket.ticket_type || "Төрөл тодорхойгүй"}</p>
            </div>

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

            <button className={styles.paymentButton} onClick={handlePaymentClick}>
              Төлбөр төлөх
            </button>
          </div>

          <div className={styles.ticketDescription}>
            <label>Тайлбар:</label>
            <textarea readOnly defaultValue={ticket.description || "Тайлбар байхгүй"} />

            {showPaymentInfo && ownerInfo && (
              <div className={styles.paymentInfo}>
                <h3>Тасалбар эзэмшигчийн мэдээлэл:</h3>
                <p>Цахим шуудан: {ownerInfo.email}</p>
                <p>Утас: {ownerInfo.phone_number || 'Байхгүй'}</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
