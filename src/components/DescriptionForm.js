'use client';

import { useState } from 'react';
import styles from '../styles/DescriptionForm.module.css';

export default function DescriptionForm(props) {
  const [description, setDescription] = useState('');

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Нэмэгдсэн тайлбар:', description);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label htmlFor="description" 
      className={styles.label}
      style={{ color: props.color }} >
        Тайлбар:
      </label>
      <textarea
        id="description"
        placeholder="Энд бичнэ үү"
        value={description}
        onChange={handleChange}
        className={styles.textarea}
      />
      <button
        type="submit"
        className={styles.addButton}
        style={{ backgroundColor: props.color }} 
      >
        Нэмэх
      </button>
    </form>
  );
}
