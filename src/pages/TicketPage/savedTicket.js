import Footer from '@/components/Footer';
import Header from '../../components/Header';
import SavedTicket from '@/components/SavedTicket';
import styles from '../TicketPage/SavedTicketPage.module.css';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Savedticket() {
  const { data: session, status } = useSession();
  const [savedTickets, setSavedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSavedTickets() {
      try {
        if (status === "loading") {
          return; 
        }
  
        if (status === "unauthenticated") {
          setError('Хэрэглэгчийн мэдээлэл олдсонгүй.');
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/savedticket`);
        if (!res.ok) {
          throw new Error('Тасалбар авахад алдаа гарлаа.');
        }
        const data = await res.json();
        setSavedTickets(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedTickets();
  }, [status]);

  const handleTicketClick = (ticketId) => {
  router.push(`/TicketPage/ticketInfo?id=${ticketId}&fromSaved=true`);
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const res = await fetch(`/api/savedticket?ticketId=${ticketId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Тасалбар устгахад алдаа гарлаа.');
      }
      setSavedTickets((prev) =>
        prev.filter((saved) => saved.ticket.ticket_id !== ticketId)
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <div className={styles.headingContainer}>
          <h1>Таны хадгалсан тасалбар</h1>
        </div>

        <div className={styles.ticketContainer}>
          {loading || status ==="loading" ? (
            <p>Уншиж байна...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : savedTickets.length === 0 ? (
            <p>Таньд хадгалсан тасалбар байхгүй байна.</p>
          ) : (
            savedTickets.map((saved) => (
              <SavedTicket 
                key={saved.id} 
                ticket={saved.ticket} 
                onClick={() => handleTicketClick(saved.ticket.ticket_id)}
                onDelete={handleDeleteTicket}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
