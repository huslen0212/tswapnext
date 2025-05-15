import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/NewsList.module.css';

export default function NewsList() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) {
          throw new Error('Мэдээний мэдээлэл авахад алдаа гарлаа');
        }
        const data = await res.json();
        console.log('API-ийн хариу:', data);
        setNewsItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Мэдээ татахад алдаа:', err);
        setError('Мэдээний мэдээлэл авахад алдаа гарлаа');
        setLoading(false);
      }
    }

    fetchAllNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.listContainer}>
          <h1 className={styles.title}>Ачааллаж байна...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !newsItems.length) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.listContainer}>
          <h1 className={styles.title}>{error || 'Мэдээ олдсонгүй'}</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.listContainer}>
        <h1 className={styles.title}>Бүх Мэдээ</h1>
        <div className={styles.newsGrid}>
          {newsItems
            .filter((news) => news.id && news.image_url)
            .map((news) => (
              <Link
                key={news.id}
                href={`/NewsPage/${news.id}`}
                className={styles.newsCard}
              >
                <div className={styles.newsImageContainer}>
                  <Image
                    src={news.image_url}
                    alt={news.title}
                    className={styles.newsImage}
                    width={300}
                    height={200}
                    priority
                  />
                </div>
                <h2 className={styles.newsTitle}>{news.title}</h2>
                <p className={styles.newsDate}>{formatDate(news.created_at)}</p>
                <p className={styles.newsAuthor}>Зохиогч: {news.author}</p>
                <p className={styles.newsSummary}>{news.summary}</p>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}