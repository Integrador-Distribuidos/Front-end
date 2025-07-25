import React, { useState } from 'react';
import styles from "./MyCart.module.css";
import CartItem from '../../components/CartItem/index.jsx';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import NewAddressModal from '../../components/NewAddressModal/index.jsx';

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
      quantity: 1,
    },
    {
      id: 3,
      image: "/placeholder.png",
      name: "Camisa Palmeiras X Kidsuper 25/26",
      store: "Palmeiras Oficial",
      price: 629.99,
      quantity: 1,
    },
    {
      id: 4,
      image: "/placeholder.png",
      name: "Camisa Palmeiras X Kidsuper 25/26",
      store: "Palmeiras Oficial",
      price: 629.99,
      quantity: 1,
    },
    {
      id: 5,
      image: "/placeholder.png",
      name: "Camisa Palmeiras X Kidsuper 25/26",
      store: "Palmeiras Oficial",
      price: 629.99,
      quantity: 1,
    },
    {
      id: 6,
      image: "/placeholder.png",
      name: "Camisa Palmeiras X Kidsuper 25/26",
      store: "Palmeiras Oficial",
      price: 629.99,
      quantity: 1,
    },
  ]);

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

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
            <div className={styles.addressBox}>
                <p className={styles.username}>Roger Junior Santos</p>
                <p className={styles.addressText}>
                Avenida Paulista, 1578<br />
                São Paulo, SP, 01310-000
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
        <NewAddressModal />
        <Footer />
    </div>
  );
};

export default MyCart;
