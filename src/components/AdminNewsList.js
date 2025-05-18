
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/NewsList.module.css'; 

const AdminNewsList = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllNews() {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error("Мэдээ авахад алдаа гарлаа");
        const data = await response.json();
        setNewsItems(data);
      } catch (err) {
        setError('Мэдээ авахад алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    }

    fetchAllNews();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Энэ мэдээг устгах уу?')) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Устгал амжилтгүй боллоо');
      setNewsItems(newsItems.filter((item) => item.id !== id));
    } catch (err) {
      alert('Устгаж чадсангүй');
    }
  };

  if (loading) return <p>Ачааллаж байна...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.listContainer}>
      <h1 className={styles.title}>Админ - Мэдээний жагсаалт</h1>
      <div className={styles.newsGrid}>
        {newsItems.map((news) => (
          <div key={news.id} className={styles.newsCard}>
            <div className={styles.newsImageContainer}>
              <Image
                src={news.image_url}
                alt={news.title}
                className={styles.newsImage}
                width={300}
                height={200}
              />
            </div>
            <h2 className={styles.newsTitle}>{news.title}</h2>
            <p>{new Date(news.created_at).toLocaleDateString('mn-MN')}</p>
            <p>Зохиогч: {news.author}</p>
            <p>{news.summary}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <Link href={`/MedeeNemeh/edit/${news.id}`} className={styles.editBtn}>Засах</Link>
              <button onClick={() => handleDelete(news.id)} className={styles.deleteBtn}>Устгах</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNewsList;
