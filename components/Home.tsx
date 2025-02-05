// components/Home.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/thunk';
import { RootState } from '../redux/store';  // Import RootState for type-checking
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Accessing users and loading states correctly
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (userId: string) => {
    router.push(`/edit-user/${userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          {users.map((user, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
