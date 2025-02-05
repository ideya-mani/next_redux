"use client";  // This marks the file as a client component

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/AddUser.module.css'
import Link from 'next/link';

const AddUser: React.FC = () => {
  const [newUser, setNewUser] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/users', newUser)
      .then(() => {
        router.push('/');  
      })
      .catch(error => console.error(error));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link> | 
          <Link href="/add-user" className={styles.navLink}>Add User</Link>
        </nav>
      </header>
      <h1 className={styles.title}>Add New User</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className={styles.input}
        />
        <button type="submit" className={styles.submitButton}>Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
