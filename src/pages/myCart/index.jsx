import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./MyCart.module.css";
import CartItem from '../../components/CartItem/index.jsx';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import ListAddressModal from '../../components/ListAddressModal/index.jsx';

const MyCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "/placeholder.png",
      name: "Camisa Palmeiras X Kidsuper 25/26",
      store: "Palmeiras Oficial",
      price: 629.99,
      quantity: 1,
    },
    {
      id: 2,
      image: "/placeholder.png",
      name: "Camisa Palmeiras X Kidsuper 25/26",
      store: "Palmeiras Oficial",
      price: 629.99,
      quantity: 2,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const navigate = useNavigate();

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8001/api/addresses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddress(data[0]);
        }
      } else {
        alert('Faça login para continuar!');
      }
    } catch (error) {
      alert('Erro na conexão: ' + error.message);
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    checkIfLoggedIn();
    fetchAddresses();
  }, []);

  return (
    <div className={`${styles.pageWrapper} my-cart-wrapper`}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Meu Carrinho</h1>
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onRemove={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.addressBox} onClick={handleOpenModal}>
              <p className={styles.addressText}>
                {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.number}` : 'Selecione um endereço'}<br />
                {selectedAddress ? `${selectedAddress.neighborhood}, ${selectedAddress.city}, ${selectedAddress.uf}, ${selectedAddress.zip_code}` : ''}
              </p>
            </div>

            <div className={styles.summaryBox}>
              <div className={styles.subtotalRow}>
                <span>Subtotal:</span>
                <strong>R$ {subtotal.toFixed(2)}</strong>
              </div>
              <button className={styles.orderButton}>Fazer Pedido</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {isModalOpen && (
        <ListAddressModal
          addresses={addresses}
          onSelectAddress={handleSelectAddress}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MyCart;
