import React, { useState } from 'react';
import styles from "../StStcM/StStcM.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import StStcM from '../../components/StStcMModal/Index.jsx';
import StStcMCard from '../../components/StStcMCard/Index.jsx';

const AdmStockManage = () => {
  const nomeLoja = "Nome Loja";

  const [stocks, setStocks] = useState([
    {
      id: 1,
      name: 'Estoque 1',
      city: 'São Paulo',
      state: 'SP',
      cep: '01000-000',
      address: 'Rua A, 123',
      author: 'Teste',
      createdAt: '01/08/2025',
    },
    {
      id: 2,
      name: 'Estoque 2',
      city: 'Rio de Janeiro',
      state: 'RJ',
      cep: '20000-000',
      address: 'Rua B, 456',
      author: 'Teste',
      createdAt: '02/08/2025',
    },
  ]);
  const [editingStock, setEditingStock] = useState(null);
  const [modalStockOpen, setModalStockOpen] = useState(false);

  const handleOpenStockModal = (stock = null) => {
    setEditingStock(stock);
    setModalStockOpen(true);
  };

  const handleCloseStockModal = () => {
    setModalStockOpen(false);
    setEditingStock(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newStock = {
      id: editingStock?.id || Date.now(),
      name: form.name.value,
      city: form.city.value,
      state: form.state.value,
      cep: form.cep.value,
      address: form.address.value,
      author: 'nome elemento', 
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };

    if (editingStock) {
      setStocks(stocks.map(s => s.id === editingStock.id ? newStock : s));
    } else {
      setStocks([...stocks, newStock]);
    }

    handleCloseStockModal();
  };

  const handleDelete = (stockToDelete) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este Estoque?');
    if (confirmDelete) {
      setStocks(stocks.filter(s => s.id !== stockToDelete.id));
    }
  };

  const resetFakeData = () => {
    setStocks([
      {
        id: 1,
        name: 'Estoque 1',
        city: 'São Paulo',
        state: 'SP',
        cep: '01000-000',
        address: 'Rua A, 123',
        author: 'Teste',
        createdAt: '01/08/2025',
      },
      {
        id: 2,
        name: 'Estoque 2',
        city: 'Rio de Janeiro',
        state: 'RJ',
        cep: '20000-000',
        address: 'Rua B, 456',
        author: 'Teste',
        createdAt: '02/08/2025',
      },
    ]);
  };

  const clearStocks = () => setStocks([]);

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-admmange-store']}>
        <Link to="/" className={styles['element-1-breadcrumb-admmangest']}>Página Inicial</Link>
        <p className={styles['div-contentegt-1-admmangest']}>&gt;</p>
        <Link to="/control_panel" className={styles['element-1-breadcrumb-admmangest']}>Painel de Controle</Link>
        <p className={styles['div-contentegt-1-admmangest']}>&gt;</p>
        <Link to="/control_panel/stores" className={styles['element-1-breadcrumb-admmangest']}>Lojas</Link>
        <p className={styles['div-contentegt-1-admmangest']}>&gt;</p>
        <span className={styles['element-2-breadcrumb-admmangest']}>Estoques {nomeLoja}</span>
      </div>
      <div className={styles['breadcrumb-separator-line-admmangest']}></div>

      <NavBar />

      <div className={styles["header-sectionst"]}>
        <h1 className={styles['h1-registed-stocks']}>Estoques da {nomeLoja}</h1>
        <div className={styles["actions-containerst"]}>
          <button onClick={handleOpenStockModal} className={styles["button-cadastrar"]}>
            Cadastrar Estoque
          </button>
          <button onClick={resetFakeData} style={{ marginLeft: 10 }}>
            Resetar Dados Fake
          </button>
          <button onClick={clearStocks} style={{ marginLeft: 10 }}>
            Limpar Estoques
          </button>
        </div>
      </div>

      <div className={styles["content-containerst"]}>
        <div className={styles['cardsWrapperst']}>
          {stocks.length === 0 && <p>Nenhum estoque cadastrado.</p>}
          {stocks.map((stock) => (
            <StStcMCard
              key={stock.id}
              store={stock}
              onEdit={() => handleOpenStockModal(stock)}
              onDelete={() => handleDelete(stock)}
            />
          ))}
        </div>
      </div>

      <StStcM
        isOpen={modalStockOpen}
        onClose={handleCloseStockModal}
        onSubmit={handleSubmit}
        stockData={editingStock}
        isEdit={!!editingStock}
      />

      <Footer />
    </>
  );
};

export default AdmStockManage;
