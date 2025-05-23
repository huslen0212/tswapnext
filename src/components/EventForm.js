'use client';

import { useState } from 'react';
import styles from '../styles/EventForm.module.css';

export default function EventForm({ formData, setFormData, color }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value, // formData-д өөрчлөлт оруулах
    }));
  };

  return (
    <div className={styles.container} style={{ color }}>
      <div className={styles.field}>
        <label htmlFor="ticket_title" className={styles.label} style={{ color }}>
          Тасалбарын нэр:
        </label>
        <input
          type="text"
          id="ticket_title"
          name="ticket_title"
          placeholder="Энд бичнэ үү..."
          value={formData.ticket_title || ''} 
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="place" className={styles.label} style={{ color }}>
          Хаана:
        </label>
        <input
          type="text"
          id="place"
          name="place"
          placeholder="Энд бичнэ үү..."
          value={formData.place || ''} 
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.field} >
        <label htmlFor="date" className={styles.label} style={{ color }}>
          Хэзээ:
        </label>
        <input
          type="text"
          id="date"
          name="date"
          placeholder="Энд бичнэ үү..."
          value={formData.date || ''}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="ticket_category" className={styles.label} style={{ color }}>
          Төрөл:
        </label>
        <select
          id="ticket_category"
          name="ticket_category"
          value={formData.ticket_category || ''}
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
        <label htmlFor="ticket_price" className={styles.label} style={{ color }}>
          Үнэ:
        </label>
        <input
          type="text"
          id="ticket_price"
          name="price"
          placeholder="Энд бичнэ үү..."
          value={formData.price || ''}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
