import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/photos/logo.png" alt="T Swap" width={130} height={130} />
      </Link>
      <div className={styles.headerButtons}>
        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
          <nav>
            <ul>
              <li><Link href="/savedTicket">Хадгалсан тасалбар</Link></li>
              <li><Link href="/myTicket">Миний тасалбар</Link></li>
              <li className={styles.dropdown}>
                <button className={styles.dropbtn} onClick={() => setDropdownOpen(!dropdownOpen)}>Тасалбар нэмэх</button>
                {dropdownOpen && (
                  <div className={styles.dropdownContent}>
                    <Link href="/addTicket">Борлуулах тасалбар нэмэх</Link>
                    <Link href="/addBuyTicket">Худалдан авах тасалбар нэмэх</Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
          <Link href="/balance">
            <button className={styles.balance}>
              <Image src="/photos/plus.png" alt="Plus" width={17} height={17} />
              <b>5000.00₮</b>
            </button>
          </Link>
          <Link href="/login"><button className={styles.loginBtn}>Нэвтрэх</button></Link>
        </div>
      </div>
    </header>
  );
}
