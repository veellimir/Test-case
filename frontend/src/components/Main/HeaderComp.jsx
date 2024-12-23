import React from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../services/AuthUser/api';
import PrivateRoute from '../../pages/authUser/PrivateRouter';

import  ProfileComp  from '../../components/User/ProfileComp'


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        await logout(authToken);
      }
    } catch (err) {
        console.error('Ошибка при выходе:', err);
    } finally {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    }
  };

  return (
    <PrivateRoute>
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>CRM My Tasks</h1>
        <nav>
          <ul style={styles.navList}>
            <li><ProfileComp/></li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} className='success_button btn-for-danger'>
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    </PrivateRoute>
  );
};

const styles = {
  header: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '10px 20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
};

export default Header;
