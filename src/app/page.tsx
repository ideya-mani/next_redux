"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteUser, fetchUsers } from '../../redux/thunk';

const Home: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle delete user
  const handleDelete = async (userId: string) => {
    await dispatch(deleteUser(userId));
    dispatch(fetchUsers());
  };

  // Handle edit user
  const handleEdit = (userId: string) => {
    router.push(`/edit-user/${userId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link> | 
          <Link href="/add-user" className={styles.navLink}>Add User</Link>
        </nav>
      </header>
      <h1 className={styles.title}>Users</h1>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Serial No.</th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id} className={styles.tableRow}>
                <td className={styles.tableData}>{index + 1}</td>
                <td className={styles.tableData}>{user.name}</td>
                <td className={styles.tableData}>{user.email}</td>
                <td className={styles.tableActions}>
                  <button 
                    onClick={() => handleEdit(user._id)} 
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className={styles.tableData}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
