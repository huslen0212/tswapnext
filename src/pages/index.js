import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import styles from '../styles/IndexPage.module.css';
import Ticket from '@/components/Ticket';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <div className={styles.headingContainer}>
          <h1>Тасалбараа хялбараар борлуул</h1>
        </div>


        <div className={styles.searchContainer}>
          <input type="text" placeholder="Хайлт хийнэ үү" />
          <Image src="/photos/search.png" alt="Search Icon" width={24} height={24} className={styles.searchIcon} />
        </div>

        <div className={styles.categories}>
          {["Бүх төрөл", "Концерт", "Спорт", "Купон", "Эвент", "Бусад"].map((category, index) => (
            <button key={index}>{category}</button>
          ))}
        </div>

        <div className={styles.headingContainer}>
          <h1>Таньд санал болгох тасалбар</h1>
        </div>
        
        <div className={styles.ticketContainer}> 
          <Ticket /> <Ticket /> <Ticket />
        </div>

      </div>
      <Footer />
    </div>
  );
}
