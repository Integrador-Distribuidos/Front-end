import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import ProductCard from "../../components/HomePage/ProductCard";
import Header from '../../components/Header/Index';
import ProductFilter from '../../components/HomePage/ProductFilter';
import Pagination from '../../components/HomePage/Pagination';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import SearchNotFound from '../../components/SearchNotFound';
import { useLocation } from 'react-router-dom';
import { getAllProducts } from '../../services/apiProducts';

function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [searchText, setSearchText] = useState('');

  const PRODUCTS_PER_PAGE = 15;

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({ category: '', option: '' });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(response => {
      setProducts(response.data);
    });
  }, []);
useEffect(() => {
  setFilteredProducts(products);
}, [products]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const indexStart = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const indexEnd = indexStart + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexStart, indexEnd);

  const handleNext = () => { 
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFilterChange = ({ category, option }) => {
    setFilter({ category, option });

    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(prod => prod.category === category);
    }

    if (option === 'less_price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (option === 'more_price') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };


  const handleSearch = (text) => {
  setSearchText(text);

  let filtered = [...products];

  if (text.trim() !== '') {
    filtered = filtered.filter((prod) =>
      prod.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  if (filter.category) {
    filtered = filtered.filter((prod) => prod.category === filter.category);
  }

  if (filter.option === 'less_price') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filter.option === 'more_price') {
    filtered.sort((a, b) => b.price - a.price);
  }

  setFilteredProducts(filtered);
  setCurrentPage(1);
};

useEffect(() => {
  if (query) {
    handleSearch(query);
  }
}, [query]);

  const hasProducts = () => {
    return currentProducts && currentProducts.length > 0; 
  };


  return (
    <>
    <Header />
    <div className='breadcrumb-admmange-store'>
        <Link to="/" className='element-1-breadcrumb-admmangest'>Página Inicial</Link>
        <p className='div-contentegt-1-admmangest'>&gt;</p>
        <Link to="/" className='element-1-breadcrumb-admmangest'>Resultados da Busca</Link>
        <p className='div-contentegt-1-admmangest'>&gt;</p>
        <span className='element-2-breadcrumb-admmangest'>{query}</span>
      </div> 
      <div className='breadcrumb-separator-line-admmangest'></div>

    <div className='searchpage-content'>
          <div className="section">
            <div className="div_tittle_session1">
              <div className={filteredProducts.length === 0 ? 'hidden pagetittle_search_text' : 'pagetittle_search_text'}>
              </div>

            {filteredProducts.length > 0 && (
              <ProductFilter onFilter={handleFilterChange} />
            )}
            </div>
            {filteredProducts.length > 0 && (
            <div className="cards-container">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id_product}
                  name={product.name}
                  price={product.price}
                  image_url={product.image}
                  id={product.id_product}
                />
              ))}
            </div>
            )}
          </div>

      {
        filteredProducts.length === 0 ? (
          <SearchNotFound 
            redirect_url={'/'}/>
        ) : (
          <div className="section">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        )
      }

    </div>
      <Footer />
    </>
  );
}

export default SearchPage;