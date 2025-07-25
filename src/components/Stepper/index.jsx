
import React, { useState } from 'react';
import styles from '../Stepper/stepper.module.css'

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
        <>
            <div className={styles["counter-container"]}>
                <button className={styles["counter-button-minus"]} onClick={decrement}>−</button>
                <input type='number' className={styles["count"]} value={count} onChange={handleChange}min="1" />
                <button className={styles["counter-button-plus"]} onClick={increment}>+</button>
            </div>
        </>
    )
}

export default Stepper