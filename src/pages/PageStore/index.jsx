import React, { useEffect, useState } from 'react';
import './PageStore.css';
import { getStoreById } from '../../services/apiStore';
import ProductCard from "../../components/HomePage/ProductCard";
import Header from '../../components/Header/Index';
import ProductFilter from '../../components/HomePage/ProductFilter';
import Pagination from '../../components/HomePage/Pagination';
import Footer from '../../components/Footer';
import SearchNotFound from '../../components/SearchNotFound';
import { useLocation, useParams } from 'react-router-dom';
import defaultImage from "../../assets/default/image_store_default.png";
import { getAllStocks } from '../../services/apiStocks';
const baseURL = import.meta.env.VITE_API_BASE_URL;

function PageStore() {
    
    const { id } = useParams();
    const [store, setStore] = useState([]);
  
    useEffect(() => {
      getStoreById(id).then(response => {
        setStore(response.data);
      });
    }, []);

  const imageSrc = store.image ? `${baseURL}/images/${store.image}` : defaultImage;



  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
const [allStoreProducts, setAllStoreProducts] = React.useState([]);

useEffect(() => {
  if (!id) return;
  console.log("Loja ID:", id);

  const fetchStoreStocksAndProducts = async () => {
    try {
      const response = await getAllStocks(); // ou uma API que filtre por loja
      const stocks = response.data;
      console.log("Todos estoques recebidos:", stocks);

      const estoquesDaLoja = stocks.filter(stock => stock.id_store == id);
      console.log("Estoques da loja:", estoquesDaLoja);

      const produtosArrays = estoquesDaLoja.map(stock => stock.products || []);
      const todosProdutos = produtosArrays.flat();
      console.log("Todos produtos:", todosProdutos);

      const produtosUnicos = Array.from(
        new Map(todosProdutos.map(prod => [prod.id_product, prod])).values()
      );
      console.log("Produtos únicos:", produtosUnicos);

      setAllStoreProducts(produtosUnicos);
      setProducts(produtosUnicos)
      setFilteredProducts(produtosUnicos);

    } catch (error) {
      console.error("Erro ao buscar produtos da loja:", error);
    }
  };

  fetchStoreStocksAndProducts();
}, [id]);


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
            <div className={'pagetittle_search_text'}>
              <h2 className="tittle_session">Página da Loja</h2>
              <h3 className="search_text"> - {store.name}</h3>
            </div>
          </div>

          <div className='store_name_img'>
            <img className='store_img' src={imageSrc} alt="Imagem da Loja" />
            <h3 className="store_name">{store.name}</h3>
          </div>

          <div className="line"></div>

          <div className='product_filter'>
            <h2 className='text_products'>Produtos Mais Vendidos</h2>
              <ProductFilter onFilter={handleFilterChange} />
          </div>

        <div className="cards-container">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id_product}
                name={product.name}
                price={product.price}
                id={product.id_product}
              />
            ))
          ) : (
            <p className="productnotfound">Nenhum Produto Encontrado!</p>
          )}
        </div>
          
        </div>
      <div className="section">
        {currentProducts.length === 0 ? (
          <p></p>
        ) : (
          
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          
        )}
        
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PageStore;
