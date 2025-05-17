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
      setImageFile(selectedFile);
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

      {!preview && (
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
      )}

      {preview && (
        <div className={styles.preview}>
          <div style={{ position: 'relative', width: '500px', height: '200px' }}>
            <Image
              src={preview}
              alt="Тасалбарын зураг"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketPhoto;
