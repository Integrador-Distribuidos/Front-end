import React, { useState, useEffect } from 'react';
import styles from "../AdmSM/AdmStoreManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import StoreModal from '../../components/StoreModal/Index.jsx';
import StoreCard from '../../components/StoreCard/Index.jsx';
import Pagination from '../../components/HomePage/Pagination/index.jsx'; 
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
} from '../../api/stores';

const AdmStoreManage = () => {
  const [stores, setStores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [filter, setFilter] = useState("recent");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    getStores()
      .then((res) => {
        setStores(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar lojas:", err);
        alert("Erro ao buscar lojas.");
      });
  }, []);

  const handleOpenModal = (store = null) => {
    setEditingStore(store);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingStore(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const storeData = {
      name: form.name.value,
      cnpj: form.cnpj.value.replace(/\D/g, ''),
      city: form.city.value,
      uf: form.state.value,
      zip_code: form.cep.value.replace(/\D/g, ''),
      address: form.address.value,
      creation_date: new Date().toISOString().split("T")[0],
      email: form.email.value,
      phone_number: form.phone.value.replace(/\D/g, ''),
    };

    try {
      if (editingStore) {
        await updateStore(editingStore.id_store, storeData);
        const updatedList = stores.map((s) =>
          s.id_store === editingStore.id_store ? { ...s, ...storeData } : s
        );
        setStores(updatedList);
      } else {
        const res = await createStore(storeData);
        setStores([...stores, res.data]);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Erro ao salvar loja:", err.response?.data || err.message);
      alert("Erro ao salvar loja.");
    }
  };

  const handleDelete = async (storeToDelete) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta loja?');
    if (!confirmDelete) return;

    try {
      await deleteStore(storeToDelete.id_store);
      setStores(stores.filter((s) => s.id_store !== storeToDelete.id_store));
    } catch (err) {
      console.error("Erro ao deletar loja:", err);
      alert("Erro ao deletar loja.");
    }
  };

  const filteredStores = [...stores].sort((a, b) => {
    if (filter === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.creation_date) - new Date(a.creation_date);
  });

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const currentItems = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="recent">Mais Recentes</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles["content-containerst"]}>
        <div className={styles['cardsWrapperst']}>
          {currentItems.map((store) => (
            <StoreCard
              key={store.id_store}
              store={store}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onPageChange={(page) => setCurrentPage(page)}
          />
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
