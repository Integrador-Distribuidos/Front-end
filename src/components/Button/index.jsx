import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, width, customClass }) => {
    return (
        <button
            className={`${styles.button} ${customClass ? styles[customClass] : ''}`}
            onClick={onClick}
            style={{ width: width || '100%' }}
        >
            {text}
        </button>
    );
};

export default Button;
