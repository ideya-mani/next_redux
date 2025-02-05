// components/Header.tsx
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link> | 
        <Link href="/add-user" className={styles.navLink}>Add User</Link>
      </nav>
    </header>
  );
};

export default Header;
