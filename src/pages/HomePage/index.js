import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import styles from '../HomePage/IndexPage.module.css';
import Ticket from '@/components/Ticket';
import CategoryButtons from '../../components/CategoryButtons';

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); // 🆕 Хайлтын текстийн state

  useEffect(() => {
    async function fetchTickets() {
      try {
        const categoryParam = selectedCategory === 'all' ? '' : `?category=${selectedCategory}`;
        const res = await fetch(`/api/ticket${categoryParam}`);
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      }
    }

    fetchTickets();
  }, [selectedCategory]);

  // 🆕 Хайлтад нийцсэн тасалбаруудыг шүүх
  const filteredTickets = tickets.filter(ticket =>
    ticket.ticket_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <div className={styles.headingContainer}>
          <h1>Тасалбараа хялбараар борлуул</h1>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Image 
              src="/photos/search.png" 
              alt="Search Icon" 
              width={20} 
              height={20} 
              className={styles.searchIcon} 
            />
            <input 
              type="text" 
              placeholder="Хайлт хийнэ үү" 
              className={styles.searchInput}
              value={searchTerm} // 🆕 input утгаа холбосон
              onChange={(e) => setSearchTerm(e.target.value)} // 🆕 бичих бүрт хадгалах
            />
          </div>
        </div>

        <CategoryButtons 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        <div className={styles.headingContainer}>
          <h1>Таньд санал болгох тасалбар</h1>
        </div>

        <div className={styles.ticketContainer}> 
          {filteredTickets.length > 0 ? ( // 🆕 filter-лэгдсэн тасалбаруудыг харуулж байна
            filteredTickets.map((ticket) => (
              <Ticket key={ticket.ticket_id} ticket={ticket} />
            ))
          ) : (
            <p>Одоогоор хайлтад тохирсон тасалбар байхгүй байна.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
