import { useEffect, useState } from 'react';
import styles from '../RevenuePage/RevenuePage.module.css';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/AdminHeader';

export default function RevenuePage() {
  const [topUps, setTopUps] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTopUps = async () => {
      try {
        const res = await fetch('/api/getTopUpData');
        const data = await res.json();
        if (res.ok) {
          setTopUps(data);
          const sum = data.reduce((acc, item) => acc + Number(item.amount), 0);
          setTotal(sum);
        } else {
          console.error('Error:', data.message);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      }
    };

    fetchTopUps();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <h1 className={styles.heading}>Нийт цэнэглэлт</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Цахим шуудан</th>
              <th>Цэнэглэсэн огноо</th>
              <th>Цэнэглэсэн дүн</th>
            </tr>
          </thead>
          <tbody>
            {topUps.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                 <td>{Number(item.amount).toLocaleString()}₮</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Нийт</td>
              <td className={styles.totalRow}>{total.toLocaleString()}₮</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Footer />
    </>
  );
}
