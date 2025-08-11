import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./MyCart.module.css";
import CartItem from '../../components/CartItem/index.jsx';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import ListAddressModal from '../../components/ListAddressModal/index.jsx';
import Button from '../../components/Button/index.jsx';

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [draftOrderId, setDraftOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);

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
      const response = await fetch(`${import.meta.env.VITE_API_USERS_BASE_URL}/api/addresses/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
        if (data.length > 0) setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    }
  };

  const fetchCart = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const userRes = await fetch(`${import.meta.env.VITE_API_USERS_BASE_URL}/api/users/me/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const userData = await userRes.json();

      const ordersRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const orders = await ordersRes.json();

      const draftOrder = orders.find(order => order.id_user === userData.id && order.status === 'draft');
      if (!draftOrder) return;

      setDraftOrderId(draftOrder.id_order);

      const itemsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${draftOrder.id_order}/items/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const items = await itemsRes.json();

      const enrichedItems = await Promise.all(items.map(async item => {
        const productRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${item.id_product}/`);
        const product = await productRes.json();
        return {
          id: item.id_product,
          quantity: item.quantity,
          price: item.unit_price,
          name: product.name,
          image: product.image ? `${import.meta.env.VITE_API_BASE_URL}/images/${product.image}` : '/placeholder.png',
          store: 'Loja Exemplo',
          id_order_item: item.id_order_item,
          id_order: item.id_order,
        };
      }));

      setCartItems(enrichedItems);
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err);
    }
  };

  const handleRemoveItem = async (id_order_item) => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/items/${id_order_item}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        setCartItems(prev => prev.filter(item => item.id_order_item !== id_order_item));
      } else {
       console.error("Erro ao remover item");
      }
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  };

  const handleQuantityChange = async (id_order_item, newQuantity) => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/items/${id_order_item}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erro ao atualizar quantidade:", errorData);
        console.log("Erro ao atualizar quantidade");
        return;
      }

      setCartItems(prev =>
        prev.map(item =>
          item.id_order_item === id_order_item
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("Erro na requisição PATCH:", err);
     console.error("Erro ao atualizar item no carrinho");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSelectAddress = (address) => setSelectedAddress(address);
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('access_token');
    if (!token || !draftOrderId) return navigate('/login');

    try {
      const userRes = await fetch(`${import.meta.env.VITE_API_USERS_BASE_URL}/api/users/me/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const userData = await userRes.json();

      const today = new Date().toISOString().split("T")[0];
      const paymentType = paymentMethod === "pix" ? "PIX" : "CREDIT_CARD";

      const invoiceData = {
        payment_type: paymentType,
        status: "pending", 
        value: subtotal.toFixed(2),
        user_id: userData.id,
        id_order: draftOrderId,
        user_cpf: userData.cpf,
      };

      const invoiceRes = await fetch(`${import.meta.env.VITE_API_PAYMENTS_BASE_URL}/api/invoices/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(invoiceData),
      });

      if (!invoiceRes.ok) {
        console.error(await invoiceRes.json());
        return console.log("Erro ao criar fatura");
      }

      const createData = await invoiceRes.json();

      setInvoiceDetails({
        id: createData.id,
        value: Number(createData.value),
        payment_type: createData.payment_type,
      });

      const paymentData = {
        id: createData.id,
      };

      const paymentResponse = await fetch(`${import.meta.env.VITE_API_PAYMENTS_BASE_URL}/api/transactions/process_payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (paymentResponse.ok) {
        console.log("Pagamento processado com sucesso!");

        const qrCodeResponse = await fetch(`${import.meta.env.VITE_API_PAYMENTS_BASE_URL}/api/transactions/get_qr_code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        });

        if (qrCodeResponse.ok) {
          const qrCodeData = await qrCodeResponse.json();
          setQrCodeImage(qrCodeData.encodedImage);
        } else {
          console.error("Erro ao obter QR Code.");
        }

      } else {
        console.log("Erro ao processar pagamento.");
      }

      setIsPaymentModalOpen(true);

    } catch (err) {
      console.error("Erro no checkout:", err);
     console.error("Erro inesperado");
    }
  };

  const finalizePayment = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_PAYMENTS_BASE_URL}/api/invoices/${invoiceDetails.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'completed' }),
      });

      if (response.ok) {
        const finalizeRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${draftOrderId}/finalize/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!finalizeRes.ok) {
          console.error("Erro ao finalizar pedido");
          return;
        }
       
        const newOrder = await finalizeRes.json();
        setDraftOrderId(newOrder.id_order); 

         console.log("Pagamento finalizado com sucesso!");
        setIsPaymentModalOpen(false);
        navigate('/'); 
      } else {
        console.error("Erro ao finalizar pagamento");
      }
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err);
     console.error("Erro ao finalizar pagamento");
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
    fetchAddresses();
    fetchCart();
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
                key={item.id_order_item}
                {...item}
                onRemove={() => handleRemoveItem(item.id_order_item)}
                onQuantityChange={(newQty) => handleQuantityChange(item.id_order_item, newQty)}
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
            
            {invoiceDetails.payment_type === "PIX" && qrCodeImage && (
              <div className={styles.qrCodeContainer}>
                <p>Aqui está o QR Code para o pagamento:</p>
                <img
                  src={`data:image/png;base64,${qrCodeImage}`}
                  alt="QR Code"
                  className={styles.qrCodeImage}
                />
              </div>
            )}

            <Button onClick={finalizePayment} text="Finalizar Pagamento" className={styles.confirmButton} />
            <Button onClick={() => setIsPaymentModalOpen(false)} text="Cancelar Pagamento" className={styles.cancelButton} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
