import { useState } from 'react';
import styles from '../styles/TicketPhoto.module.css'; 

const TicketPhoto = () => {
  const [preview, setPreview] = useState(null); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setPreview(imageUrl);
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
          <img src={preview} alt="Тасалбарын зураг" style={{ maxWidth: '200px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default TicketPhoto;