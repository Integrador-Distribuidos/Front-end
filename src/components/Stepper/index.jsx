import React, { useState } from 'react';
import styles from './stepper.module.css';

const Stepper = () => {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/^0+(?=\d)/, '');
    const parsed = Number(value);
    if (!isNaN(parsed) && parsed >= 1) {
      setCount(parsed);
    } else if (value === '') {
      setCount('');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={decrement}>−</button>
      <input
        type="number"
        className={styles.input}
        value={count}
        onChange={handleChange}
        min="1"
      />
      <button className={styles.button} onClick={increment}>+</button>
    </div>
  );
};

export default Stepper;
