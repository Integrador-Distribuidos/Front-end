// src/components/HomePage/ProductCard.jsx
import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import image1 from "../../../assets/icons/download.jpeg";
//const imageUrl = dataFromApi.image_url;
function ProductCard({ name, price, id}) {
  return (
    <Link to={`/product_detail/${id}`}>
    <div className="product-card">
      <img class='product_img' src={image1} alt="Imagem do produto" />
      <h3 class="product_name">{name}</h3>
      <h3 class="product_price">R$ {price}</h3>
    </div>
    </Link>
  );
} 

export default ProductCard;