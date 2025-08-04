import React from 'react';
import styles from './StoreCard.module.css';
import IconDeleteStore from '../../assets/icons/delete-icon-card-product.png';
import IconEditStore from '../../assets/icons/edit-icon-card-product.png';
import IconSeeStock from '../../assets/icons/visibility_icon.png';

const formatarData = (dataStr) => {
  const data = new Date(dataStr);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const StoreCard = ({ store, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <strong className={styles.storeName}>{store.name}</strong>
        <p className={styles.location}>{store.city} - {store.uf}</p>
        <p>Criado em: {formatarData(store.creation_date)}</p>
      </div>
      <div className={styles.actions}>
        <img src={IconEditStore} alt="Editar" onClick={() => onEdit(store)} />
        <img src={IconSeeStock} alt="Visualizar Estoque" />
        <img src={IconDeleteStore} alt="Excluir" onClick={() => onDelete(store)} />
      </div>
    </div>
  );
};

export default StoreCard;
