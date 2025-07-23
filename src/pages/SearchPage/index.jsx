import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import ProductCard from "../../components/HomePage/ProductCard";
import mockProducts from '../HomePage/mockProducts';
import Header from '../../components/Header/Index';
import ProductFilter from '../../components/HomePage/ProductFilter';
import Pagination from '../../components/HomePage/Pagination';
import Footer from '../../components/Footer';
import SearchNotFound from '../../components/SearchNotFound';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SearchPage() {

  const [products] = useState(mockProducts); // dados ficticios de mocprod
  const [filteredProducts, setFilteredProducts] = useState(mockProducts); // dados ficticios de 




  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [searchText, setSearchText] = useState('');

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

 // Função chamada pelo filtro
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



  const handleSearch = (text) => {
  setSearchText(text);

  let filtered = [...products];

  // Filtragem por nome do produto
  if (text.trim() !== '') {
    filtered = filtered.filter((prod) =>
      prod.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  // Aplicar filtros existentes (categoria e preço)
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
            <h2 className="tittle_session">Resultados da Busca</h2>
            <h3 className="search_text"> - {query}</h3>
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



      <Footer />
    </div>
    </>
  );
}

export default SearchPage;

/*
Código de teste usado no input de busca para chamar a página


const [searchText, setSearchText] = useState('');
const navigate = useNavigate();

const handleSearch = (e) => {
  e.preventDefault(); // PREVINE O RELOAD
  if (searchText.trim() !== '') {
    navigate(`/search_page?query=${encodeURIComponent(searchText)}`);
  }
};


<form onSubmit={handleSearch}>
  <input
    type="text"
    placeholder="Buscar produtos..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
  <button type="submit">Buscar</button>
</form>
*/
