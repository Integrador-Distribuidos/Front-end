import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, type, value, onChange, width, height}) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>{label}</label>
            <input
                type = {type}
                value = {value}
                onChange = {onChange}
                style = {{width: width, height: height}}
                className = {styles.inputField}
            />
        </div>
    )
}

export default InputField