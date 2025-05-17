import Footer from '@/components/Footer';
import Header from '../../components/Header';
import styles from "../../styles/balance.module.css";
import { useState } from 'react';

export default function Balance() {
  const [amount, setAmount] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleRecharge = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/getBalance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Амжилттай цэнэглэгдлээ. Шинэ үлдэгдэл: ${data.balance.toLocaleString()}₮`);
        window.dispatchEvent(new Event("balanceUpdated"));
      } else {
        setMessage(data.message || "Алдаа гарлаа");
      }
    } catch (err) {
      setMessage("Сүлжээний алдаа гарлаа");
    } finally {
      setLoading(false);
    }
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
            min="500"
            max="100000"
            step="500"
            value={amount}
            onChange={handleInputChange}
            className={styles.rangeInput}
          />
          <p>Сонгосон дүн: {amount.toLocaleString()}₮</p>

          <button className={styles.submitButton} onClick={handleRecharge} disabled={loading}>
            {loading ? "Цэнэглэж байна..." : "Цэнэглэх"}
          </button>
          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
}
