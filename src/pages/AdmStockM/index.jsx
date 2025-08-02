import React, { useState } from 'react';
import styles from "../AdmStockM/AdmStockManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import StockModal from '../../components/StockModal/Index.jsx';
import StockMovementModal from '../../components/StockMovementModal/Index.jsx';
import StoreCard from '../../components/StoreCard/Index.jsx';

const AdmStockManage = () => {
  const [stocks, setStocks] = useState([]);
  const [editingStore, setEditingStore] = useState(null);
  const [modalStockOpen, setModalStockOpen] = useState(false);
  const [modalMovementOpen, setModalMovementOpen] = useState(false);

  const handleOpenMovementModal = (store = null) => {
    setEditingStore(store);
    setModalMovementOpen(true);
  };

    const handleOpenStockModal = (store = null) => {
    setEditingStore(store);
    setModalStockOpen(true);
  };

  const handleCloseStockModal = () => {
    setModalStockOpen(false);
    setEditingStore(null);
  };

    const handleCloseMovementModal = () => {
      setModalMovementOpen(false);
    setEditingStore(null);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const newStore = {
    name: form.name.value,
    city: form.city.value,
    state: form.state.value,
    cep: form.cep.value,
    address: form.address.value,
    store: form.store.value,
    author: 'nome elemento',
    createdAt: new Date().toLocaleDateString('pt-BR')
  };

  

  if (editingStore) {
    setStocks(stocks.map(s => s === editingStore ? newStore : s));
  } else {
    setStocks([...stocks, newStore]);
  }

  handleCloseStockModal();
};




  const handleDelete = (storeToDelete) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este Estoque?');
    if (confirmDelete) {
      setStocks(stocks.filter(s => s !== storeToDelete));
    }
  };

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-admmange-store']}>
        <Link to="/" className={styles['element-1-breadcrumb-admmangest']}>Página Inicial</Link>
        <p className={styles['div-contentegt-1-admmangest']}>&gt;</p>
        <Link to="/" className={styles['element-1-breadcrumb-admmangest']}>Painel de Controle</Link>
        <p className={styles['div-contentegt-1-admmangest']}>&gt;</p>
        <span className={styles['element-2-breadcrumb-admmangest']}>Lojas</span>
      </div>
      <div className={styles['breadcrumb-separator-line-admmangest']}></div>
      <NavBar />

      <div className={styles["header-sectionst"]}>
        <h1 className={styles['h1-registed-stocks']}>Estoques Cadastrados</h1>
        <div className={styles["actions-containerst"]}>
          <button onClick={() => handleOpenStockModal()} className={styles["button-cadastrar"]}>
            Cadastrar Estoque
          </button>
          <button onClick={() => handleOpenMovementModal()} className={styles["button-movimentar"]}>
            Movimentar Estoque
          </button>
        </div>
      </div>

      <div className={styles["content-containerst"]}>
        <div className={styles['cardsWrapperst']}>
          {stocks.map((store, idx) => (
            <StoreCard
              key={idx}
              store={store}
              onEdit={handleOpenStockModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <StockModal
        isOpen={modalStockOpen}
        onClose={handleCloseStockModal}
        onSubmit={handleSubmit}
        storeData={editingStore}
        isEdit={!!editingStore}
      />


      <StockMovementModal
        isOpen={modalMovementOpen}
        onClose={handleCloseMovementModal}
        onSubmit={handleSubmit}
        storeData={editingStore}
        isEdit={!!editingStore}
      />

      <Footer />
    </>
  );
};

export default AdmStockManage;
