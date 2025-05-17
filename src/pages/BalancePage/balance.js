import Footer from '@/components/Footer';
import Header from '../../components/Header';
import styles from "../../styles/balance.module.css";
import { useState } from 'react';

export default function Balance() {
  const [amount, setAmount] = useState(5000);

  const handleInputChange = (e) => {
    setAmount(Number(e.target.value));
  };

  return (
    <div className="pageContainer">
      <Header />
      <section>
      <div className={styles.content}>
        <h2>Та данс цэнэглэх дүнгээ сонгоно уу</h2>
        <input
          type="text"
          value={amount}
          onChange={handleInputChange}
          className={styles.inputContent}
          placeholder="Дүнгээ бичнэ үү..."
        />
        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={amount}
          onChange={handleInputChange}
          className={styles.rangeInput}
        />
        <p>Сонгосон дүн: {amount.toLocaleString()}₮</p>

        <button className={styles.submitButton}>Цэнэглэх</button>
      </div>
      </section>
      <Footer />
    </div>
  );
}
