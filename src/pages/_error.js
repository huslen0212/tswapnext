import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/Custom404.module.css';
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>
          {statusCode
            ? `${statusCode} - Серверийн алдаа`
            : 'Хүсэлт гүйцэтгэхэд алдаа гарлаа'}
        </h1>
        <p className={styles.description}>
          Уучлаарай, алдаа гарлаа. Дахин оролдоно уу.
        </p>
        <Link href="/" className={styles.homeButton}>
          Нүүр хуудас руу буцах
        </Link>
      </div>
      <Footer />
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 