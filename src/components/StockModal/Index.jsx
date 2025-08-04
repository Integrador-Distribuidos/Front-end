import React from 'react';
import styles from './StockModal.module.css';

const StockModal = ({ isOpen, onClose, onSubmit, stockData, isEdit, storeData }) => {
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
          {isEdit ? 'Editar Estoque' : 'Cadastrar um Estoque'}
        </h2>

        <form onSubmit={onSubmit} className={styles.form}>

          <select
            name="store"
            className={styles.storeselect}
            defaultValue={stockData?.id_store || ''}
            required
          >
            <option value="" disabled>
              Selecione uma loja
            </option>
            {storeData.map((store) => (
              <option key={store.id_store} value={store.id_store}>
                {store.name} - {store.cnpj}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={stockData?.name || ''}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="Cidade"
            defaultValue={stockData?.city || ''}
            required
          />

          <div className={styles.row}>
            <input
              type="text"
              name="state"
              placeholder="UF"
              maxLength={2}
              defaultValue={stockData?.uf || ''}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              defaultValue={stockData?.zip_code || ''}
              required
            />
          </div>

          <textarea
            name="address"
            placeholder="Endereço"
            defaultValue={stockData?.address || ''}
            required
          />

          <button type="submit" className={styles.submitButton}>
            {isEdit ? 'Salvar Alterações' : 'Cadastrar Estoque'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
