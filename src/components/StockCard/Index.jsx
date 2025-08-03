import React from 'react';
import styles from './StockCard.module.css';
import IconDeleteStore from '../../assets/icons/delete-icon-card-product.png'
import IconEditStore from '../../assets/icons/edit-icon-card-product.png'
import IconSeeStock from '../../assets/icons/visibility_icon.png'

const formatarData = (dataStr) => {
  if (!dataStr) return '';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia.padStart(2, '0')} de ${new Date(0, mes - 1).toLocaleString('pt-BR', { month: 'long' })} de ${ano}`;
};

const StockCard = ({ stock, onEdit, onDelete, onVisualize }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <strong className={styles.storeName}>{stock.name}</strong>
        <p>Criado por: {stock.author}</p>
        <p>Criado em: {formatarData(stock.creation_date)}</p>
      </div>

      <div className={styles.actions}>
        <img src={IconEditStore} alt="edit" onClick={() => onEdit(stock)} />
        <img src={IconSeeStock} alt="see_details" onClick={() => onVisualize(stock)}/>
        <img src={IconDeleteStore} alt="delete" onClick={() => onDelete(stock)} />
      </div>
    </div>
  );
};

export default StockCard;
