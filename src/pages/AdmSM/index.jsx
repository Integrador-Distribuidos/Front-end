import React, { useState, useEffect } from 'react';
import styles from "../AdmSM/AdmStoreManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import StoreModal from '../../components/StoreModal/Index.jsx';
import StoreCard from '../../components/StoreCard/Index.jsx';
import Pagination from '../../components/HomePage/Pagination/index.jsx';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/Index.jsx';

import {
  deleteStore,
} from '../../api/stores';

import {
  createStore,
  updateStore,
  getStoresByUserID,
} from '../../services/apiStore.js';


const AdmStoreManage = () => {
  const [stores, setStores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [filter, setFilter] = useState("recent");
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await getStoresByUserID();
      setStores(res.data);
    } catch (err) {
      console.error("Erro ao buscar lojas:", err);
    }
  };

  const handleOpenModal = (store = null) => {
    setEditingStore(store);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingStore(null);
  };

  const handleSubmit = async (formData) => {
    try {
      let createdStore = null;

      if (editingStore) {
        await updateStore(editingStore.id_store, formData);
        createdStore = { ...editingStore, ...formData };
      } else {
        createdStore = await createStore(formData);
      }

      setErrorMessage('');
      await fetchStores();
      handleCloseModal();

      return createdStore;
    } catch (err) {
      console.error("Erro ao salvar loja:", err);

      let errorMessage = "Erro desconhecido";
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setErrorMessage(errorMessage);
      throw err;
    }
  };

  const openDeleteModal = (store) => {
    setStoreToDelete(store);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!storeToDelete) return;

    try {
      await deleteStore(storeToDelete.id_store);
      setStores(stores.filter((s) => s.id_store !== storeToDelete.id_store));
      setDeleteModalOpen(false);
      setStoreToDelete(null);
    } catch (err) {
      console.error("Erro ao deletar loja:", err);
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
        {stores.length === 0 ? (
          <p className={styles['defalt-text']}>Nenhuma Loja cadastrada</p>
        ) : (
          <div className={styles['cardsWrapperst']}>
            {currentItems.map((store) => (
              <StoreCard
                key={store.id_store}
                store={store}
                onEdit={handleOpenModal}
                onDelete={() => openDeleteModal(store)}
              />
            ))}
          </div>
        )}

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
        error={errorMessage}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        storeName={storeToDelete?.name}
      />

      <Footer />
    </>
  );
};

export default AdmStoreManage;
