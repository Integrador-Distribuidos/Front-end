import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./MyCart.module.css";
import CartItem from '../../components/CartItem/index.jsx';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import ListAddressModal from '../../components/ListAddressModal/index.jsx';
import Button from '../../components/Button/index.jsx';

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
  const [paymentMethod, setPaymentMethod] = useState("");

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

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
      }
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return navigate('/login');
    }

    try {
      const userRes = await fetch('http://localhost:8001/api/users/me/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const userData = await userRes.json();
      const userId = userData.id;

      const paymentType = paymentMethod === "pix" ? "PIX" : "CREDIT_CARD";
      const value = subtotal.toFixed(2);
      const id_order = Math.floor(Math.random() * 100000);

      const invoiceData = {
        payment_type: paymentType,
        status: "pending",
        value: value,
        user_id: userId,
        id_order: id_order,
      };

      const createResponse = await fetch('http://localhost:8002/api/invoices/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(invoiceData),
      });

      const createData = await createResponse.json();

      if (!createResponse.ok) {
        console.error(createData);
        return alert("Erro ao criar fatura");
      }

      setInvoiceDetails({
        id: createData.id,
        value: Number(createData.value),
        payment_type: createData.payment_type,
      });

      setIsPaymentModalOpen(true);

    } catch (err) {
      console.error("Erro no checkout:", err);
      alert("Erro inesperado");
    }
  };

  const finalizePayment = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`http://localhost:8002/api/invoices/${invoiceDetails.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'completed' }),
      });

      if (response.ok) {
        alert("Pagamento finalizado com sucesso!");
        setIsPaymentModalOpen(false);
        navigate('/');
      } else {
        alert("Erro ao finalizar pagamento");
      }
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err);
      alert("Erro ao finalizar pagamento");
    }
  };

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

              <div className={styles.paymentMethod}>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="">Método de pagamento</option>
                  <option value="pix">PIX</option>
                  <option value="cartao">Cartão de Crédito</option>
                </select>
              </div>

              <button className={styles.orderButton} onClick={handleCheckout}>
                Fazer Pedido
              </button>
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

      {isPaymentModalOpen && invoiceDetails && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Pagamento da Fatura</h2>
            <p className={styles.invoiceText}>Valor: R$ {Number(invoiceDetails.value).toFixed(2)}</p>
            <p className={styles.invoiceText}>Método: {invoiceDetails.payment_type === "PIX" ? "PIX" : "Cartão de Crédito"}</p>
            <Button onClick={finalizePayment} text="Finalizar Pagamento" className={styles.confirmButton}/>
            <Button onClick={() => setIsPaymentModalOpen(false)} text="Cancelar Pagamento" className={styles.cancelButton}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
