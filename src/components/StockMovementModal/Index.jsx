import React from 'react';
import styles from './StockModal.module.css';


const storesdata = [
  {
    name: "Livraria Central",
    cnpj: "12.345.678/0001-90",
    city: "Fortaleza",
    uf: "CE",
    zip_code: "60020-000",
    address: "Rua 24 de Maio, 150",
    creation_date: "2023-03-10",
    email: "contato@livrariacentral.com.br",
    phone_number: "(85) 3054-6789",
    id_store: 1
  },
  {
    name: "TecnoInfo",
    cnpj: "23.456.789/0001-12",
    city: "Natal",
    uf: "RN",
    zip_code: "59015-000",
    address: "Av. Prudente de Morais, 230",
    creation_date: "2022-11-05",
    email: "vendas@tecnoinfo.com.br",
    phone_number: "(84) 3210-1234",
    id_store: 2
  },
  // ...adicione mais lojas se necessário
];

const StockMovementModal = ({ isOpen, onClose, onSubmit, stockData, isEdit, storeData }) => {
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

          <select name="product" className={styles.storeselect} defaultValue="">
            <option value="" disabled>
              Selecione o Produto
            </option>
            {storesdata.map(store => (
              <option key={store.id_store} value={store.id_store}>
                {store.name} - {store.cnpj}
              </option>
            ))}
          </select>

          <select name="stock_origin" className={styles.storeselect} defaultValue="">
            <option value="" disabled>
              Selecione o Estoque de Origem
            </option>
            {storesdata.map(store => (
              <option key={store.id_store} value={store.id_store}>
                {store.name} - {store.cnpj}
              </option>
            ))}
          </select>

          <select name="stock_destination" className={styles.storeselect} defaultValue="">
            <option value="" disabled>
              Selecione o Estoque de Destino
            </option>
            {storesdata.map(store => (
              <option key={store.id_store} value={store.id_store}>
                {store.name} - {store.cnpj}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="name"
            placeholder="Quantidade"
            defaultValue={stockData?.name || ''}
            required
          />



  
          <textarea
            name="address"
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
