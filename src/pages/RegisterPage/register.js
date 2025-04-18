import Image from 'next/image';
import styles from '../RegisterPage/RegisterPage.module.css';

export default function register() {
  return (
    <div className="pageContainer">
      <div className="content">
        <div className={styles.leftside}>
          <Image src="/photos/concert.png" alt="concert" width={700} height={240}/>
          <Image src="/photos/movie.jpg" alt="movie" width={700} height={243}/>
          <Image src="/photos/sport.jpg" alt="sport" width={700} height={243}/>
        </div>

        <div className={styles.rigthside}>
            <h1>Бүртгүүлэх</h1>
            <form className={styles.loginForm}>
              <input type="text" id="username" placeholder="Овог" required />
              <input type="text" id="username" placeholder="Нэр" required />
              <input type="text" id="username" placeholder="Утасны дугаар" required />
              <input type="text" id="username" placeholder="Цахим шуудан" required />
              <input type="password" id="password" placeholder="Нууц үг" required />

              <button type="submit">Бүртгүүлэх</button>
            </form>
        </div>
      </div>
    </div>
  );
}
