import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/photos/logo.png" alt="T Swap" height={130} width={130} />
      </Link>
      <div className={styles.headerButtons}>
        <div className={`${styles.menu} ${menuOpen ? styles.showMenu : ""}`}>
          <nav>
            <ul className={styles.navList}>
              <li><Link className={styles.navLink} href="/savedTicket">Хадгалсан тасалбар</Link></li>
              <li><Link className={styles.navLink} href="/myTicket">Миний тасалбар</Link></li>
              <li className={styles.dropdown}>
                <button className={styles.dropbtn} onClick={toggleDropdown}>Тасалбар нэмэх</button>
                <ul className={`${styles.dropdownContent} ${dropdownOpen ? styles.show : ""}`}>
                  <li><Link href="/addTicket">Борлуулах тасалбар нэмэх</Link></li>
                  <li><Link href="/addBuyTicket">Худалдан авах тасалбар нэмэх</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
          <Link href="/balance">
            <button className={styles.balance}>
              <Image src="/photos/plus.png" alt="Balance" width={17} height={17} />
              <b>5000.00₮</b>
            </button>
          </Link>
          <Link href="/login">
            <button className={styles.loginBtn}>Нэвтрэх</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
