import React, { useState, useEffect } from 'react';
import styles from "../AdmPM/AdmProductManage.module.css";
import Header from '../../components/Header/Index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index.jsx';
import NavBar from '../../components/SideBar/Index.jsx';
import ProductModal from '../../components/ProductModal/Index.jsx';
import ProductCard from '../../components/ProductCard/Index.jsx';
import Pagination from '../../components/HomePage/Pagination/index.jsx';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../services/apiProducts';

const AdmProductManage = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState("recent");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    console.log("fetchProducts: iniciando busca dos produtos...");
    try {
      const res = await getAllProducts();
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

  // handleSubmit foi ajustado para receber formData diretamente
  const handleSubmit = async (formData) => {
  console.log("handleSubmit: recebendo formData:", formData);
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  try {
    console.log("handleSubmit: criando novo produto");
    if (editingProduct) {
      await updateProduct(editingProduct.id_product, formData);
    } else {
      await createProduct(formData);
    }
    await fetchProducts();
    handleCloseModal();
  } catch (err) {
    console.error("Erro ao salvar produto:", err);
  }
};

  const handleDelete = async (productToDelete) => {
    console.log("handleDelete: produto a ser excluído id =", productToDelete.id_product);
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(productToDelete.id_product);
      setProducts(products.filter((p) => p.id_product !== productToDelete.id_product));
      console.log("handleDelete: produto excluído com sucesso");
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    }
  };

  const filteredProducts = [...products].sort((a, b) => {
    if (filter === "low") return a.price - b.price;
    if (filter === "high") return b.price - a.price;
    return new Date(b.creation_date) - new Date(a.creation_date);
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
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
        <div className={styles['cardsWrapper']}>
          {currentItems.map((product) => (
            <ProductCard
              key={product.id_product}
              product={product}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
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
      />
      <Footer />
    </>
  );
};

export default AdmProductManage;
