import { Trash2 } from 'lucide-react';
import styles from './CartItem.module.css';

const CartItem = ({ id, image, name, store, price, quantity, onRemove, onQuantityChange }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <div>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.store}>{store}</p>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.quantityControl}>
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <p className={styles.price}>R$ {(price * quantity).toFixed(2)}</p>
        </div>
      </div>
      <button className={styles.removeButton} onClick={handleRemove}>
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
