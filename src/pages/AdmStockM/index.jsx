import React, { useState, useEffect } from 'react';
import styles from "../AdmStockM/AdmStockManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import StockModal from '../../components/StockModal/Index.jsx';
import StockMovementModal from '../../components/StockMovementModal/Index.jsx';
import StockCard from '../../components/StockCard/Index.jsx';
import Pagination from '../../components/HomePage/Pagination/index.jsx';
import {
  getAllStocks,
  updateStock,
  createStock,
  deleteStock,
  createMovementStock,
} from '../../services/apiStocks.js';
import { getStoresByUserID } from '../../services/apiStore.js';
import { getAllProducts } from '../../services/apiProducts.js';

const AdmStockManage = () => {
  const location = useLocation();
  const storeId = location.state?.id_store;
  const navigate = useNavigate();

  const [filter, setFilter] = useState("recent");
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [modalStockOpen, setModalStockOpen] = useState(false);
  const [modalMovementOpen, setModalMovementOpen] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    let filtered = stocks;

    if (storeId) {
      filtered = filtered.filter(stock => stock.id_store === storeId);
    }

    if (filter === "alphabetical") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = [...filtered].sort((a, b) =>
        new Date(b.creation_date) - new Date(a.creation_date)
      );
    }

    setFilteredStocks(filtered);
  }, [stocks, filter, storeId]);

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const currentItems = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    getAllStocks()
      .then((res) => setStocks(res.data))
      .catch((err) => console.error('Erro ao buscar estoques:', err));

    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));

    getStoresByUserID()
      .then((res) => setStores(res.data))
      .catch((err) => console.error('Erro ao buscar lojas:', err));
  }, []);

  const handleOpenMovementModal = (stock = null) => {
    setEditingStock(stock);
    setModalMovementOpen(true);
  };

  const handleOpenStockModal = (stock = null) => {
    setEditingStock(stock);
    setModalStockOpen(true);
  };

  const handleCloseStockModal = () => {
    setModalStockOpen(false);
    setEditingStock(null);
  };

  const handleCloseMovementModal = () => {
    setModalMovementOpen(false);
    setEditingStock(null);
  };

  const handleOpenDeleteModal = (stock) => {
    setStockToDelete(stock);
    setModalDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
    setStockToDelete(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!stockToDelete) return;
    try {
      await deleteStock(stockToDelete.id_stock);
      setStocks(stocks.filter((s) => s.id_stock !== stockToDelete.id_stock));
      handleCloseDeleteModal();
    } catch (err) {
      console.error('Erro ao deletar estoque:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formatCEP = (cep) => {
      let numbers = cep.replace(/\D/g, '');
      if (numbers.length > 5) {
        return numbers.slice(0, 5) + '-' + numbers.slice(5, 8);
      }
      return numbers;
    };

    const newStock = {
      name: form.name.value,
      city: form.city.value,
      uf: form.state.value.toUpperCase(), 
      zip_code: formatCEP(form.cep.value),
      address: form.address.value,
      id_store: Number(form.store.value),
      creation_date: new Date().toISOString().split("T")[0],
    };

    try {
      if (editingStock) {
        const res = await updateStock(editingStock.id_stock, newStock);
        setStocks(stocks.map((s) =>
          s.id_stock === editingStock.id_stock ? res.data : s
        ));
      } else {
        const res = await createStock(newStock);
        setStocks([...stocks, res.data]);
      }
      handleCloseStockModal();
    } catch (err) {
      console.error('Erro ao salvar estoque:', err);
    }
  };

  const handleMovementSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newStockMovement = {
      id_product: Number(form.product.value),
      id_stock_origin: Number(form.stock_origin.value),
      id_stock_destination: Number(form.stock_destination.value),
      quantity: Number(form.quantity.value),
      observation: form.observation.value,
      creation_date: new Date().toISOString().split("T")[0],
    };

    try {
      await createMovementStock(newStockMovement);
      handleCloseMovementModal();
    } catch (err) {
      console.error('Erro ao salvar movimentação:', err);
    }
  };

  const handleVisualize = (stock) => {
    localStorage.setItem('id_stock', stock.id_stock);
    navigate(`/control_panel/stock/${stock.id_stock}/products`);
  };

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-admmange-store']}>
        <Link to="/" className={styles['element-1-breadcrumb-admmangest']}>Página Inicial</Link>
        <p className={styles['div-contentegt-1-admmangest']}>&gt;</p>
        <Link to="/" className={styles['element-1-breadcrumb-admmangest']}>Painel de Controle</Link>
        <p className={styles['div-contentegt-1-admmangest']}>&gt;</p>
        <span className={styles['element-2-breadcrumb-admmangest']}>Estoques</span>
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
        {currentItems.length === 0 ? (
          <p className={styles['defalt-text']}>Nenhum Estoque Encontrado!</p>
        ) : (
          <div className={styles['cardsWrapperst']}>
            {currentItems.map((stock, idx) => (
              <StockCard
                key={idx}
                stock={stock}
                onEdit={handleOpenStockModal}
                onDelete={() => handleOpenDeleteModal(stock)} 
                onVisualize={handleVisualize}
              />
            ))}
          </div>
        )}
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

      <StockModal
        isOpen={modalStockOpen}
        onClose={handleCloseStockModal}
        onSubmit={handleSubmit}
        storeData={stores}
        isEdit={!!editingStock}
        stockData={editingStock}
      />

      <StockMovementModal
        isOpen={modalMovementOpen}
        onClose={handleCloseMovementModal}
        onSubmit={handleMovementSubmit}
        stockData={stocks}
        productData={products}
        isEdit={!!editingStock}
      />

      {modalDeleteOpen && (
        <div className={styles['modalOverlay']}>
          <div className={styles['modalDelete']}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o estoque "{stockToDelete?.name}"?</p>
            <div className={styles['modalActions']}>
              <button onClick={handleDeleteConfirmed} className={styles['buttonConfirm']}>
                Sim, excluir
              </button>
              <button onClick={handleCloseDeleteModal} className={styles['buttonCancel']}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AdmStockManage;
