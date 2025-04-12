import Footer from '@/components/Footer';
import Header from '../../components/Header';
import TicketPhoto from '@/components/TicketPhoto';
import EventForm from '@/components/EventForm';
import DescriptionForm from '@/components/DescriptionForm';
import styles from '../../styles/addBuyTicket.module.css';

export default function addBuyTicket() {
  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.content}>
       <section classNeme={styles.TicketForm}>
       <h1 style={{ color: '#ff7022' }}>Хайх тасалбар нэмэх:</h1>
         <TicketPhoto />
         <EventForm />
       </section>
       <div className={styles.description}>
        <DescriptionForm/>
       </div>
      </div>
      <Footer />
    </div>
  );
}
