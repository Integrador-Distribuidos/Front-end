import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import IconDeleteProduct from '../../assets/icons/delete-icon-card-product.png';
import IconEditProduct from '../../assets/icons/edit-icon-card-product.png';
import defaultImage from '../../assets/default/product_image_default.jpg';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const formatarData = (dataStr) => {
  if (!dataStr) return 'Data desconhecida';
  const data = new Date(dataStr);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const ProductCard = ({ product, onEdit, onDelete, image_url, flipper }) => {
  const [flipped, setFlipped] = useState(false);

  const {
    name,
    description,
    price,
    sku,
    quantity,
    creation_date,
    created_by,
    stocks
  } = product;

  const imageSrc = image_url
    ? `${baseURL}/images/${image_url}?t=${Date.now()}`
    : defaultImage;

  const formattedDate = formatarData(creation_date);
  const formattedPrice = price?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const truncateText = (text, maxLength) => {
  if (!text) return '---';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};  
const stockInfo = product.stocks && product.stocks.length > 0 ? product.stocks[0] : null;
  return (
<div
  className={`${styles.card} ${flipped ? styles.flipped : ''}`}
  onClick={() => setFlipped(!flipped)}
>
  {/* Frente */}
  <div className={`${styles.cardFace} ${styles.cardFront}`}>
    <img src={imageSrc} alt={name} className={styles.image} />
    <h3 className={styles.name}>{name}</h3>7
    <p className={styles.value}>{quantity ?? 0} unidades</p>
    <p className={styles.price}>{formattedPrice || 'Indefinido'}</p>
  </div>

  {/* Verso */}
  <div className={`${styles.cardFace} ${styles.cardBack}`}>
    <p className={styles.description}>
      {truncateText(description, 260) || 'Sem descrição'}
    </p>

    <p className={styles.label}>SKU</p>
    <p className={styles.value}>{sku || '---'}</p>

    <p className={styles.label}>Quantidade</p>
    <p className={styles.value}>{quantity ?? 0} unidades</p>

    <p className={styles.label}>Criado em</p>
    <p className={styles.value}>{formattedDate}</p>

    <div className={styles.infoBlock}>
      <p className={styles.label}>Estoque</p>
      <p className={styles.value}> {stockInfo ? stockInfo.name : 'Não especificado'}</p>
    </div>

    <div className={styles.actions}>
      <img
        src={IconEditProduct}
        alt="Editar"
        className={styles.editButton}
        onClick={(e) => { e.stopPropagation(); onEdit(product); }}
      />
      <img
        src={IconDeleteProduct}
        alt="Excluir"
        className={styles.deleteButton}
        onClick={(e) => { e.stopPropagation(); onDelete(product); }}
      />
    </div>
  </div>
</div>
  );
};

export default ProductCard;
