import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import styles from '../styles/Navbar.module.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.firstName || ''); // Assuming the token has a `firstName` field
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/images/logo-helpfix.png" 
            alt="HelpFIX Logo" 
            width={100} 
            height={100} 
            className={styles.logo}
          />
        </Link>
      </div>
      <span className={styles.HelloPhrase}>
        Hello {userName ? userName : ''}!
      </span>
      <button className={styles.burger} onClick={toggleMenu}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </button>
      <ul className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/category">Nos services</Link>
        </li>
        <li>
          <Link href="/about">À propos</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/profile">Profil</Link>
        </li>
        <li>
          <Link href="/loginPage">Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
