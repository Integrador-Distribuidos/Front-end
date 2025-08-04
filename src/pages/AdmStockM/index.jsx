import React, { useState, useEffect } from 'react';
import styles from "../AdmStockM/AdmStockManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link, useNavigate } from 'react-router-dom';
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
  createMovementStock
} from '../../services/apiStocks.js';
import { getAllStores } from '../../services/apiStore.js';
import { getAllProducts } from '../../services/apiProducts.js';

const AdmStockManage = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [modalStockOpen, setModalStockOpen] = useState(false);
  const [modalMovementOpen, setModalMovementOpen] = useState(false);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(stocks.length / itemsPerPage);
  const currentItems = stocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newStock = {
      name: form.name.value,
      city: form.city.value,
      uf: form.state.value,
      zip_code: form.cep.value,
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

  const handleDelete = async (stockToDelete) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este Estoque?');
    if (!confirmDelete) return;

    try {
      await deleteStock(stockToDelete.id_stock);
      setStocks(stocks.filter((s) => s.id_stock !== stockToDelete.id_stock));
    } catch (err) {
      console.error('Erro ao deletar estoque:', err);
    }
  };

  useEffect(() => {
    getAllStocks()
      .then((res) => setStocks(res.data))
      .catch((err) => console.error('Erro ao buscar estoques:', err));
  }, []);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, []);

  useEffect(() => {
    getAllStores()
      .then((res) => setStores(res.data))
      .catch((err) => console.error('Erro ao buscar lojas:', err));
  }, []);


    

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
        </div>
      </div>

      <div className={styles["content-containerst"]}>
        {stocks.length === 0 ? (
          <p className={styles['defalt-text']}>Nenhum estoque cadastrado</p>
        ) : (
          <div className={styles['cardsWrapperst']}>
            {stocks.map((stock, idx) => (
              <StockCard
                key={idx}
                stock={stock}
                onEdit={handleOpenStockModal}
                onDelete={handleDelete}
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

      <Footer />
    </>
  );
};

export default AdmStockManage;
