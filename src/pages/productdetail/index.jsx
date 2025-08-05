import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from '../productdetail/DetailProduct.module.css'
import Header from '../../components/Header/Index.jsx'
import Stepper from '../../components/Stepper/index.jsx'
import Footer from '../../components/Footer/index.jsx'
import { getAllProducts, getProductById } from '../../services/apiProducts.js';
import defaultImage from '../../assets/default/product_image_default.jpg';
import { getStockById } from '../../services/apiStocks.js';
import { getStoreById } from '../../services/apiStore.js';
import ProductCard from '../../components/HomePage/ProductCard/index.jsx';
const baseURL = import.meta.env.VITE_API_BASE_URL;
  
const ProductDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [stock, setStock] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const imageSrc = product?.image ? `${baseURL}/images/${product.image}` : defaultImage;

  // Autenticação
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  // Buscar produto principal
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // Buscar todos os produtos (para produtos relacionados)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(); // Não precisa de `id`
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Buscar estoque e loja do produto
  useEffect(() => {
    const fetchStore = async () => {
      if (!product?.id_stock) return;

      try {
        const stockRes = await getStockById(product.id_stock);
        setStock(stockRes.data);

        const storeRes = await getStoreById(stockRes.data.id_store);
        setStore(storeRes.data);
      } catch (error) {
        console.error("Erro ao carregar Loja:", error);
      }
    };

    fetchStore();
  }, [product]);
useEffect(() => {
  if (!products.length || !product) return;

  // Filtra produtos com nome semelhante (exceto o próprio)
  const similar = products.filter(
    (p) =>
      p.id_product !== product.id_product &&
      p.name.toLowerCase().includes(product.name.toLowerCase())
  );

  // Fallback para preencher até 3 se necessário
  const fallback = products
    .filter(
      (p) =>
        p.id_product !== product.id_product &&
        !similar.includes(p)
    )
    .slice(0, 3 - similar.length);

  // Combina os resultados
  const combined = [...similar, ...fallback].slice(0, 3);

  // Define diretamente
  setRelatedProducts(combined);
}, [product, products]);
  const handleSeeStore = () => {
    if (stock?.id_store) {
      navigate(`/page_store/${stock.id_store}`);
    }
  };

  // Exibição de carregamento
  if (!product) {
    return <p className={styles['default-text']}>Carregando produto...</p>;
  }

  // Formatar preço com 2 casas decimais
  const formattedPrice = product.price
    ? Number(product.price).toFixed(2)
    : '0.00';


  return (
    <>
      <Header />
      <div className={styles['breadcrumb-detailpage-product']}>
        <Link to="/" className={styles['element-1-breadcrumb']}>
          Página Inicial
        </Link>
        <p className={styles['div-contentegt-1']}>&gt;</p>
        <a href="#" className={styles['element-2-breadcrumb']}>{product.name}</a>
        <p className={styles['lol']}>_</p>
      </div>
      <div className={styles['breadcrumb-separator-line']}></div>
        {!isAuthenticated && (
          <div className={styles['alert-div-account-not-logged']}>
            <p className={styles['p-adanl']}>Entre com sua conta, para comprar esse produto!</p>
          </div>
        )}
      <div className={styles['content-page-detail']}>
        <div className={styles['left-side-container']}>
          <div className={styles['image-div-content-detail']}>
            <img src={imageSrc} alt="" className={styles['image-div-content-detail']}/>
          </div>
          <div className={styles['list-name-of-store']}>
            <div className={styles['imagem-of-store-of-cpd']}></div>
            <p className={styles['name-of-store-in-cpd']}>{store?.name}</p>
            <button onClick={handleSeeStore} className={styles['button-see-store-cpd']}>
              Ver Loja
            </button>
          </div>
        </div>
        <div className={styles['div-of-content-right']}>
          <p className={styles['name-of-product-detail']}>{product.name}</p>
          <p className={styles['price-of-product-detail']}>R$ {Number(product.price).toFixed(2)}</p>
          <p className={styles['description-product']}>
            {product.description}
          </p>
          <a href="#" className={styles['button-buy-product-detail']}>Comprar esse produto</a>
          <div className={styles["cart-actions-container"]}>
            <Stepper />
            <a href="#" className={styles["button-add-to-cart"]}>Adicionar ao carrinho</a>
          </div>
        </div>
      </div>
      <div className={styles['related-products-section']}>
        <h2 className={styles['title']}>Produtos Relacionados</h2>
        <div className={styles['product-grid']}>
          {relatedProducts.map((product) => (
          <Link key={product.id_product} to={`/product_detail/${product.id_product}`} className={styles['card']}>
            <div className={styles['card-link']}>
              <div className={styles['card-photo']}>
                <img 
                  src={product?.image ? `${baseURL}/images/${product.image}` : defaultImage} 
                  alt={`Imagem do produto ${product.name}`} 
                  className={styles['card-photo']}
                />
              </div>
              <div className={styles['card-name']}>{product.name}</div>
              <div className={styles['card-price']}>R$ {Number(product.price).toFixed(2)}</div>
            </div>
          </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailContent;