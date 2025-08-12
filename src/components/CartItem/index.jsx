import { Trash2 } from 'lucide-react';
import styles from './CartItem.module.css';

const CartItem = ({ image, name, store, price, quantity, onRemove, onQuantityChange }) => {
  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.topSection}>
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

      <button className={styles.removeButton} onClick={onRemove} title="Remover item">
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
