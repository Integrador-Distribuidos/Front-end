import React, { useState } from 'react';
import styles from "../AdmPM/AdmProductManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';

import Sidebar from '../../components/SideBar/Index.jsx';
import ProductModal from '../../components/ProductModal/Index.jsx';
import ProductCard from '../../components/ProductCard/Index.jsx';

const AdmProductManage = () => {

    const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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
            <div className={styles['damn-margin-left']}></div>
            <Link to="/" className={styles['element-1-breadcrumb-admmange']}>
                Página Inicial
            </Link>
            <p className={styles['div-contentegt-1-admmange']}>&gt;</p>
            {/* Depois mudo esse link */}
            <Link to="/" className={styles['element-1-breadcrumb-admmange']}> 
                Painel de Controle
            </Link>
            <p className={styles['div-contentegt-1-admmange']}>&gt;</p>
            <span className={styles['element-2-breadcrumb-admmange']}>
                Produtos
            </span>
        </div>
        <div className={styles['breadcrumb-separator-line-admmange']}></div>
        <Sidebar />
        <div className={styles["header-section"]} >
            <h1 className={styles['h1-products-in-stock']}>Produtos Cadastrados</h1>
            <button onClick={() => handleOpenModal()} className={styles["button-cadastrar"]}>Cadastrar Produto</button> 
            <div className={styles["filter"]}>
                <label htmlFor="filter-select">Filtrar Por:</label>
                <select id="filter-select">
                <option>Menor Preço</option>
                <option>Maior Preço</option>
                <option>Mais Recentes</option>
                </select>
            </div>
        </div>
        <div style={{ padding: "1rem 1rem 1rem 240px", maxWidth: "1200px", margin: "0 auto" }}>
            <div className={styles['cardsWrapper']}>
            {products.map((product, idx) => (
                <ProductCard key={idx} product={product} onEdit={handleOpenModal} onDelete={handleDelete} />
            ))}
            </div>
      </div>
      <ProductModal isOpen={modalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} productData={editingProduct} isEdit={!!editingProduct} />

      <Footer />
    </>
  );
};

export default AdmProductManage;
