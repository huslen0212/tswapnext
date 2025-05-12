import { useState } from "react";
import Image from "next/image";
import styles from "../styles/MyTicket.module.css";

export default function MyTicket({ ticket, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState({ ...ticket });
  const [saving, setSaving] = useState(false);

  if (!ticket) return null;

  // Handle field changes during editing
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    if (!confirm("Та энэ тасалбарыг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      const res = await fetch("/api/my-ticket", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId: ticket.ticket_id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Устгасан.");
        if (onDelete) {
          onDelete(ticket.ticket_id);
        }
      } else {
        alert(data.message || "Устгахад алдаа гарлаа.");
      }
    } catch (error) {
      console.error("Устгах үед алдаа:", error);
      alert("Устгахад алдаа гарлаа.");
    }
  };

  // Handle Edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle Save
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/update-ticket", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTicket),
      });

      if (res.ok) {
        setIsEditing(false);
        window.location.reload(); 
      } else {
        alert("Хадгалах үед алдаа гарлаа.");
      }
    } catch (error) {
      console.error(error);
      alert("Хадгалах үед алдаа гарлаа.");
    }
    setSaving(false);
  };

  return (
    <div className={styles.ticketContainer}>
      <Image
        src={ticket.ticket_image || "/photos/ticket.jpeg"}
        alt={ticket.ticket_title || "Тасалбар"}
        width={350}
        height={150}
        className={styles.ticketImage}
      />

      <div className={`${styles.ticketInfo} ${isEditing ? styles.editing : ""}`}>
        {isEditing ? (
          <>
            <div className={styles.ticketField}>
              <label>Хаана:</label>
              <input
                type="text"
                name="place"
                value={editedTicket.place || ""}
                onChange={handleChange}
                placeholder="Байршил"
              />
            </div>
            <div className={styles.ticketField}>
              <label>Хэзээ:</label>
              <input
                type="date"
                name="date"
                value={editedTicket.date ? editedTicket.date.split("T")[0] : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.ticketField}>
              <label>Тасалбарын төрөл:</label>
              <select
                name="ticket_category"
                value={editedTicket.ticket_category || ""}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Төрлөө сонгоно уу
                </option>
                <option value="Концерт">Концерт</option>
                <option value="Спорт">Спорт</option>
                <option value="Купон">Купон</option>
                <option value="Эвент">Эвент</option>
                <option value="Бусад">Бусад</option>
              </select>
            </div>
            <div className={styles.ticketField}>
              <label>Үнэ:</label>
              <input
                type="number"
                name="ticket_price"
                value={editedTicket.ticket_price || ""}
                onChange={handleChange}
                placeholder="Үнэ"
              />
            </div>
            <div className={styles.ticketField}>
              <label>Худалдаалах хэлбэр:</label>
              <select
                name="ticket_category"
                value={editedTicket.ticket_category || ""}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Худалдаалах хэлбэрээ сонгоно уу
                </option>
                <option value="Авах">Зарах</option>
                <option value="Зарах">Авах</option>
              </select>
            </div>
            <div className={styles.ticketDescription}>
              <label>Тайлбар:</label>
              <textarea
                name="description"
                value={editedTicket.description || ""}
                onChange={handleChange}
              />
            </div>

            <button onClick={handleSave} disabled={saving} className={styles.saveButton}>
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </>
        ) : (
          <>
            <p>Хаана: {ticket.place || "Байршил тодорхойгүй"}</p>
            <p>Хэзээ: {ticket.date ? new Date(ticket.date).toISOString().split("T")[0] : "Огноо байхгүй"}</p>
            <p>Тасалбарын төрөл: {ticket.ticket_category || "Төрөл тодорхойгүй"}</p>
            <p>Үнэ: {ticket.ticket_price}₮</p>
            <p>Худалдаалах хэлбэр: {ticket.ticket_type || "Төрөл тодорхойгүй"}</p>

            <div className={styles.ticketDescription}>
              <label>Тайлбар:</label>
              <textarea readOnly defaultValue={ticket.description || "Тайлбар байхгүй."} />
            </div>

            <button onClick={handleEdit} className={styles.editButton}>
              Засах
            </button>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Устгах
            </button>
          </>
        )}
      </div>
    </div>
  );
}
