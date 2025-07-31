import React from 'react';
import styles from './ProductModal.module.css';

const ProductModal = ({ isOpen, onClose, onSubmit, productData, isEdit }) => {
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
          {isEdit ? 'Editar um Produto' : 'Cadastrar um Produto'}
        </h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={productData?.name || ''}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Preço"
            defaultValue={productData?.price || ''}
            required
          />
          <div className={styles.row}>
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              defaultValue={productData?.sku || ''}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Categoria"
              defaultValue={productData?.category || ''}
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Descrição"
            defaultValue={productData?.description || ''}
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            {isEdit ? 'Salvar Alterações' : 'Cadastrar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
