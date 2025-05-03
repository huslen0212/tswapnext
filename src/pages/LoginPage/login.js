import { useState } from 'react';
import Image from 'next/image';
import styles from '../LoginPage/LoginPage.module.css';
import Link from 'next/link';
import { signIn } from 'next-auth/react'; // Import signIn from NextAuth

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error
    setError('');

    // Send a POST request to the backend API
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res.ok) {
      // Redirect user or show success message
      window.location.href = '/'; // Update the URL for your app
    } else {
      // Show error message
      setError(res.error || 'Нэвтрэх нэр эсвэл нууц үг буруу байна');
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
          <h1>Нэвтрэх</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Цахим шуудан"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit">Нэвтрэх</button>
          </form>
          <p>
            Шинэ хэрэглэгч болох: <Link href="/RegisterPage/register">Бүртгүүлэх</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
