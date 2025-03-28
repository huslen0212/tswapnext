import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import styles from '../styles/face.module.css';
export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <h1>Тасалбараа хялбараар борлуул</h1>

        <div className={styles.searchContainer}>
          <input type="text" placeholder="Хайлт хийнэ үү" />
          <Image src="/photos/search.png" alt="Search Icon" width={24} height={24} className={styles.searchIcon} />
        </div>

        <div className={styles.categories}>
          {["Бүх төрөл", "Концерт", "Спорт", "Купон", "Эвент", "Бусад"].map((category, index) => (
            <button key={index}>{category}</button>
          ))}
        </div>

        <h2>Таньд санал болгох тасалбарууд</h2>
      </div>
      <Footer />
    </div>
  );
}
