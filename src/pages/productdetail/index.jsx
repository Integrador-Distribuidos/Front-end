import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from '../productdetail/DetailProduct.module.css';
import Header from '../../components/Header/Index.jsx';
import Stepper from '../../components/Stepper/index.jsx';
import Footer from '../../components/Footer/index.jsx';
import { getAllProducts, getProductById } from '../../services/apiProducts.js';
import defaultImage from '../../assets/default/product_image_default.jpg';
import { getStockById } from '../../services/apiStocks.js';
import { getStoreById } from '../../services/apiStore.js';
import ProductCard from '../../components/HomePage/ProductCard/index.jsx';
import { createOrder, createOrderItem, getDraftOrder } from '../../services/apiOrders.js';

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
  const [quantity, setQuantity] = useState(1);

  const imageSrc = product?.image ? `${baseURL}/images/${product.image}` : defaultImage;

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

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
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

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

    const similar = products.filter(
      (p) =>
        p.id_product !== product.id_product &&
        p.name.toLowerCase().includes(product.name.toLowerCase())
    );

    const fallback = products
      .filter(
        (p) =>
          p.id_product !== product.id_product &&
          !similar.includes(p)
      )
      .slice(0, 3 - similar.length);

    const combined = [...similar, ...fallback].slice(0, 3);

    setRelatedProducts(combined);
  }, [product, products]);

  const handleSeeStore = () => {
    if (stock?.id_store) {
      navigate(`/page_store/${stock.id_store}`);
    }
  };

const handleAddToCart = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return navigate('/login');

    try {
      const userRes = await fetch('http://localhost:8001/api/users/me/', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const userData = await userRes.json();
      const userId = userData.id;

      const today = new Date().toISOString().split("T")[0];

      let draftOrder = await getDraftOrder(userId, token);
      if (!draftOrder) {
        const newOrder = {
          id_user: userId,
          id_store: stock.id_store,
          status: "draft",
          order_date: today,
          total_value: product.price * quantity,
          creation_date: today,
        };
        draftOrder = await createOrder(newOrder, token);
      }

      const itemsRes = await fetch(`http://localhost:8000/api/orders/${draftOrder.id_order}/items/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const items = await itemsRes.json();

      const existingItem = items.find(item => item.id_product === product.id_product);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const patchRes = await fetch(`http://localhost:8000/api/orders/items/${existingItem.id_order_item}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity: newQuantity,
            subtotal: product.price * newQuantity,
            date_change: today
          }),
        });

        if (!patchRes.ok) throw new Error("Erro ao atualizar item existente");
      } else {
        const itemData = {
          id_product: product.id_product,
          id_stock: product.id_stock,
          unit_price: product.price,
          quantity,
          subtotal: product.price * quantity,
          creation_date: today,
          date_change: today
        };

        await createOrderItem(draftOrder.id_order, itemData, token);
      }

      alert("Produto adicionado ao carrinho!");
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      alert("Erro ao adicionar ao carrinho");
    }
  };

  if (!product) {
    return <p className={styles['default-text']}>Carregando produto...</p>;
  }

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
            <img src={imageSrc} alt="" className={styles['image-div-content-detail']} />
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
          <p className={styles['price-of-product-detail']}>R$ {formattedPrice}</p>
          <p className={styles['description-product']}>{product.description}</p>

          <div className={styles["cart-actions-container"]}>
            <Stepper value={quantity} setValue={setQuantity} />
            <button className={styles["button-add-to-cart"]} onClick={handleAddToCart}>
              Adicionar ao carrinho
            </button>
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
