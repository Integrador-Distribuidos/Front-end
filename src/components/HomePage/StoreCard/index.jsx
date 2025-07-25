// src/components/HomePage/StoreCard.jsx
import React from 'react';
import './StoreCard.css';
import image from "../../../assets/icons/image1.png";
function StoreCard({ name }) {
  return (
  <div class="store-card">
    <img src={image} alt="PointCell" class="loja-logo" />
    <div class="loja-info">
      <h2 class="loja-nome">{name}</h2>
      <button class="btn-acessar">Acessar Loja</button>
    </div>
    
  </div>
  );
}

export default StoreCard;