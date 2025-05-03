'use client';

import styles from '../styles/DescriptionForm.module.css';

export default function DescriptionForm({ color, handleInputChange, ticketData }) {
  return (
    <form className={styles.container}>
      <label
        htmlFor="description"
        className={styles.label}
        style={{ color }}
      >
        Тайлбар:
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Энд бичнэ үү"
        value={ticketData.description}
        onChange={handleInputChange}
        className={styles.textarea}
      />
    </form>
  );
}
