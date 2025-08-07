import React from 'react';
import styles from './StockModal.module.css';

const StockMovementModal = ({ isOpen, onClose, onSubmit, stockData, isEdit, productData }) => {
  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles['h2-modal-product-edit-or-create']}>
          {'Movimentar Estoque'}
        </h2>

        <form onSubmit={onSubmit} className={styles.form}>

          <select name="product" className={styles.storeselect} defaultValue="" required>
            <option value="" disabled>
              Selecione o Produto
            </option>
            {productData.map(product => (
              <option key={product.id_product} value={product.id_product}>
                {product.name} - {product.sku}
              </option>
            ))}
          </select>

          <select name="stock_origin" className={styles.storeselect} defaultValue="" required>
            <option value="" disabled>
              Selecione o Estoque de Origem
            </option>
            {stockData.map(stock => (
              <option key={stock.id_stock} value={stock.id_stock}>
                {stock.name} - {stock.city}
              </option>
            ))}
          </select>

          <select name="stock_destination" className={styles.storeselect} defaultValue="" required>
            <option value="" disabled>
              Selecione o Estoque de Destino
            </option>
            {stockData.map(stock => (
              <option key={stock.id_stock} value={stock.id_stock}>
                {stock.name} - {stock.city}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantidade"
            defaultValue={stockData?.name || ''}
            required
          />

          <textarea
            name="observation"
            placeholder="Observação"
            defaultValue={stockData?.address || ''}
            required
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            {'Movimentar Estoque'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockMovementModal;
