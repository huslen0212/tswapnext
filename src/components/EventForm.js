'use client'; 

import { useState } from 'react';
import styles from '../styles/EventForm.module.css';

export default function EventForm() {
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    type: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Илгээгдсэн өгөгдөл:', formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="location" className={styles.label}>
            Хаана:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Энд бичнэ үү..."
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="date" className={styles.label}>
            Хэзээ:
          </label>
          <input
            type="text"
            id="date"
            name="date"
            placeholder="Энд бичнэ үү..."
            value={formData.date}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="type" className={styles.label}>
            Төрөл:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="" disabled hidden>
              Төрлөө сонгоно уу
            </option>
            <option value="concert">Концерт</option>
            <option value="sports">Спорт</option>
            <option value="coupon">Купон</option>
            <option value="event">Эвент</option>
            <option value="other">Бусад</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="price" className={styles.label}>
            Үнэ:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Энд бичнэ үү..."
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </form>
    </div>
  );
}