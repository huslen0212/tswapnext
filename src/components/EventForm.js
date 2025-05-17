'use client';

import styles from '../styles/EventForm.module.css';

export default function EventForm({ color, handleInputChange, ticketData }) {
  return (
    <div className={styles.container} style={{ color }}>
      <form>
        <div className={styles.field}>
          <label htmlFor="ticket_title" className={styles.label} style={{ color }}>
            Тасалбарын гарчиг:
          </label>
          <input
            type="text"
            id="ticket_title"
            name="ticket_title"
            placeholder="Тасалбарын нэр бичнэ үү..."
            value={ticketData.ticket_title}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="place" className={styles.label} style={{ color }}>
            Хаана:
          </label>
          <input
            type="text"
            id="place"
            name="place"
            placeholder="Энд бичнэ үү..."
            value={ticketData.place}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="date" className={styles.label} style={{ color }}>
            Хэзээ:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={ticketData.date}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="ticket_category" className={styles.label} style={{ color }}>
            Төрөл:
          </label>
          <select
            id="ticket_category"
            name="ticket_category"
            value={ticketData.ticket_category}
            onChange={handleInputChange}
            className={styles.select}
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

        <div className={styles.field}>
          <label htmlFor="ticket_price" className={styles.label} style={{ color }}>
            Үнэ:
          </label>
          <input
            type="text"
            id="ticket_price"
            name="ticket_price"
            placeholder="Энд бичнэ үү..."
            value={ticketData.ticket_price}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
      </form>
    </div>
  );
}
