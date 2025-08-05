// src/pages/home_page/homepage.jsx
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/apiProducts.js';
import { getAllStores } from '../../services/apiStore.js';
import ProductCard from '../../components/HomePage/ProductCard/index.jsx';
import StoreCard from '../../components/HomePage/StoreCard/index.jsx';
import Pagination from '../../components/HomePage/Pagination/index.jsx';
import ProductFilter from '../../components/HomePage/ProductFilter/index.jsx';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import './HomePage.css';


function HomePage() {
  const PRODUCTS_PER_PAGE = 10;
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getAllProducts().then(response => {
      setProducts(response.data);
    });
  }, []);
  
  useEffect(() => {
    getAllStores().then(response => {
      setStores(response.data);
    });
  }, []);
  

  //const [products] = useState(mockProducts); // dados ficticios de mocprod
  const [filteredProducts, setFilteredProducts] = useState([]); // dados ficticios de 
  const [randomStores, setRandomStores] = useState([]) //dados ficticios
  //const [stores, setStores] = useState(mockStores);

useEffect(() => {
  setFilteredProducts(products);
}, [products]);


  useEffect(() => {//dados ficticios
    const shuffled = [...stores].sort(() => 0.5 - Math.random());
    setRandomStores(shuffled.slice(0, 3));
  }, [stores]);

  const [currentPage, setCurrentPage] = useState(1);
  //const [products, setProducts] = useState([]);
  //const [filteredProducts, setFilteredProducts] = useState([]);
  //const [randomStores, setRandomStores] = useState([]);
  const [filter, setFilter] = useState({ category: '', option: '' });


  // Cálculo de páginas totais
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);


  // Produtos da página atual
  const indexStart = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const indexEnd = indexStart + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexStart, indexEnd);

  // Navegação
  const handleNext = () => { 
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

 // 🔽 Função chamada pelo filtro
  const handleFilterChange = ({ category, option }) => {
    setFilter({ category, option });

    let filtered = [...products];

    // Aplicar filtro por categoria (se for implementado no futuro)
    if (category) {
      filtered = filtered.filter(prod => prod.category === category);
    }

    // Aplicar ordenação por preço
    if (option === 'less_price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (option === 'more_price') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="homepage-container">
      <div className='tittle_line'>
      <h2 className="page_tittle">Página Inicial</h2>
      <div className="line"></div>
      </div>

    <div className="section">
      <div className="div_tittle_session1">
        <h2 className="tittle_session_homepage">Ofertas do Dia</h2>
        <ProductFilter onFilter={handleFilterChange}/>
      </div>
      
      <div className="cards-container-home">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id_product}
            name={product.name}
            price={Number(product.price).toFixed(2)}
            id={product.id_product}
            image_url={product.image}
          />
        ))}
      </div>
    </div>

      <div className="section">
        <div className="div_tittle_session">
        <h2 className="tittle_session_homepage">Lojas Recomendadas</h2>
        </div>
        <div className="cards-container-store">
        {randomStores.map((store, index) => (
            <StoreCard 
              key={index} 
              name={store.name}
              id={store.id_store} 
              image_url={store.image}
              />
        ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
