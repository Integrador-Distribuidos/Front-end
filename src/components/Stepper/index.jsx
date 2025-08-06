import React from 'react';
import styles from './stepper.module.css';

const Stepper = ({ value, setValue }) => {
  const increment = () => setValue(prev => prev + 1);
  const decrement = () => setValue(prev => (prev > 1 ? prev - 1 : 1));

  const handleChange = (e) => {
    const raw = e.target.value.replace(/^0+(?=\d)/, '');
    const parsed = Number(raw);

    if (!isNaN(parsed) && parsed >= 1) {
      setValue(parsed);
    } else if (raw === '') {
      setValue('');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={decrement}>−</button>
      <input
        type="number"
        className={styles.input}
        value={value}
        onChange={handleChange}
        min="1"
      />
      <button className={styles.button} onClick={increment}>+</button>
    </div>
  );
};

export default Stepper;
