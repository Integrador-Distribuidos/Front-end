import React from 'react';
import styles from './TextContent.module.css';

const TextContent = ({ label, text, children, customClass }) => {
    return (
        <div className={styles.textContent}>
            <label className={styles.label}>{label}</label>
            <p className={`${styles.text} ${customClass ? styles[customClass] : ''}`}>{text}</p>
            {children}
        </div>
    );
}

export default TextContent