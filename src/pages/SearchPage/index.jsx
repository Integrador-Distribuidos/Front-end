import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import ProductCard from "../../components/HomePage/ProductCard";
import mockProducts from '../HomePage/mockProducts';
import Header from '../../components/Header/Index';
import ProductFilter from '../../components/HomePage/ProductFilter';
import Pagination from '../../components/HomePage/Pagination';
import Footer from '../../components/Footer';
import axios from 'axios';

function SearchPage() {


  

  const [products] = useState(mockProducts); // dados ficticios de mocprod
  const [filteredProducts, setFilteredProducts] = useState(mockProducts); // dados ficticios de 



  const PRODUCTS_PER_PAGE = 15;

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

  // Buscar produtos
  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        //setProducts(response.data);descomentar
        //setFilteredProducts(response.data);descomentar
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  return (
    <>
    <Header />
    <div className='homepage-container'>

    <div className="section">
      <div className="div_tittle_session1">
        <div className="pagetittle_search_text">
            <h2 class="tittle_session">Resultados da Busca</h2>
            <h3 class="search_text"> -  Camisa do Palmeiras</h3>
        </div>
        <ProductFilter onFilter={handleFilterChange}/>
      </div>
      
      <div className="cards-container">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id_product}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>

      <div className="section">

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      </div>

      <Footer />
    </div>
    </>
  );
}

export default SearchPage;
