import Header from '../components/Header';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
      <h1 className={styles.title}>Тасалбараа хялбараар борлуул</h1>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Хайлт хийнэ үү" />
          <Image src="/photos/search.png" alt="Search" width={20} height={20} className={styles.searchIcon} />
        </div>

        <div className={styles.categories}>
          {["Бүх төрөл", "Концерт", "Спорт", "Купон", "Эвент", "Бусад"].map((category, index) => (
            <button key={index}>{category}</button>
          ))}
        </div>

        <h2 className={styles.title}>Таньд санал болгох тасалбарууд</h2>
        <section className={styles.ticketList}>
          {[1, 2, 3].map((_, index) => (
            <Link key={index} href="/ticket">
              <div className={styles.ticket}>
                <Image src="/photos/ticket.jpeg" alt="PlayTime Music Festival" width={380} height={220} />
                <h3>PlayTime Music Festival</h3>
                <p>📅 2025 оны 07 сар 14 өдөр</p>
                <p>📍 Монгол шилтгээн</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <footer className={styles.footer}>
        <p><b>T Swap</b> - Тасалбараа зарах төгс шийдлийг T Swap платформоос</p>
        <p>Холбогдох утас: 9999-9999 | Цахим шуудан: example@gmail.com</p>
      </footer>
    </>
  );
}
