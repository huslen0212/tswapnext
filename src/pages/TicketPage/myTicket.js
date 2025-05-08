import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "../../components/Header";
import MyTicket from "@/components/MyTicket";
import styles from "../TicketPage/MyTicketPage.module.css";
import { useSession } from "next-auth/react";

export default function MyTicketPage() {
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      setErrorMessage('Хэрэглэгчийн мэдээлэл олдсонгүй.');
      return;
    }

    async function fetchTickets() {
      try {
        const res = await fetch("/api/my-ticket");
        const data = await res.json();

        if (res.ok) {
          setTickets(data);
        } else {
          setErrorMessage(data.message || "Тасалбаруудыг авахад алдаа гарлаа.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Тасалбаруудыг авахад алдаа гарлаа.");
      }
    }

    fetchTickets();
  }, [status]);

  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
        <div className={styles.headingContainer}>
          <h1>Миний тасалбар</h1>
        </div>

        <div className={styles.ticketContainer}>
          {errorMessage ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : tickets.length > 0 ? (
            tickets.map((ticket) => (
              <MyTicket key={ticket.ticket_id} ticket={ticket} />
            ))
          ) : (
            <p>Таньд нэмсэн тасалбарууд байхгүй.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
