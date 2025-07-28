import React, { useState } from 'react';
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
  const [selectedAddress, setSelectedAddress] = useState({
    first_name: "Roger",
    last_name: "Junior Santos",
    street: "Avenida Paulista",
    number: "1578",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    uf: "SP",
    zip_code: "01310-000"
  });

  const addresses = [
    {
      first_name: "Roger",
      last_name: "Junior Santos",
      street: "Avenida Paulista",
      number: "1578",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      uf: "SP",
      zip_code: "01310-000"
    },
    {
      first_name: "Carlos",
      last_name: "Silva",
      street: "Rua Augusta",
      number: "2000",
      neighborhood: "Consolação",
      city: "São Paulo",
      uf: "SP",
      zip_code: "01305-000"
    },
    {
      first_name: "Fernanda",
      last_name: "Almeida",
      street: "Rua do Rio",
      number: "250",
      neighborhood: "Vila Progredior",
      city: "São Paulo",
      uf: "SP",
      zip_code: "03320-000"
    },
    {
      first_name: "Lucas",
      last_name: "Pereira",
      street: "Avenida Faria Lima",
      number: "800",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      uf: "SP",
      zip_code: "01451-000"
    }
  ];

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
              <p className={styles.username}>{selectedAddress.first_name} {selectedAddress.last_name}</p>
              <p className={styles.addressText}>
                {selectedAddress.street}, {selectedAddress.number}<br />
                {selectedAddress.neighborhood}, {selectedAddress.city}, {selectedAddress.uf}, {selectedAddress.zip_code}
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
