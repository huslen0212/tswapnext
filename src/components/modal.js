// Modal.js
import React from 'react';
import styles from '../styles/modal.module.css';

export default function Modal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Та энэ тасалбарыг устгахдаа итгэлтэй байна уу?</h3>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onConfirm}>Тийм</button>
          <button className={styles.cancelButton} onClick={onClose}>Үгүй</button>
        </div>
      </div>
    </div>
  );
}
