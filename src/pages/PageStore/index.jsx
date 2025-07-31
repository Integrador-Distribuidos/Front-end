import React, { useEffect, useState } from 'react';
import './SearchPageStore.css';
import ProductCard from "../../components/HomePage/ProductCard";
import mockProducts from '../HomePage/mockProducts';
import mockStores from '../HomePage/mockStores';
import Header from '../../components/Header/Index';
import ProductFilter from '../../components/HomePage/ProductFilter';
import Pagination from '../../components/HomePage/Pagination';
import Footer from '../../components/Footer';
import SearchNotFound from '../../components/SearchNotFound';
import { useLocation, useParams } from 'react-router-dom';


function PageStore() {

  const { id } = useParams();
  //const [product, setProduct] = useState(null);
  const store = mockStores.find(p => p.id_store === parseInt(id));



  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [searchText, setSearchText] = useState('');

  const PRODUCTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({ category: '', option: '' });

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

      <div className='searchpage-container'>
        <div className="section">

          <div className="div_tittle_session1">
            <div className={filteredProducts.length === 0 ? 'hidden pagetittle_search_text' : 'pagetittle_search_text'}>
              <h2 className="tittle_session">Página da Loja</h2>
              <h3 className="search_text"> - {store.name}</h3>
            </div>
          </div>

          <div className='store_name_img'>
            <img className='store_img' src="http://localhost:8000/images/product_20.jpeg" alt="Imagem da Loja" />
            <h3 className="store_name">{store.name}</h3>
          </div>

          <div className="line"></div>

          <div className='product_filter'>
            <h2 className='text_products'>Produtos Mais Vendidos</h2>
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
                />
              ))}
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <SearchNotFound redirect_url={'/'} />
        ) : (
          <div className="section">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default PageStore;
