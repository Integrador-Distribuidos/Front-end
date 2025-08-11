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
import { createOrder, createOrderItem, getDraftOrder } from '../../services/apiOrders.js';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ProductDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(null);
  const [store, setStore] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [cartError, setCartError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  useEffect(() => {
    if (product?.id_stock) {
      getStockById(product.id_stock).then(res => {
        setStock(res.data);
        getStoreById(res.data.id_store).then(sr => setStore(sr.data));
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchRelated = async () => {
      const res = await getAllProducts();
      const all = res.data;

      const similar = all.filter(p =>
        p.id_product !== product?.id_product &&
        p.name.toLowerCase().includes(product?.name.toLowerCase())
      );

      const fallback = all
        .filter(p => p.id_product !== product?.id_product && !similar.includes(p))
        .slice(0, 3 - similar.length);

      setRelatedProducts([...similar, ...fallback].slice(0, 3));
    };

    if (product) fetchRelated();
  }, [product]);

  const handleSeeStore = () => {
    if (stock?.id_store) {
      navigate(`/page_store/${stock.id_store}`);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return navigate('/login');

    try {
      const userRes = await fetch(`${import.meta.env.VITE_API_USERS_BASE_URL}/api/users/me/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { id: userId } = await userRes.json();
      const today = new Date().toISOString().split('T')[0];

      let draft = await getDraftOrder(userId, token);
      if (!draft) {
        const newOrder = {
          id_user: userId,
          id_store: stock.id_store,
          status: 'draft',
          order_date: null,
          total_value: product.price * quantity,
          creation_date: today
        };
        draft = await createOrder(newOrder, token);
      }

      const itemsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${draft.id_order}/items/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const items = await itemsRes.json();
      const exist = items.find(it => it.id_product === product.id_product);

      if (exist) {
        const totalQty = exist.quantity + quantity;

        await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/items/${exist.id_order_item}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: totalQty,
            subtotal: product.price * totalQty,
            date_change: today
          })
        });
      } else {
        await createOrderItem(draft.id_order, {
          id_product: product.id_product,
          id_stock: product.id_stock,
          unit_price: product.price,
          quantity,
          subtotal: product.price * quantity,
          creation_date: today,
          date_change: today
        }, token);
      }

      setShowCartMessage(true);
      setCartError('');
      setTimeout(() => setShowCartMessage(false), 10000);
    } catch (err) {
      console.error(err);
      const message = err.message || 'Erro ao adicionar ao carrinho.';
      setCartError(message);
      setTimeout(() => setCartError(''), 8000);
    }
  };

  if (!product) {
    return <p className={styles['default-text']}>Carregando produto...</p>;
  }

  const formattedPrice = product.price
    ? Number(product.price).toFixed(2)
    : '0.00';

  const imageSrc = product?.image ? `${baseURL}/images/${product.image}` : defaultImage;

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-detailpage-product']}>
        <Link to="/" className={styles['element-1-breadcrumb']}>
          Página Inicial
        </Link>
        <p className={styles['div-contentegt-1']}>&gt;</p>
        <span className={styles['element-2-breadcrumb']}>{product.name}</span>
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
            <img src={imageSrc} alt="Imagem do produto" className={styles['image-div-content-detail']} />
          </div>
          <div className={styles['list-name-of-store']}>
            <img
              src={store?.image ? `${baseURL}/images/${store.image}` : defaultImage}
              alt={`Logo da loja ${store?.name}`}
              className={styles['imagem-of-store-of-cpd']}
            />
            <p className={styles['name-of-store-in-cpd']}>{store?.name}</p>
            <button onClick={handleSeeStore} className={styles['button-see-store-cpd']}>
              Visitar
            </button>
          </div>
        </div>
        <div className={styles['div-of-content-right']}>
          <p className={styles['name-of-product-detail']}>{product.name}</p>
          {product.quantity === 0 ? (
            <p className={styles['product-out-of-stock']}>
              Sinto muito :( <br />
              Esse produto está <strong>esgotado</strong> no momento.
            </p>
          ) : (
            <>
              <p className={styles['quantity-stock-items']}>
                {product.quantity <= 10 ? (
                  <>Restam apenas <strong>{product.quantity}</strong> itens em estoque</>
                ) : (
                  <><strong>{product.quantity}</strong> itens em estoque</>
                )}
              </p>
              <p className={styles['price-of-product-detail']}>R$ {formattedPrice}</p>
              <p className={styles['description-product']}>{product.description}</p>
              <div className={styles["cart-actions-container"]}>
                {cartError && (
                  <p className={styles["cart-error-message"]}>
                    Você excedeu o limite de produtos do estoque!
                  </p>
                )}
                {showCartMessage && (
                  <p className={styles["cart-message"]}>
                    Produto adicionado ao carrinho.{' '}
                    <Link to="/Mycart" className={styles["cart-link"]}>Clique aqui para ver seu carrinho.</Link>
                  </p>
                )}
                <Stepper
                  value={quantity}
                  setValue={setQuantity}
                  min={1}
                  max={stock?.quantity || 1}
                />
                <button
                  className={styles["button-add-to-cart"]}
                  onClick={handleAddToCart}
                  disabled={stock?.quantity === 0}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </>
          )}
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
