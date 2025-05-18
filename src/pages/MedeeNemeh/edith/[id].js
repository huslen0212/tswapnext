'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [newsData, setNewsData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        const newsItem = data.find((item) => item.id === id);
        if (!newsItem) throw new Error('Мэдээ олдсонгүй');
        setNewsData(newsItem);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData),
      });

      if (!res.ok) throw new Error('Засвар хадгалахад алдаа гарлаа');
      alert('Амжилттай хадгаллаа!');
      router.push('/admin'); // буцааж админ хуудас руу
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Ачааллаж байна...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
      <h1>Мэдээ засах</h1>
      <form onSubmit={handleSave}>
        <label>
          Гарчиг:
          <input
            type="text"
            name="title"
            value={newsData.title}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Товч:
          <input
            type="text"
            name="summary"
            value={newsData.summary}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Агуулга:
          <textarea
            name="content"
            value={newsData.content}
            onChange={handleChange}
            rows={6}
            required
          />
        </label>
        <br /><br />

        <label>
          Зохиогч:
          <input
            type="text"
            name="author"
            value={newsData.author}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        <label>
          Зураг (URL):
          <input
            type="text"
            name="image_url"
            value={newsData.image_url}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        <button type="submit" disabled={saving}>
          {saving ? 'Хадгалж байна...' : 'Хадгалах'}
        </button>
      </form>
    </div>
  );
}
