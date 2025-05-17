import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [balance, setBalance] = useState(0.00);

  const logout = async () => {
    await signOut({ callbackUrl: '/HomePage' });
  };

  useEffect(() => {
    if (userEmail) {
      const fetchBalance = async () => {
        const response = await fetch("/api/getBalance");
        const data = await response.json();
        if (response.ok) {
          setBalance(Number(data.balance) || 0);
        } else {
          console.error("Error fetching balance:", data.message);
        }
      };

      fetchBalance();

      const onBalanceUpdated = () => fetchBalance();
      window.addEventListener("balanceUpdated", onBalanceUpdated);

      return () => {
        window.removeEventListener("balanceUpdated", onBalanceUpdated);
      };
    }
  }, [userEmail]);

  return (
    <header className={styles.header}>
      <Link href="/HomePage">
        <Image src="/photos/logo.png" alt="T Swap" height={130} width={150} />
      </Link>
      <div className={styles.headerButtons}>
        <div className={`${styles.menu}`}>
          <nav>
            <ul className={styles.navList}>
              <li>
                <Link className={styles.navLink} href="/MedeeNemeh">
                  Мэдээлэл нэмэх
                </Link>
              </li>
              <li>
                Нийт орлого: 150000₮
              </li>
            </ul>
          </nav>
          
          {userEmail ? (
            <>
              <button className={styles.logoutBtn}>
                <Link href="/EditPage/edit">
                  <span className={styles.email}>{userEmail}</span>
                </Link>
              </button>
              <button className={styles.logoutBtn} onClick={logout}>
                Гарах
              </button>
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
