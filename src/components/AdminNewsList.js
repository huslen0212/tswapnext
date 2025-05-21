'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/NewsList.module.css';
import EditModal from '../components/EditModal';

const AdminNewsList = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Мэдээ авахад алдаа гарлаа');
      const data = await response.json();
      setNewsItems(data);
    } catch (err) {
      setError('Мэдээ авахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Энэ мэдээг устгах уу?')) return;

    try {
      const response = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Устгал амжилтгүй боллоо');
      setNewsItems(newsItems.filter((item) => item.id !== id));
    } catch (err) {
      alert('Устгаж чадсангүй');
    }
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Засвар хадгалахад алдаа гарлаа');

      const updatedNews = await response.json();

      setNewsItems(newsItems.map(item => (item.id === updatedNews.id ? updatedNews : item)));
      setEditingNews(null);
    } catch (err) {
      alert('Засвар хадгалахад алдаа гарлаа');
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
              <button onClick={() => setEditingNews(news)} className={styles.editBtn}>
                Засах
              </button>
              <button onClick={() => handleDelete(news.id)} className={styles.deleteBtn}>
                Устгах
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {editingNews && (
        <EditModal
          news={editingNews}
          onClose={() => setEditingNews(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminNewsList;
