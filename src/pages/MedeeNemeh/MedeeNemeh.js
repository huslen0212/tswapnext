import { useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import NewsPhoto from '../../components/NewsPhoto';
import styles from '../MedeeNemeh/MedeeNemeh.module.css';

export default function MedeeNemeh() {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const form = new FormData();

    form.append('title', formData.title);
    form.append('summary', formData.summary);
    form.append('content', formData.content);
    form.append('author', formData.author);

    if (imageFile) {
      form.append('image', imageFile); 
    }

    try {
      const response = await fetch('/api/news-add', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Хадгалах үед алдаа гарлаа');
      }

      setSuccessMessage('Амжилттай хадгалагдлаа!');
      setErrorMessage('');
      setFormData({ title: '', summary: '', content: '', author: '' });
      setImageFile(null);
    } catch (error) {
      console.error(error);
      setErrorMessage('Хадгалах үед алдаа гарлаа');
      setSuccessMessage('');
    }
  };
  
  return (
    <div className="pageContainer">
      <AdminHeader />
      <section className={styles.NewsForm}>
        <h1 className={styles.garchig}>Хайх тасалбараа нэмнэ үү:</h1>

        <NewsPhoto setImageFile={setImageFile} />

        <div className={styles.field}>
          <label className={styles.label}>Мэдээний гарчиг:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Оруулах мэдээний гарчигаа бичнэ үү..."
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Мэдээний хураангуй:</label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Энд бичнэ үү..."
            className={styles.inputSummary}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Мэдээний дэлгэрэнгүй:</label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Энд бичнэ үү..."
            className={styles.inputContent}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Нийтлэгч:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Энд бичнэ үү..."
            className={styles.input}
          />
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <button className={styles.submitButton} onClick={handleSubmit}>
          Мэдээ нэмэх
        </button>
      </section>
      <Footer />
    </div>
  );
}
