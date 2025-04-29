'use client';

import styles from '../styles/DescriptionForm.module.css';

export default function DescriptionForm({ formData, setFormData, color }) {
  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      description: value,
    }));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="description" className={styles.label} style={{ color }}>
        Тайлбар:
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Энд бичнэ үү"
        value={formData.description || ''}
        onChange={handleChange}
        className={styles.textarea}
      />
    </div>
  );
}
