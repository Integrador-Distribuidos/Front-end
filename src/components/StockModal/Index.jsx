import React, { useState, useEffect } from 'react';
import styles from './StockModal.module.css';

const StockModal = ({ isOpen, onClose, onSubmit, stockData, isEdit, storeData }) => {
  if (!isOpen) return null;

  // Estados locais para controlar inputs de UF e CEP com máscara
  const [uf, setUf] = useState(stockData?.uf || '');
  const [cep, setCep] = useState(stockData?.zip_code || '');

  useEffect(() => {
    setUf(stockData?.uf || '');
    setCep(stockData?.zip_code || '');
  }, [stockData]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // Máscara para UF (apenas letras maiúsculas, máximo 2)
  const handleUfChange = (e) => {
    let value = e.target.value.toUpperCase();
    // Remove caracteres que não sejam letras
    value = value.replace(/[^A-Z]/g, '');
    // Limita a 2 caracteres
    if (value.length > 2) value = value.slice(0, 2);
    setUf(value);
  };

  // Máscara para CEP (formato 99999-999)
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }
    setCep(value);
  };

  // Para o onSubmit funcionar, o formulário precisa dos valores atualizados de UF e CEP
  // Então vamos controlar eles no form via inputs hidden ou alteramos diretamente os inputs

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles['h2-modal-product-edit-or-create']}>
          {isEdit ? 'Editar Estoque' : 'Cadastrar um Estoque'}
        </h2>

        <form
          onSubmit={(e) => {
            // Atualiza os valores nos inputs reais antes de enviar
            e.target.state.value = uf;
            e.target.cep.value = cep;
            onSubmit(e);
          }}
          className={styles.form}
        >
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
              value={uf}
              onChange={handleUfChange}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={cep}
              onChange={handleCepChange}
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
