import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Newsphoto.module.css'

const NewsPhoto = ({ setImageFile }) => {
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
    <div className={styles.newsPhoto}>
      <input
        type="file"
        id="news-file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <a
        href="#"
        className={styles.uploadLink}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('news-file').click();
        }}
      >
        Мэдээний зураг оруулах
      </a>
      {preview && (
        <div className={styles.preview}>
          <Image
            src={preview}
            alt="Мэдээний зураг"
            width={200}
            height={200}
            style={{ objectFit: 'cover', marginTop: '10px' }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsPhoto;
