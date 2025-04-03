'use client';

import { useState } from 'react';
import styles from '../styles/DescriptionForm.module.css';

export default function DescriptionForm() {
  const [description, setDescription] = useState('');

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Нэмэгдсэн тайлбар:', description);
    // Энд таны хүссэн логик (жишээ нь API руу илгээх) орж болно
    setDescription(''); // Тайлбарыг хоослоно (шаардлагагүй бол хасна уу)
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label htmlFor="description" className={styles.label}>
        Тайлбар:
      </label>
      <textarea
        id="description"
        placeholder="Энд бичнэ үү "
        value={description}
        onChange={handleChange}
        className={styles.textarea}
      />
      <button type="submit" className={styles.addButton}>
        Нэмэх
      </button>
    </form>
  );
}