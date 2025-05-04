import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

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

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUserEmail(null);
  };

  return (
    <header className={styles.header}>
      <Link href="/HomePage">
        <Image src="/photos/logo.png" alt="T Swap" height={130} width={150} />
      </Link>
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
