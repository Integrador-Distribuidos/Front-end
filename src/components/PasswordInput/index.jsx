import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './PasswordInput.module.css';

const PasswordInput = ({ label ,password, setPassword, outline }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={`${styles.passwordContainer} ${outline ? styles.outlined : ''}`}>
      <label className={styles.passwordLabel}>{label}</label>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.passwordField}
      />
      <button
        className={styles.visibilityToggle}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;