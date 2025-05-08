import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import newsData from "../data/news.json";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    async function fetchEmail() {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.email) {
        setUserEmail(data.email);
      }
    }

    fetchEmail();
  }, []);
  useEffect(() => {
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => 
        (prevIndex + 1) % newsData.upcomingMatches.length
      );
    }, 3000); 

    return () => clearInterval(newsInterval);
  }, []);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setShowNewsModal(true);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUserEmail(null);
  };

  return (
    <header className={styles.header}>
      <Link href="/HomePage">
        <Image src="/photos/logo.png" alt="T Swap" height={130} width={150} />
      </Link>
      <div className={styles.newsSection}>
            <div 
            
              className={styles.newsItem}
              onClick={() => handleNewsClick(newsData.upcomingMatches[currentNewsIndex])}
            >
              <h4 className={styles.newsHeader}>AS SOON</h4>
              <Image src="/photos/ticketicon.gif" alt="ticket" height={30} width={30}></Image>
              <span className={styles.newsTitle}>
                {newsData.upcomingMatches[currentNewsIndex].title}
              </span>
            </div>
          </div>


          {showNewsModal && selectedNews && (
            <div className={styles.modalOverlay} onClick={() => setShowNewsModal(false)}>
              <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={() => setShowNewsModal(false)}>×</button>
                <h2>{selectedNews.title}</h2>
                <p><strong>огноо:</strong> {selectedNews.date}</p>
                <p><strong>цаг:</strong> {selectedNews.time}</p>
                <p><strong>байршил:</strong> {selectedNews.venue}</p>
                <p><strong>тайлбар:</strong> {selectedNews.description}</p>
                <p><strong>тасалбарын үнэ:</strong> {selectedNews.ticketPrice}</p>
              </div>
            </div>
          )}
      <div className={styles.headerButtons}>
        <div className={`${styles.menu} ${menuOpen ? styles.showMenu : ""}`}>
          <nav>
            <ul className={styles.navList}>
              <li><Link className={styles.navLink} href="/TicketPage/savedTicket">Хадгалсан тасалбар</Link></li>
              <li><Link className={styles.navLink} href="/TicketPage/myTicket">Миний тасалбар</Link></li>
              <li className={styles.dropdown}>
                <button className={styles.dropbtn} onClick={toggleDropdown}>Тасалбар нэмэх</button>
                <ul className={`${styles.dropdownContent} ${dropdownOpen ? styles.show : ""}`}>
                  <li><Link href="/AddTicketPage/AddTicket">Борлуулах тасалбар нэмэх</Link></li>
                  <li><Link href="/AddTicketPage/AddBuyTicket">Худалдан авах тасалбар нэмэх</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
          
          {/* Conditionally render Balance button based on user login status */}
          {userEmail && (
            <Link href="/BalancePage/balance">
              <button className={styles.balance}>
                <Image src="/photos/plus.png" alt="Balance" width={17} height={17} />
                <b>0.00₮</b>
              </button>
            </Link>
          )}

          {/* Conditionally render Logout button and email */}
          {userEmail ? (
            <>
              <button className={styles.logoutBtn}><Link href="/EdithPage/Edith" ><span className={styles.email}>{userEmail}</span></Link></button>
              <button className={styles.logoutBtn} onClick={logout}>Гарах</button>
            </>
          ) : (
            <Link href="/LoginPage/login">
              <button className={styles.loginBtn}>Нэвтрэх</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;