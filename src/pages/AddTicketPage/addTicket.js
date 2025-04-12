import Footer from '@/components/Footer';
import Header from '../../components/Header';
import TicketPhoto from '@/components/TicketPhoto';
import EventForm from '@/components/EventForm';
import DescriptionForm from '@/components/DescriptionForm';
import styles from '../../styles/addTicket.module.css';

export default function addTicket() {
  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.content}>
       <section classNeme={styles.TicketForm}>
       <h1 style={{ color: 'rgb(6, 6, 125)' }}>Борлуулах тасалбараа нэмнэ үү:</h1>
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
