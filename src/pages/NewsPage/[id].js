import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import styles from '@/styles/NewsPage.module.css';

export default function NewsPage({ newsItem, error }) {
  if (error || !newsItem) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.container}>
          <h1 className={styles.title}>{error || 'Мэдээ олдсонгүй'}</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{newsItem.title}</h1>
        {newsItem.image_url ? (
          <Image
            src={newsItem.image_url}
            alt={newsItem.title}
            width={300}
            height={200}
            priority
            className={styles.newsImage}
          />
        ) : (
          <div className={styles.placeholderImage}>Зураг байхгүй</div>
        )}
        <p className={styles.summary}>{newsItem.summary}</p>
        <p className={styles.content}>{newsItem.content}</p>
        <p className={styles.author}>Зохиогч: {newsItem.author}</p>
        <p className={styles.date}>
          Огноо: {new Date(newsItem.created_at).toLocaleDateString('mn-MN')}
        </p>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  if (!id || isNaN(parseInt(id))) {
    return {
      props: {
        error: 'Мэдээний ID буруу эсвэл алга байна',
      },
    };
  }

  try {
    console.log('ID-аар мэдээ татаж байна:', id);
    const res = await fetch(`http://localhost:3000/api/news/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      console.log('API-ийн алдаа:', errorData);
      if (res.status === 404) {
        return { notFound: true };
      }
      return {
        props: {
          error: errorData.error || `Мэдээллийг авахад алдаа гарлаа: ${res.status} ${res.statusText}`,
        },
      };
    }
    const newsItem = await res.json();
    console.log('Татагдсан мэдээ:', newsItem);

    return {
      props: {
        newsItem,
      },
    };
  } catch (err) {
    console.error('Мэдээ татахад алдаа:', err);
    return {
      props: {
        error: `Мэдээллийг авахад алдаа гарлаа: ${err.message}`,
      },
    };
  }
}