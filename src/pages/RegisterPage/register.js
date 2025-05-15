import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../RegisterPage/RegisterPage.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    phone_number: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Амжилттай бүртгэгдлээ!');
      router.push('/LoginPage/login');
    } else {
      alert(data.error || 'Бүртгэл амжилтгүй боллоо!');
    }
  };

  return (
    <div className="pageContainer">
      <div className="content">
        <div className={styles.leftside}>
          <Image src="/photos/concert.png" alt="concert" width={700} height={240} />
          <Image src="/photos/movie.jpg" alt="movie" width={700} height={243} />
          <Image src="/photos/sport.jpg" alt="sport" width={700} height={243} />
        </div>

        <div className={styles.rigthside}>
          <h1>Бүртгүүлэх</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input type="text" id="last_name" placeholder="Овог" value={formData.last_name} onChange={handleChange} required />
            <input type="text" id="first_name" placeholder="Нэр" value={formData.first_name} onChange={handleChange} required />
            <input type="text" id="phone_number" placeholder="Утасны дугаар" value={formData.phone_number} onChange={handleChange} required />
            <input type="email" id="email" placeholder="Цахим шуудан" value={formData.email} onChange={handleChange} required />
            <input type="password" id="password" placeholder="Нууц үг" value={formData.password} onChange={handleChange} required />

            <button type="submit">Бүртгүүлэх</button>
          </form>
        </div>
      </div>
    </div>
  );
}
