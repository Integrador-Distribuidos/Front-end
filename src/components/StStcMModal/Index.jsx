import React from 'react';
import styles from './StStcM.module.css';

const StStcM = ({ isOpen, onClose, onSubmit, stockData, isEdit }) => {
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
              defaultValue={stockData?.state || ''}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              defaultValue={stockData?.cep || ''}
              required
            />
          </div>

          <textarea
            name="address"
            placeholder="Endereço"
            defaultValue={stockData?.address || ''}
            required
          ></textarea>

          <button type="submit" className={styles.submitButton}>
            {isEdit ? 'Salvar Alterações' : 'Cadastrar Estoque'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StStcM;
