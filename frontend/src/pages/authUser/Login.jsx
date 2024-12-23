import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

import { login } from '../../services/AuthUser/api.js';
import styles from './Login.module.css';


const Login = () => {
  const [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        [error, setError] = useState(''),
        navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password });

      if (response.data.access) {
        localStorage.setItem('authToken', response.data.access);
        navigate('/');
      } else {
        setError('Ошибка входа. Проверьте данные.');
      }
    } catch (err) {
      setError('Ошибка входа. Проверьте данные.');
    }
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="auth_container">
      <h2 className="auth_title">Вход</h2>
      <form className="auth_form" onSubmit={handleLogin}>
        <input
          className="field_input"
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="field_input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="success_button" type="submit">Войти</button>
      </form>
      <div className={styles.register_link_container}>
        <p>Нет аккаунта? <Link to="/Register" className="register_link">Зарегистрироваться</Link></p>
      </div>
      {error && <p className="message_error">{error}</p>}
    </div>
  );
};

export default Login;
