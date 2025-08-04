import React from 'react';
import styles from './ProductCard.module.css';
import IconDeleteProduct from '../../assets/icons/delete-icon-card-product.png';
import IconEditProduct from '../../assets/icons/edit-icon-card-product.png';
import defaultImage from '../../assets/default/product_image_default.jpg';

const formatarData = (dataStr) => {
  if (!dataStr) return 'Data desconhecida';
  const data = new Date(dataStr);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const baseURL = import.meta.env.VITE_API_BASE_URL;
const ProductCard = ({ product, onEdit, onDelete, image_url}) => {
  const imageSrc = image_url ? `${baseURL}/images/${image_url}` : defaultImage;
  return (
    <div className={styles.card}>
      <div className={styles.image}><img className={styles.image} src={imageSrc} alt="" /></div>
      <div className={styles.info}>
        <strong>{product.name}</strong>
        <p>Criado por: {product.author || 'Desconhecido'}</p>
        <p>Criado em: {formatarData(product.createdAt || product.creation_date)}</p>
      </div>
      <img
        src={IconEditProduct}
        alt="edit-icon"
        className={styles.editButton}
        onClick={() => onEdit(product)}
      />
      <img
        src={IconDeleteProduct}
        alt="delete-icon"
        className={styles.deleteButton}
        onClick={() => onDelete(product)}
      />
    </div>
  );
};

export default ProductCard;
