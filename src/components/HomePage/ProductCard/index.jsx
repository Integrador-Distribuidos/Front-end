// src/components/HomePage/ProductCard.jsx
import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import defaultImage from "../../../assets/default/product_image_default.jpg";
const baseURL = import.meta.env.VITE_API_BASE_URL;
function ProductCard({ name, price, id, image_url}) {
  const imageSrc = image_url ? `${baseURL}/images/${image_url}` : defaultImage;
  return (
    <Link to={`/product_detail/${id}`}>
    <div className="product-card">
      <img className='product_img' src={imageSrc} alt="Imagem do produto" />
      <h3 className="product_name">{name}</h3>
      <h3 className="product_price">R$ {price}</h3>
    </div>
    </Link>
  );
} 
export default ProductCard;