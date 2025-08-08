import React from 'react';
import styles from './StockCard.module.css';
import { useNavigate } from 'react-router-dom';
import IconDeleteStore from '../../assets/icons/delete-icon-card-product.png';
import IconEditStore from '../../assets/icons/edit-icon-card-product.png';
import IconSeeStock from '../../assets/icons/visibility_icon.png';
const getTotalProducts = (products) => {
  if (!Array.isArray(products)) return 0;
  return products.reduce((total, produto) => total + (produto.quantity || 0), 0);
};
const formatarData = (dataStr) => {
  if (!dataStr) return '';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia.padStart(2, '0')} de ${new Date(0, mes - 1).toLocaleString('pt-BR', { month: 'long' })} de ${ano}`;
};
const calcularValorTotalEstoque = (products) => {
  if (!Array.isArray(products)) return 0;
  return products.reduce((total, produto) => {
    const quantidade = produto.quantity || 0;
    const preco = produto.price || 0;
    return total + (quantidade * preco);
  }, 0);
};

const StockCard = ({ stock, onEdit, onDelete, onVisualize }) => {
  const navigate = useNavigate();
  const handleVisualize = () => {
    navigate('/control_panel/products', {
      state: { id_stock: stock.id_stock }
    });
  };
  const totalProdutos = getTotalProducts(stock.products);
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <strong className={styles.storeName}>{stock.name}</strong>
        <p className={styles.textLine}>{stock.city} - {stock.uf}</p>
        <p className={styles.textLine}>CEP: {stock.zip_code}</p>
        <p className={styles.textLine}>Endereço: {stock.address}</p>
        <p className={styles.textLine}>Total em estoque: {totalProdutos} unidade{totalProdutos !== 1 ? 's' : ''}</p>
        <p className={styles.field}>
          <strong>Valor total em estoque:</strong> R$ {calcularValorTotalEstoque(stock.products).toFixed(2)}
        </p>
        <p className={styles.textLine}>Criado em: {formatarData(stock.creation_date)}</p>
      </div>

      <div className={styles.actions}>
        <img
          src={IconEditStore}
          alt="editar"
          onClick={() => onEdit && onEdit(stock)}
          className={styles.icon}
        />
        <img
          src={IconSeeStock}
          alt="visualizar"
          onClick={() => handleVisualize()}
          className={styles.icon}
        />
        <img
          src={IconDeleteStore}
          alt="excluir"
          onClick={() => onDelete && onDelete(stock)}
          className={styles.icon}
        />
      </div>
    </div>
  );
};

export default StockCard;
