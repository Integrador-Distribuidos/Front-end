import React from 'react';
import styles from './StoreModal.module.css';

const StoreModal = ({ isOpen, onClose, onSubmit, storeData, isEdit }) => {
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
          {isEdit ? 'Editar Loja' : 'Cadastrar uma Loja'}
        </h2>

        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={storeData?.name || ''}
            required
          />

          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            defaultValue={storeData?.cnpj || ''}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="Cidade"
            defaultValue={storeData?.city || ''}
            required
          />

          <div className={styles.row}>
            <input
              type="text"
              name="state"
              placeholder="UF"
              defaultValue={storeData?.state || ''}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              defaultValue={storeData?.cep || ''}
              required
            />
          </div>
          <textarea
            name="address"
            placeholder="Endereço"
            defaultValue={storeData?.address || ''}
            required
          ></textarea>

          <div className={styles.row}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              defaultValue={storeData?.email || ''}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              defaultValue={storeData?.phone || ''}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {isEdit ? 'Salvar Alterações' : 'Cadastrar Estoque'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreModal;
