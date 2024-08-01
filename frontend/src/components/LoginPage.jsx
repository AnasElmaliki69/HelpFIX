import React, {useState} from 'react';
import styles from '../styles/Form.module.css'; 
import Link from 'next/link';
import { useRouter } from 'next/router';

const LoginForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [result, setResult] = useState('');
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json();
      localStorage.setItem("token", result.token);
      router.push("/")
    } catch (error) {
      console.log(error)
    } finally {
      setFormData({
        email:"",
        password:""
      })
    }
  };


  return (
    <div className={styles.formLoginSignin}>
      <form className={styles.signinForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={formData.email} 
          onChange={handleInputChange}
          required
          className={styles.input}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          value={formData.password} 
          onChange={handleInputChange}
          required
          className={styles.input}
        />
        <input type="submit" value="Login" className={styles.input} />
        <Link href="/signinPage" className={styles.input}>Inscription</Link>
      </form>
    </div>
  );
};

export default LoginForm;
