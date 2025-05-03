import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/TicketPhoto.module.css';

const TicketPhoto = ({ setTicketData, setImageFile }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
      
      // Энд нэмэх:
      setImageFile(selectedFile); // Дээд component руу file-аа өгч байна
    }
  };

  return (
    <div className={styles.ticketPhoto}>
      <input
        type="file"
        id="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <a
        href="#"
        className={styles.uploadLink}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('file').click();
        }}
      >
        Тасалбарын зураг оруулах
      </a>
      {preview && (
        <div className={styles.preview}>
          <Image
            src={preview}
            alt="Тасалбарын зураг"
            width={200}
            height={200}
            style={{ objectFit: 'cover', marginTop: '10px' }}
          />
        </div>
      )}
    </div>
  );
};

export default TicketPhoto;
