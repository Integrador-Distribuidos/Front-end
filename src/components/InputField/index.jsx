import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, type, value, onChange, width}) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>{label}</label>
            <input
                type = {type}
                value = {value}
                onChange = {onChange}
                style = {{width: width}}
                className = {styles.inputField}
            />
        </div>
    )
}

export default InputField