'use client';

import styles from '../styles/CategoryButtons.module.css';

const categories = [
  { name: 'Бүх төрөл', value: 'all' },
  { name: 'Концерт', value: 'Концерт' },
  { name: 'Спорт', value: 'Спорт' },
  { name: 'Купон', value: 'Купон' },
  { name: 'Эвент', value: 'Эвент' },
  { name: 'Бусад', value: 'Бусад' },
];

export default function CategoryButtons({ selectedCategory, setSelectedCategory }) {
  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setSelectedCategory(category.value)}
          className={`${styles.categoryButton} ${
            selectedCategory === category.value ? styles.active : ''
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
