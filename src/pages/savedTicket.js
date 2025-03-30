import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '../components/Header';
import SavedTicket from '@/components/SavedTicket';
import styles from '../styles/SavedTicket.module.css';
import pageStyles from '../styles/SavedTicketPage.module.css';

export default function Home() {
  const [tickets, setTickets] = useState([1, 2, 3]);

  const handleDelete = (index) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  return (
    <div className="pageContainer">
      <Header />
      <h2 className={styles.title}>Хадгалсан тасалбар</h2>
      <div className={pageStyles.ticketContainer}> 
        {tickets.map((_, index) => (
          <SavedTicket key={index} onDelete={() => handleDelete(index)} />
        ))}
      </div>
      <Footer />
    </div>
  );
}