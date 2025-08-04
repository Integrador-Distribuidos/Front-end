import React from 'react';
import styles from './StockCard.module.css';
import IconDeleteStore from '../../assets/icons/delete-icon-card-product.png';
import IconEditStore from '../../assets/icons/edit-icon-card-product.png';
import IconSeeStock from '../../assets/icons/visibility_icon.png';

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
        <p>{stock.city} - {stock.uf}</p>
        <p>Criado em: {formatarData(stock.creation_date)}</p>
      </div>

      <div className={styles.actions}>
        <img
          src={IconEditStore}
          alt="editar"
          onClick={() => onEdit && onEdit(stock)}
          style={{ cursor: onEdit ? 'pointer' : 'default' }}
        />
        <img
          src={IconSeeStock}
          alt="visualizar"
          onClick={() => onVisualize && onVisualize(stock)}
          style={{ cursor: onVisualize ? 'pointer' : 'default' }}
        />
        <img
          src={IconDeleteStore}
          alt="excluir"
          onClick={() => onDelete && onDelete(stock)}
          style={{ cursor: onDelete ? 'pointer' : 'default' }}
        />
      </div>
    </div>
  );
};

export default StockCard;
