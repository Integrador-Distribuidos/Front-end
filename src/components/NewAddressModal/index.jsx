import React from 'react';
import styles from './NewAddressModal.module.css';
import InputField from '../InputField';

const NewAddressModal = ({ city, street, neighborhood, uf, zip_code, number, onClose, onSave }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={{ marginBottom: '12px' }}>Novo Endereço</h2>

        <InputField label="Cidade" type="text" value={city} width="100%" height="22px" />
        <InputField label="Rua" type="text" value={street} width="100%" height="22px" />
        <InputField label="Bairro" type="text" value={neighborhood} width="100%" height="22px" />

        <div className={styles.row}>
          <InputField label="UF" type="text" value={uf} width="40px" height="22px" />
          <InputField label="CEP" type="text" value={zip_code} width="90px" height="22px" />
          <InputField label="Número" type="text" value={number} width="90px" height="22px" />
        </div>

        <button className={styles.saveButton} onClick={onSave}>Salvar</button>
        <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default NewAddressModal;
