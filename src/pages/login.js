import Image from 'next/image';
import styles from '../styles/LoginPage.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="pageContainer">
      <div className="content">
        <div className={styles.leftside}>
          <Image src="/photos/concert.png" alt="concert" width={700} height={240}/>
          <Image src="/photos/movie.jpg" alt="movie" width={700} height={243}/>
          <Image src="/photos/sport.jpg" alt="sport" width={700} height={243}/>
        </div>

        <div className={styles.rigthside}>
            <h1>Нэвтрэх</h1>
            <form className={styles.loginForm}>
              <input type="text" id="username" placeholder="Нэвтрэх нэр" required />

              <input type="password" id="password" placeholder="Нууц үг" required />

              <button type="submit">Нэвтрэх</button>
            </form>
            <p>Шинэ хэрэглэгч болох: <Link href="/register">Бүртгүүлэх</Link></p>
        </div>
      </div>
    </div>
  );
}
