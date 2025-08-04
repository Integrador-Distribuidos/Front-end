import React from 'react';
import styles from './StoreModal.module.css';

const StoreModal = ({ isOpen, onClose, onSubmit, storeData, isEdit }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOnlyDigits = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

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
            onInput={handleOnlyDigits}
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
              defaultValue={storeData?.uf || ''}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              defaultValue={storeData?.zip_code || ''}
              onInput={handleOnlyDigits}
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
              defaultValue={storeData?.phone_number || ''}
              onInput={handleOnlyDigits}
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
