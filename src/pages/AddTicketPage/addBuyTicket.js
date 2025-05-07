import Footer from '@/components/Footer';
import Header from '../../components/Header';
import TicketPhoto from '@/components/TicketPhoto';
import EventForm from '@/components/EventForm';
import DescriptionForm from '@/components/DescriptionForm';
import styles from '../../styles/addTicket.module.css';
import { useState } from 'react';
import { useSession } from "next-auth/react"; // import next-auth session

export default function AddTicket() {
  const { data: session } = useSession(); // get session
  const [ticketData, setTicketData] = useState({
    ticket_title: '',
    ticket_type: 'buy',
    ticket_category: '',
    place: '',
    description: '',
    date: '',
    ticket_price: '',
    ticket_image: '',
  });

  const [imageFile, setImageFile] = useState(null); // for image upload

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!session) {
      alert('Нэвтэрч орно уу!');
      return;
    }
  
    const formData = new FormData();
    formData.append('ticket_title', ticketData.ticket_title);
    formData.append('ticket_type', ticketData.ticket_type);
    formData.append('ticket_category', ticketData.ticket_category);
    formData.append('place', ticketData.place);
    formData.append('description', ticketData.description);
    formData.append('date', ticketData.date);
    formData.append('ticket_price', ticketData.ticket_price);
    formData.append('ticket_image', imageFile);
  
    try {
      const res = await fetch('/api/add-ticket', {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        alert('Тасалбар амжилттай нэмэгдлээ!');
      } else {
        alert('Алдаа гарлаа');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.content}>
        <section className={styles.TicketForm}>
          <h1 style={{ color: 'rgb(6, 6, 125)' }}>Хайх тасалбараа нэмнэ үү:</h1>

          {/* here you would pass setTicketData or specific fields */}
          <TicketPhoto setTicketData={setTicketData} setImageFile={setImageFile} />
          <EventForm color="rgb(6, 6, 125)" handleInputChange={handleInputChange} ticketData={ticketData} />
        </section>

        <div className={styles.description}>
          <DescriptionForm color="rgb(6, 6, 125)" handleInputChange={handleInputChange} ticketData={ticketData} />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Тасалбар нэмэх
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
