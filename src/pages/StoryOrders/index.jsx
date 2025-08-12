import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../StoryOrders/StoryOrders.module.css';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import Pagination from '../../components/HomePage/Pagination/index.jsx';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 9;

const StoryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [filterOption, setFilterOption] = useState(''); // Estado para o filtro
  const navigate = useNavigate();

  const indexOfLastOrder = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ITEMS_PER_PAGE;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const translateStatus = (status) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const fetchProductDetails = async (id_product) => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${baseURL}/api/products/${id_product}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Erro ao buscar produto ${id_product}:`, response.status);
        return null;
      }

      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Erro na fetchProductDetails:", error);
      return null;
    }
  };

  const openModal = async (order) => {
    setSelectedOrder(order);
    setLoadingItems(true);
    setOrderItems([]);

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${baseURL}/api/orders/${order.id_order || order.id}/items`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Erro ao buscar itens do pedido:", response.status, errorBody);
        setOrderItems([]);
        return;
      }

      const items = await response.json();

      const itemsWithDetails = await Promise.all(
        items.map(async (item) => {
          const product = await fetchProductDetails(item.id_product);
          return {
            ...item,
            product_name: product?.name || 'Produto desconhecido',
            image_url: product?.image ? `${baseURL}/images/${product.image}` : null,
          };
        })
      );

      setOrderItems(itemsWithDetails);
    } catch (err) {
      console.error("Erro ao buscar itens do pedido:", err);
      setOrderItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setOrderItems([]);
  };

  const handleReorderClick = (productId) => {
    if (!productId) {
      console.log("Produto inválido.");
      return;
    }
    navigate(`/product_detail/${productId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          setHasAccess(false);
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseURL}/api/orders/my`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const body = await response.text();
          console.error("Erro no fetch:", response.status, body);
          throw new Error("Erro ao buscar pedidos");
        }

        const data = await response.json();
        const paidOrders = data.filter(order => order.status === 'paid');
        setOrders(paidOrders);
        setHasAccess(true);
      } catch (error) {
        console.error("Erro geral:", error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (order) => {
    try {
      const dateStr = order.creation_date || order.order_date || order.date || order.created_at || order.createdAt;
      if (!dateStr) return 'Data indisponível';
      const date = new Date(dateStr);
      if (isNaN(date)) return 'Data inválida';
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return 'Erro ao exibir data';
    }
  };

  useEffect(() => {
    const applyFilter = () => {
      let filteredOrders = [...orders];

      if (filterOption === 'less_price') {
        filteredOrders.sort((a, b) => (a.total_value || 0) - (b.total_value || 0));
      } else if (filterOption === 'more_price') {
        filteredOrders.sort((a, b) => (b.total_value || 0) - (a.total_value || 0));
      } else if (filterOption === 'recent') {
        filteredOrders.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
      } else if (filterOption === 'oldest') {
        filteredOrders.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
      }

      setOrders(filteredOrders);
    };

    if (orders.length > 0) { 
      applyFilter();
    }
  }, [filterOption]); 

  return (
    <>
      <Header />
      <div className={styles['breadcrumb-storyorders']}>
        <Link to="/" className={styles['element-1-breadcrumb-storyorders']}>Página Inicial</Link>
        <p className={styles['div-contentegt-1-storyorders']}>&gt;</p>
        <span className={styles['element-2-breadcrumb-storyorders']}>Histórico de Pedidos</span>
      </div>
      <div className={styles['breadcrumb-separator-line-storyorders']}></div>

      <div className={styles['orders-container']}>
        <div className={styles["orders-title-container"]}>
          <h2 className={styles['orders-title']}>Meus Pedidos</h2>

          {/* Filtro */}
          <div className={styles["filter-container"]}>
            <label className={styles["filter-label"]}>Filtrar por:</label>
            <select
              className={styles["filter-select"]}
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="less_price">Menor Preço</option>
              <option value="more_price">Maior Preço</option>
              <option value="recent">Mais Recente</option>
              <option value="oldest">Mais Antigo</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className={styles['loading-text']}>Carregando...</p>
        ) : !hasAccess ? (
          <p className={styles['no-orders-text']}>Você precisa estar logado para ver seus pedidos.</p>
        ) : orders.length === 0 ? (
          <p className={styles['no-orders-text']}>Você ainda não fez nenhum pedido.</p>
        ) : (
          <>
            <ul className={styles['orders-list']}>
              {currentOrders.map((order, index) => (
                <li key={order.id_order || order.id || index} className={styles['order-item']}>
                  <p className={styles['order-field']}><strong>Pedido:</strong> #{order.id_order || order.id || 'Sem ID'}</p>
                  <p className={styles['order-field']}><strong>Data:</strong> {formatDate(order)}</p>
                  <p className={styles['order-field']}><strong>Status:</strong> {translateStatus(order.status)}</p>
                  <p className={styles['order-field']}><strong>Total:</strong> R$ {Number(order.total_value || 0).toFixed(2)}</p>
                  <button onClick={() => openModal(order)} className={styles['details-button']}>Ver Detalhes</button>
                </li>
              ))}
            </ul>
            <div className={styles["pagination-container"]}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>
          </>
        )}
      </div>

      {selectedOrder && (
        <div className={styles['modal-overlay']} onClick={closeModal}>
          <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
            <button className={styles['close-button']} onClick={closeModal}>×</button>
            <h3 className={styles['h3-modal-0-products']}>
              Produtos do Pedido #{selectedOrder.id_order || selectedOrder.id}
            </h3>
            {loadingItems ? (
              <p>Carregando produtos...</p>
            ) : orderItems.length > 0 ? (
              <>
                <ul className={styles['modal-products-list']}>
                  {orderItems.map((item, index) => (
                    <li key={item.id_order_item || item.id || index} className={styles['modal-product-item']}>
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className={styles['modal-product-image']}
                        />
                      )}
                      <div className={styles['modal-product-details']}>
                        <strong>{item.product_name}</strong><br />
                        Quantidade: {item.quantity}<br />
                        Preço unitário: R$ {Number(item.unit_price).toFixed(2)}<br />
                        <button
                          className={styles['reorder-button']}
                          onClick={() => handleReorderClick(item.id_product)}
                        >
                          Comprar novamente
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className={styles['modal-total']}>
                  Total do Pedido: R$ {Number(selectedOrder.total_value || 0).toFixed(2)}
                </div>
              </>
            ) : (
              <p className={styles['p-modal-0-products']}>Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default StoryOrders;
