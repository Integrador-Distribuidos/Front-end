import React, { useState } from 'react';
import styles from "../AdmPM/AdmProductManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import ProductModal from '../../components/ProductModal/Index.jsx';
import ProductCard from '../../components/ProductCard/Index.jsx';

const AdmProductManage = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState("recent");

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      name: form.name.value,
      price: form.price.value,
      sku: form.sku.value,
      category: form.category.value,
      description: form.description.value,
      author: 'nome elemento',
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    if (editingProduct) {
      setProducts(products.map(p => p === editingProduct ? newProduct : p));
    } else {
      setProducts([...products, newProduct]);
    }

    handleCloseModal();
  };

  const handleDelete = (productToDelete) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if (confirmDelete) {
      setProducts(products.filter(p => p !== productToDelete));
    }
  };

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-admmange-product']}>
        <Link to="/" className={styles['element-1-breadcrumb-admmange']}>
          Página Inicial
        </Link>
        <p className={styles['div-contentegt-1-admmange']}>&gt;</p>
        <Link to="/" className={styles['element-1-breadcrumb-admmange']}>
          Painel de Controle
        </Link>
        <p className={styles['div-contentegt-1-admmange']}>&gt;</p>
        <span className={styles['element-2-breadcrumb-admmange']}>
          Produtos
        </span>
      </div>
      <div className={styles['breadcrumb-separator-line-admmange']}></div>
      <NavBar />
      <div className={styles["header-section"]}>
    <h1 className={styles['h1-products-in-stock']}>Produtos Cadastrados</h1>
    <div className={styles["actions-container"]}>
      <button onClick={() => handleOpenModal()} className={styles["button-cadastrar"]}>
        Cadastrar Produto
      </button>
      <div className={styles["filter"]}>
        <label htmlFor="filter-select">Filtrar Por:</label>
        <select
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}>
              <option value="low">Menor Preço</option>
              <option value="high">Maior Preço</option>
              <option value="recent">Mais Recentes</option>
            </select>
          </div>
        </div>
      </div>
        <div className={styles["content-container"]}>
          <div className={styles['cardsWrapper']}>
            {products.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        <ProductModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          productData={editingProduct}
          isEdit={!!editingProduct}
        />
        <Footer />
    </>
  );
};

export default AdmProductManage;
