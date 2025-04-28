'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '../../components/Header';
import TicketPhoto from '@/components/TicketPhoto';
import EventForm from '@/components/EventForm';
import DescriptionForm from '@/components/DescriptionForm';
import styles from '../../styles/addBuyTicket.module.css';

export default function addBuyTicket() {
  const [formData, setFormData] = useState({
    place: '',
    date: '',
    ticket_category: '',
    price: '',
    description: '',
  });

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.content}>
        <section className={styles.TicketForm}>
          <h1 style={{ color: '#ff7022' }}>Хайх тасалбар нэмэх:</h1>
          <TicketPhoto setFormData={setFormData} />
          <EventForm formData={formData} setFormData={setFormData} color="#ff7022" />
        </section>
        <div className={styles.description}>
          <DescriptionForm formData={formData} setFormData={setFormData} color="#ff7022" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
