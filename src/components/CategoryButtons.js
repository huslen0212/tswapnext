// components/CategoryButtons.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/CategoryButtons.module.css'; 

const categories = [
  { name: 'Бүх төрөл', path: '/TicketsType/allType' },
  { name: 'Концерт', path: '/TicketsType/concert' },
  { name: 'Спорт', path: '/TicketsType/sport' },
  { name: 'Купон', path: '/TicketsType/coupon' },
  { name: 'Эвент', path: '/TicketsType/event' },
  { name: 'Бусад', path: '/TicketsType/other' },
];

export default function CategoryButtons() {
  const pathname = usePathname();

  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <Link key={index} href={category.path}>
          <button
            type="button"
            className={`${styles.categoryButton} ${
              pathname === category.path ? styles.active : ''
            }`}
          >
            {category.name}
          </button>
        </Link>
      ))}
    </div>
  );
}
