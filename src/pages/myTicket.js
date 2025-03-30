import Footer from '@/components/Footer';
import Header from '../components/Header';
import MyTicket from '@/components/MyTicket';
import styles from '../styles/MyTicketPage.module.css';


export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">

        <div className={styles.headingContainer}>
          <h1>Миний тасалбар</h1>
        </div>

        <div className={styles.ticketContainer}> 
          <MyTicket /> <MyTicket /> <MyTicket />
        </div>
        
      </div>
      <Footer />
    </div>
  );
}
