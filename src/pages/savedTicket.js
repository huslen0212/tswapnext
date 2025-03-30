import Footer from '@/components/Footer';
import Header from '../components/Header';
import SavedTicket from '@/components/SavedTicket';
import styles from '../styles/SavedTicketPage.module.css';


export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">

        <div className={styles.headingContainer}>
          <h1>Таны хадгалсан тасалбар</h1>
        </div>

        <div className={styles.ticketContainer}> 
          <SavedTicket /> <SavedTicket /> <SavedTicket />
        </div>
        
      </div>
      <Footer />
    </div>
  );
}
