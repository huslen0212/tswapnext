import { useState } from 'react';
import styles from '../styles/EditModal.module.css';

export default function EditModal({ news, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: news.title,
    summary: news.summary,
    content: news.content,
    author: news.author,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(news.id, formData);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Мэдээ засах</h2>

        <div className={styles.formField}>
          <label htmlFor="title">Гарчиг:</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Гарчиг"
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="summary">Хураангуй:</label>
          <input
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Хураангуй"
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="content">Дэлгэрэнгүй:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Дэлгэрэнгүй"
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="author">Нийтлэгч:</label>
          <input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Нийтлэгч"
          />
        </div>

        <div className={styles.actions}>
          <button onClick={handleSave}>Хадгалах</button>
          <button onClick={onClose}>Болих</button>
        </div>
      </div>
    </div>
  );
}
