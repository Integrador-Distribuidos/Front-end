const BASE_URL = "http://localhost:8000";

export const createOrder = async (orderData, token) => {
  const res = await fetch(`${BASE_URL}/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error("Erro ao criar pedido");
  return res.json();
};

export const createOrderItem = async (orderId, itemData, token) => {
  const res = await fetch(`${BASE_URL}/api/orders/${orderId}/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(itemData)
  });
  if (!res.ok) throw new Error("Erro ao criar item de pedido");
  return res.json();
};

export const getDraftOrder = async (userId, token) => {
  const res = await fetch(`${BASE_URL}/api/orders/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Erro ao buscar pedidos");

  const all = await res.json();
  return all.find(o => o.id_user === userId && o.status === "draft") || null;
};
