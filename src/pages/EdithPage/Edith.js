import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '../../components/Header';
import styles from '../EdithPage/Edith.module.css';
export default function LoginEdithPage() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Хэрэглэгчийн мэдээллийг серверээс татах
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setForm(data); // Формын утгуудыг тохируулах
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updated = await res.json();
      setUserData(updated);
      setEditMode(false);
    } else {
      alert("Шинэчлэх үед алдаа гарлаа");
    }
  };

  if (!userData) return <div>Уншиж байна...</div>;

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.Edith}>
        <h3>Таны мэдээлэл:</h3>
        {editMode ? (
          <>
            <li className={styles.inputt}>Овог: <input name="lastName" value={form.lastName} onChange={handleChange} /></li>
            <li className={styles.inputt}>Нэр: <input name="firstName" value={form.firstName} onChange={handleChange} /></li>
            <li className={styles.inputt}>Утас: <input name="phone" value={form.phone} onChange={handleChange} /></li>
            <li className={styles.inputt}>Гэрийн хаяг: <input name="address" value={form.address} onChange={handleChange} /></li>
            <li className={styles.inputt}>Имэйл: <input name="email" value={form.email} onChange={handleChange} /></li>
            <button style={{
             backgroundColor: '#4CAF50',
             color: 'white',
             marginTop: '10px',
             padding: '12px 24px',
             border: 'none',
             borderRadius: '10px',
             fontSize: '16px',
             cursor: 'pointer',
             transition: 'background-color 0.3s ease'
             }} onClick={handleSave}>Хадгалах</button>
          </>
        ) : (
          <>
            <li className={styles.inputt}>Овог: {userData.lastName}</li>
            <li className={styles.inputt}>Нэр: {userData.firstName}</li>
            <li className={styles.inputt}>Утас: {userData.phone}</li>
            <li className={styles.inputt}>Гэрийн хаяг: {userData.address}</li>
            <li className={styles.inputt}>Имэйл: {userData.email}</li>
            <button style={{
                backgroundColor: '#201465',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer'
             }} onClick={() => setEditMode(true)}>Засах</button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
