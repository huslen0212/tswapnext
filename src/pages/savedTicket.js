
import Footer from '@/components/Footer';
import Header from '../components/Header';
import SavedTicket from '@/components/SavedTicket';
import styles from '../styles/SavedTicketPage.module.css';
import { useState } from 'react';

export default function Home() {
  const [tickets, setTickets] = useState([1, 2, 3,]);

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket !== id));
  };

  return (
    <div className="pageContainer">
      <Header />
      <div className="content">

        <div className={styles.headingContainer}>
          <h1>Таны хадгалсан тасалбар</h1>
        </div>

        <div className={styles.ticketContainer}> 
        {tickets.length === 0 ? (
            <p>Таньд хадгалсан тасалбар байгхүй байна.</p>
          ) : (
            tickets.map((ticketId) => (
              <SavedTicket key={ticketId} ticketId={ticketId} onDelete={handleDeleteTicket} />
            ))
          )}
        </div>
        
      </div>
      <Footer />
    </div>
  );
}
