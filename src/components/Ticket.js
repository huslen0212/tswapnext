import Image from "next/image";
import styles from "../styles/Ticket.module.css";
import Link from "next/link";

export default function Ticket() {
    return (
      <section className={styles["ticket-list"]}>
        <Link href="/TicketPage/ticketInfo">
          <div className={styles.ticket}> 
            <Image 
              src="/photos/ticket.jpeg" 
              alt="PlayTime Music Festival" 
              width={380}
              height={140}
            />
            <h3>PlayTime Music Festival</h3>
            <p>📅 2025 оны 07 сар 14 өдөр</p>
            <p>📍 Монгол шилтгээн</p>
          </div>
        </Link>
      </section>
    );
}