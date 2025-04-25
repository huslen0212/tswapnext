import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Ticket.module.css";
import Link from "next/link";

export default function Ticket() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    }
    fetchTickets();
  }, []);

  return (
    <section className={styles["ticket-list"]}>
      {tickets.map((ticket) => (
        <Link href={`/TicketPage/ticketInfo?id=${ticket.ticket_id}`} key={ticket.ticket_id}>
          <div className={styles.ticket}>
            <Image
              src={ticket.ticket_image}
              alt={ticket.ticket_title || "Ticket"}
              width={380}
              height={140}
            />
            <h3>{ticket.ticket_title || "Гарчиг алга"}</h3>
            <p>📅 {ticket.date ? new Date(ticket.date).toISOString().substring(0, 10) : "Огноо алга"}</p>
            <p>📍 {ticket.place || "Байршил тодорхойгүй"}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
