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

          <select name="store" className={styles.storeselect} defaultValue="">
            <option value="" disabled>
              Selecione uma loja
            </option>
            {storesdata.map(store => (
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

export default StockModal;
