'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '../../components/Header';
import TicketPhoto from '@/components/TicketPhoto';
import EventForm from '@/components/EventForm';
import DescriptionForm from '@/components/DescriptionForm';
import styles from '../../styles/addBuyTicket.module.css';

export default function AddBuyTicket() {
  const [formData, setFormData] = useState({
    ticket_title: '',
    ticket_type: 'Buy',
    ticket_category: '',
    place: '',
    date: '',
    price: '',
    description: '',
    ticket_image: '',
    ticket_status: 'active',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Тасалбар амжилттай нэмэгдлээ!');
        setFormData({
          ticket_title: '',
          ticket_type: 'Buy',
          ticket_category: '',
          place: '',
          date: '',
          price: '',
          description: '',
          ticket_image: '',
          ticket_status: '',
        });
      } else {
        setMessage('Алдаа гарлаа. Та дахин оролдоно уу.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Сервертэй холбогдож чадсангүй.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.TicketForm}>
          <div className={styles.urd}>
          <h1 style={{ color: '#ff7022' }}>Хайх тасалбар нэмэх:</h1>
          <TicketPhoto setFormData={setFormData} />
          <EventForm formData={formData} setFormData={setFormData} color="#ff7022" />
          </div>
          <div className={styles.description}>
            <DescriptionForm formData={formData} setFormData={setFormData} color="#ff7022" />
            <div className={styles.golulah}>
            <button
            type="submit"
            className={styles.submitButton}
            style={{ backgroundColor: '#ff7022',width: '200px',heigth:'30px' }}
            disabled={loading}
          >
            {loading ? 'Илгээж байна...' : 'Илгээх'}
          </button>
          {message && <p className={styles.message}>{message}</p>}
          </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
