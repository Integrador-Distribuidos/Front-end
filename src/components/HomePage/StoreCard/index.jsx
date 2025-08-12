import React from 'react';
import './StoreCard.css';
import { Link } from 'react-router-dom';
import defaultImage from "../../../assets/default/image_store_default.png";
const baseURL = import.meta.env.VITE_API_BASE_URL;
function StoreCard({ name, id, image_url }) {
  const imageSrc = image_url ? `${baseURL}/images/${image_url}` : defaultImage;
  return (
  <div class="store-card">
    <img src={imageSrc} alt="PointCell" class="loja-logo" />
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