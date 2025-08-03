import React, { useState } from 'react';
import styles from "../AdmSM/AdmStoreManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import StoreModal from '../../components/StoreModal/Index.jsx';
import StoreCard from '../../components/StoreCard/Index.jsx';

const AdmStoreManage = () => {
  const [stores, setStores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [filter, setFilter] = useState("recent");

  const handleOpenModal = (store = null) => {
    setEditingStore(store);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingStore(null);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const newStore = {
    name: form.name.value,
    cnpj: form.cnpj.value,
    city: form.city.value,
    state: form.state.value,
    cep: form.cep.value,
    address: form.address.value,
    email: form.email.value,
    phone: form.phone.value,
    author: 'nome elemento',
    createdAt: new Date().toLocaleDateString('pt-BR')
  };

  if (editingStore) {
    setStores(stores.map(s => s === editingStore ? newStore : s));
  } else {
    setStores([...stores, newStore]);
  }

  handleCloseModal();
};

  const handleDelete = (storeToDelete) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta loja?');
    if (confirmDelete) {
      setStores(stores.filter(s => s !== storeToDelete));
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
        <h1 className={styles['h1-registed-stocks']}>Lojas Cadastradas</h1>
        <div className={styles["actions-containerst"]}>
          <button onClick={() => handleOpenModal()} className={styles["button-cadastrar"]}>
            Cadastrar Loja
          </button>
          <div className={styles["filterst"]}>
            <label htmlFor="filterst-select">Filtrar Por:</label>
            <select
              id="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="recent">Mais Recentes</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles["content-containerst"]}>
        <div className={styles['cardsWrapperst']}>
          {stores.map((store, idx) => (
            <StoreCard
              key={idx}
              store={store}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <StoreModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        storeData={editingStore}
        isEdit={!!editingStore}
      />
      <Footer />
    </>
  );
};

export default AdmStoreManage;
