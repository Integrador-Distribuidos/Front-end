import React from 'react';
import styles from './StStcMCard.module.css';
import IconDeleteStore from '../../assets/icons/delete-icon-card-product.png';
import IconEditStore from '../../assets/icons/edit-icon-card-product.png';
import IconSeeStock from '../../assets/icons/visibility_icon.png';

const formatarData = (dataStr) => {
  const [dia, mes, ano] = dataStr.split('/');
  const data = new Date(`${ano}-${mes}-${dia}`);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const StStcMCard = ({ store, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <strong className={styles.storeName}>{store.name}</strong>
        <p className={styles.location}>{store.city} - {store.state}</p>
        <p>Criado por: {store.author}</p>
        <p>Criado em: {formatarData(store.createdAt)}</p>
        <p>Endereço: {store.address}</p>
        <p>CEP: {store.cep}</p>
      </div>

      <div className={styles.actions}>
        <img src={IconEditStore} alt="edit" onClick={() => onEdit(store)} />
        <img src={IconSeeStock} alt="see_details" />
        <img src={IconDeleteStore} alt="delete" onClick={() => onDelete(store)} />
      </div>
    </div>
  );
};

export default StStcMCard;
