import React, { useState, useEffect } from 'react';
import styles from "../AdmStockM/AdmStockManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import StockModal from '../../components/StockModal/Index.jsx';
import StockMovementModal from '../../components/StockMovementModal/Index.jsx';
import StockCard from '../../components/StockCard/Index.jsx';
import { getAllStocks, updateStock, createStock, deleteStock, createMovementStock} from '../../services/apiStocks.js';
import { getAllStores } from '../../services/apiStore.js';
import { getAllProducts } from '../../services/apiProducts.js';

const AdmStockManage = () => {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [modalStockOpen, setModalStockOpen] = useState(false);
  const [modalMovementOpen, setModalMovementOpen] = useState(false);
  const [visualizeProductsStock, setVisualizePS] = useState(false);
  
  const handleOpenMovementModal = (store = null) => {
    setEditingStock(store);
    setModalMovementOpen(true);
  };

    const handleOpenStockModal = (store = null) => {
    setEditingStock(store);
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
    id_store: form.store.value,
    //author: 'nome elemento',
    creation_date: new Date().toISOString().split("T")[0],
  };

  console.log(newStock)

  try {
    if (editingStock) {
      const res = await updateStock(editingStock.id_stock, newStock);
      setStocks(stocks.map((s) => (s.id === editingStock.id_stock ? res.data : s)));
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
    //author: 'nome elemento',
    creation_date: new Date().toISOString().split("T")[0],
  };

  console.log(newStockMovement)

  try {
    const res = await createMovementStock(newStockMovement);
    //setStocks([...stocks, res.data]);
    handleCloseStockModal();
  } catch (err) {
    console.error('Erro ao salvar estoque:', err);
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
      .catch((err) => console.error('Erro ao buscar estoques:', err));
  }, []);

  useEffect(() => {
    getAllStores()
      .then((res) => setStores(res.data))
      .catch((err) => console.error('Erro ao buscar Lojas:', err));
  }, []);





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
        <div className={styles['cardsWrapperst']}>
          {stocks.map((stock, idx) => (
            <StockCard
              key={idx}
              stock={stock}
              onEdit={handleOpenStockModal}
              onDelete={handleDelete}
              onVisualize
            />
          ))}
        </div>
      </div>

      <StockModal
        isOpen={modalStockOpen}
        onClose={handleCloseStockModal}
        onSubmit={handleSubmit}
        storeData={stores}
        isEdit={!!editingStock}
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
