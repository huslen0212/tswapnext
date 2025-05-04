import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/Custom404.module.css';

export default function Custom404() {
  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>404 - Хуудас олдсонгүй</h1>
        <p className={styles.description}>
          Уучлаарай, таны хайсан хуудас олдсонгүй.
        </p>
        <Link href="/" className={styles.homeButton}>
          Нүүр хуудас руу буцах
        </Link>
      </div>
      <Footer />
    </div>
  );
} 