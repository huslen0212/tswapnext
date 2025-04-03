
import Image from 'next/image'; // Next.js-ийн Image компонент
import styles from '../styles/Charger.module.css'; // CSS модуль

const Charger = () => {
  return (
    <main className={styles.main}>
      <div className={styles.charhis}>
        <h2>Данс цэнэглэлтийн түүх</h2>
        <p>→ 2025 оны 1 сарын 15 өдөр (13 цаг 14 минут)</p>
      </div>
      <div className={styles.charger}>
        <h2>Данс цэнэглэх</h2>
        <p>Сайн байна уу? Та дансаа цэнэглэх бол доорх данснаас сонгон шилжүүлнэ үү.</p>
        <a className={styles.khan} href="https://e.khanbank.com/auth/login" target="_blank" rel="noopener noreferrer">
          <Image src="/photos/khan.png" alt="Khan Bank Logo" width={50} height={50} />
          <p>5822368699 Данс эзэмшигчийн нэр: Tswap</p>
        </a>
        <a className={styles.golomt} href="https://egolomt.mn/" target="_blank" rel="noopener noreferrer">
          <Image src="/photos/golomt.jpeg" alt="Golomt Bank Logo" width={50} height={50} />
          <p>5822368699 Данс эзэмшигчийн нэр: Tswap</p>
        </a>
        <a className={styles.tdb} href="https://www.etdbm.mn/en/" target="_blank" rel="noopener noreferrer">
          <Image src="/photos/tdbb.jpeg" alt="TDB Bank Logo" width={50} height={50} />
          <p>5822368699 Данс эзэмшигчийн нэр: Tswap</p>
        </a>
        <p className={styles.alert}>
          Та төлбөрөө баталгаажуулахдаа <b>656587</b> дугаарыг гүйлгээний утга дээрээ заавал оруулна уу.
        </p>
        <p className={styles.sanamj}>
          Дээрх дугаарыг оруулаагүй нөхцөлд төлбөрийн баталгаажуулалт хийх боломжгүй болно.
        </p>
      </div>
    </main>
  );
};

export default Charger;