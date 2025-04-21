import Footer from '@/components/Footer';
import Header from '../../components/Header';
import MyTicket from '@/components/MyTicket';
import styles from '../TicketPage/MyTicketPage.module.css';


export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">

        <div className={styles.headingContainer}>
          <h1>Танд санал болгох тасалбарууд </h1>
        </div>

        <div className={styles.ticketContainer}> 
          <MyTicket /> <MyTicket /> <MyTicket />
          <MyTicket /> <MyTicket /> <MyTicket />
        </div>
      </div>
      <Footer />
    </div>
  );
}
