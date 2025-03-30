import Footer from '@/components/Footer';
import Header from '../components/Header';
import SavedTicket from '@/components/SavedTicket';
import styles from '../styles/SavedTicket.module.css';


export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <div className={styles.ticketContainer}> 
          <SavedTicket /> <SavedTicket /> <SavedTicket />
        </div>
      </div>
      <Footer />
    </div>
  );
}
