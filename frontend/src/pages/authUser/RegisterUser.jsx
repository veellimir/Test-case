import React, { useState } from 'react';
import { Link } from "react-router-dom"

import { register } from '../../services/AuthUser/api';
import styles from './Login.module.css';


const Register = () => {
  const [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [message, setMessage] = useState('');
        
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        await register({ username, email, password });
        setMessage('Регистрация успешна! Теперь вы можете войти.');
    } catch (err) {
        setMessage('Ошибка регистрации: ' + err.response.data.detail);
    }
  };

  return (
    <div className="auth_container">
      <h2 className="auth_title">Регистрация</h2>
      <form className="auth_form" onSubmit={handleRegister}>
        <input
          className="field_input"
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="field_input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="field_input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="success_button" type="submit">Зарегистрироваться</button>
      </form>
      <div className={styles.register_link_container}>
          <p>Уже есть аккаунт? <Link to="/Login" className="register_link">Войти</Link></p>
      </div>
      {message && <p className='message_success'>{message}</p>}
    </div>
  );
};

export default Register;
