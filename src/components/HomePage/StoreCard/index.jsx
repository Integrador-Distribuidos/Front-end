// src/components/HomePage/StoreCard.jsx
import React from 'react';
import './StoreCard.css';
import { Link } from 'react-router-dom';
import image from "../../../assets/icons/image1.png";
function StoreCard({ name, id }) {
  return (
  <div class="store-card">
    <img src={image} alt="PointCell" class="loja-logo" />
    <div class="loja-info">
      <h2 class="loja-nome">{name}</h2>
      <Link to={`/page_store/${id}`}>
      <button class="btn-acessar">Acessar Loja</button>
      </Link>
    </div>
    
  </div>
  );
}

export default StoreCard;