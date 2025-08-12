import React, { useState, useEffect } from 'react';
import styles from "../AdmPM/AdmProductManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import ProductModal from '../../components/ProductModal/Index.jsx';
import ProductCard from '../../components/ProductCard/Index.jsx';
import Pagination from '../../components/HomePage/Pagination/index.jsx';

import {
  getProductsforUser,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../services/apiProducts';

import { getAllStocks } from '../../services/apiStocks.js';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick} style={{
      position: 'fixed',
      top:0, left:0, right:0, bottom:0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        padding: '20px 30px',
        borderRadius: '8px',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0,0,0,0.25)'
      }}>
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o produto <strong>{productName}</strong>?</p>
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-around' }}>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: '#e53935',
              border: 'none',
              padding: '8px 16px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '20px'
            }}
          >
            Sim
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#9e9e9e',
              border: 'none',
              padding: '8px 16px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const AdmProductManage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filter, setFilter] = useState("recent");
  const id_stock = location.state?.id_stock;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    if (id_stock) {
      const filtered = products.filter(product => product.id_stock === id_stock);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [id_stock, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    getAllStocks()
      .then((res) => setStocks(res.data))
      .catch((err) => console.error('Erro ao buscar estoques:', err));
  }, []);

  const fetchProducts = async () => {
    console.log("fetchProducts: iniciando busca dos produtos...");
    try {
      const res = await getProductsforUser();
      console.log("fetchProducts: produtos recebidos:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const handleOpenModal = (product = null) => {
    console.log("handleOpenModal: produto para editar:", product);
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("handleCloseModal: fechando modal");
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (formData) => {
    console.log("handleSubmit: recebendo formData:", formData);

    try {
      let createdProduct = null;

      if (editingProduct) {
        console.log("Atualizando produto existente...");
        await updateProduct(editingProduct.id_product, formData);
        createdProduct = { id_product: editingProduct.id_product };
      } else {
        console.log("Criando novo produto...");
        createdProduct = await createProduct(formData);
      }

      await fetchProducts();
      handleCloseModal();

      return createdProduct;
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      throw err;
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id_product);
      setProducts(products.filter((p) => p.id_product !== productToDelete.id_product));
      console.log("Produto excluído com sucesso");
      closeDeleteModal();
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    }
  };

  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (filter === "low") return a.price - b.price;
      if (filter === "high") return b.price - a.price;
      return new Date(b.creation_date) - new Date(a.creation_date);
    });

    setSortedProducts(sorted);
  }, [filteredProducts, filter]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-admmange-product']}>
        <Link to="/" className={styles['element-1-breadcrumb-admmange']}>Página Inicial</Link>
        <p className={styles['div-contentegt-1-admmange']}>&gt;</p>
        <Link to="/" className={styles['element-1-breadcrumb-admmange']}>Painel de Controle</Link>
        <p className={styles['div-contentegt-1-admmange']}>&gt;</p>
        <span className={styles['element-2-breadcrumb-admmange']}>Produtos</span>
      </div>
      <div className={styles['breadcrumb-separator-line-admmange']}></div>
      <NavBar />

      <div className={styles["header-section"]}>
        <h1 className={styles['h1-products-in-stock']}>Todos os Produtos Cadastrados</h1>
        <div className={styles["actions-container"]}>
          <button onClick={() => handleOpenModal()} className={styles["button-cadastrar"]}>
            Cadastrar Produto
          </button>
          <div className={styles["filter"]}>
            <label htmlFor="filter-select">Filtrar Por:</label>
            <select
              id="filter-select"
              value={filter}
              onChange={(e) => {
                console.log("handleFilterChange: novo filtro selecionado:", e.target.value);
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="low">Menor Preço</option>
              <option value="high">Maior Preço</option>
              <option value="recent">Mais Recentes</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles["content-container"]}>
        {currentItems.length === 0 ? (
          <p className={styles["defalt-text"]}>Nenhum Produto Encontrado!</p>
        ) : (
          <div className={styles['cardsWrapper']}>
            {currentItems.map((product) => (
              <ProductCard
                key={product.id_product}
                product={product}
                onEdit={handleOpenModal}
                onDelete={() => openDeleteModal(product)} 
                image_url={product.image}
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

      <ProductModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        productData={editingProduct}
        isEdit={!!editingProduct}
        stocks={stocks}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirmed}
        productName={productToDelete?.name || ''}
      />

      <Footer />
    </>
  );
};

export default AdmProductManage;
