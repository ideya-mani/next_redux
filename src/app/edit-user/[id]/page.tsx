"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { fetchUserById, updateUser } from '../../../../redux/thunk';
import styles from '../../../../styles/EditUser.module.css';

const EditUser: React.FC = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedUser, loading } = useAppSelector((state) => state.user);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
  
  const userID = () => {
    
  }
  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      setUpdatedUser({ name: selectedUser.name, email: selectedUser.email });
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateUser({ userId: id, updatedData: updatedUser }));
      router.push('/');
    }
  };

  if (loading) return <p>Loading user data...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit User</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.submitButton}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
