'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import styles from './Edit.module.css'; // Таны CSS файл

export default function LoginEditPage() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    home_address: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/edit-profile')
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setForm(data); // хэрэглэгчийн мэдээллийг form-д оноох
      })
      .catch((err) => {
        console.error('Алдаа:', err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/edit-profile', {
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
        alert('Амжилттай хадгаллаа!');
      } else {
        alert('Хадгалах үед алдаа гарлаа!');
      }
    } catch (error) {
      console.error('Хадгалах алдаа:', error);
      alert('Сүлжээний алдаа!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm(userData); // Хуучин өгөгдөлд буцаах
    setEditMode(false); // Edit mode хаах
  };

  if (!userData) return <div>Уншиж байна...</div>;

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.Edith}>
        <h3>Таны мэдээлэл</h3>

        {editMode ? (
          <div className={styles.inputt}>
            <label>Овог:</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />

            <label>Нэр:</label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />

            <label>Утас:</label>
            <input
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
            />

            <label>Гэрийн хаяг:</label>
            <input
              name="home_address"
              value={form.home_address}
              onChange={handleChange}
            />

            <label>Цахим шуудан:</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <div className={styles.buttonGroup}>
              <button
                onClick={handleSave}
                disabled={loading}
                className={styles.button}
              >
                {loading ? 'Хадгалж байна...' : 'Хадгалах'}
              </button>

              <button
                onClick={handleCancel}
                disabled={loading}
                className={styles.buttonCancel}
              >
                Болих
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.inputt}>
            <p><strong>Овог:</strong> {userData.last_name}</p>
            <p><strong>Нэр:</strong> {userData.first_name}</p>
            <p><strong>Утас:</strong> {userData.phone_number}</p>
            <p><strong>Гэрийн хаяг:</strong> {userData.home_address}</p>
            <p><strong>Цахим шуудан:</strong> {userData.email}</p>

            <button
              onClick={() => setEditMode(true)}
              className={styles.editbutton}
            >
              Засах
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
