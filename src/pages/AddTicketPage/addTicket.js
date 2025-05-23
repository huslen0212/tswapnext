'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '../../components/Header';
import TicketPhoto from '@/components/TicketPhoto';
import EventForm from '@/components/EventForm';
import DescriptionForm from '@/components/DescriptionForm';
import styles from '../../styles/addTicket.module.css';

export default function AddTicket() {
  const [formData, setFormData] = useState({
    ticket_title: '',
    ticket_type: 'Sell', // "Sell" гэдгийг үндсэн төрөл гэж үзэв
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
          ticket_type: 'Sell',
          ticket_category: '',
          place: '',
          date: '',
          price: '',
          description: '',
          ticket_image: '',
          ticket_status: 'active',
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
          <div className='urd'>
          <h1 style={{ color: 'rgb(6, 6, 125)' }}>Борлуулах тасалбараа нэмнэ үү:</h1>
          <TicketPhoto setFormData={setFormData} />
          <EventForm formData={formData} setFormData={setFormData} color="rgb(6, 6, 125)" />
          </div>
          <div className={styles.description}>
            <DescriptionForm formData={formData} setFormData={setFormData} color="rgb(6, 6, 125)" />
            <div className='golulah'>
            <button
            type="submit"
            className={styles.submitButton}
            style={{ backgroundColor: 'rgb(6, 6, 125)',width: '200px',heigth:'30px',color: 'white' }}
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
