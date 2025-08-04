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
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [store, setStore] = useState(null);
  const [stock, setStock] = useState(null);
  const imageSrc = product?.image ? `${baseURL}/images/${product.image}` : defaultImage;



  const navigate = useNavigate();

  const handleSeeStore = () => {
    if (stock && stock.id_store) {
      navigate(`/page_store/${stock.id_store}`);
    }
  };
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProducts(id);
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProduct();
  }, [id]);

useEffect(() => {
  const fetchStore = async () => {
    if (!product || !product.id_stock) return;

    try {
      const stock_response = await getStockById(product.id_stock);
      const stockData = stock_response.data;
      console.log(stockData)
      setStock(stockData);
      
      const store = await getStoreById(stockData.id_store);
      console.log(store)
      setStore(store.data); // ← supondo que você queria salvar a loja, não um "produto"
    } catch (error) {
      console.error("Erro ao carregar Loja:", error);
    }
  };

  fetchStore();
}, [product]);

  if (!product) {
    return <p className={styles['default-text']}>Carregando produto...</p>;
  }

const getRelatedProducts = () => {
  if (!products || !product) return [];

  const similar = products.filter(
    (p) =>
      p.id_product !== product.id_product &&
      p.name.toLowerCase().includes(product.name.toLowerCase())
  );

  const fallback = products
    .filter((p) => p.id_product !== product.id_product && !similar.includes(p))
    .slice(0, 3 - similar.length);

  return [...similar, ...fallback].slice(0, 3);
};

const relatedProducts = getRelatedProducts();


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
      <div className={styles['alert-div-account-not-logged']}>
        <p className={styles['p-adanl']}>Entre com sua conta, para comprar esse produto!</p>
      </div>
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
          <p className={styles['price-of-product-detail']}>{product.price}</p>
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
            <Link to={`/product_detail/${product.id_product}`}>
            <div key={product.id_product} className={styles['card']} onClick={() => setProduct(product)}>
              <a href="#" className={styles['card-link']}>
                <div className={styles['card-photo']}>
                  <img 
                  src={product?.image ? `${baseURL}/images/${product.image}` : defaultImage} 
                  alt={`Imagem do produto ${product.name}`} 
                  className={styles['card-photo']}/>
                </div>
                <div className={styles['card-name']}>{product.name}</div>
                <div className={styles['card-price']}>R$ {product.price}</div>
              </a>
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