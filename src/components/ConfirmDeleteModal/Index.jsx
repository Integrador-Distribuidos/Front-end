import React from 'react';
import styles from './ConfirmDeleteModal.module.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, storeName }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir a loja <strong>{storeName}</strong>?</p>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
          <button className={styles.confirmButton} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
