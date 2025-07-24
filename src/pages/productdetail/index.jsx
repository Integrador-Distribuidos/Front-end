import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../productdetail/DetailProduct.module.css'
import Header from '../../components/Header/Index.jsx'
import Stepper from '../../components/Stepper/index.jsx'
import Footer from '../../components/Footer/index.jsx'

const ProductDetailContent = () => {
  return (
    <>
      <Header />
      <div className={styles['breadcrumb-detailpage-product']}>
        <Link to="/" className={styles['element-1-breadcrumb']}>
          Página Inicial
        </Link>
        <p className={styles['div-contentegt-1']}>&gt;</p>
        <a href="#" className={styles['element-2-breadcrumb']}>Nome Produto</a>
        <p className={styles['lol']}>_</p>
      </div>
      <div className={styles['breadcrumb-separator-line']}></div>
      <div className={styles['alert-div-account-not-logged']}>
        <p className={styles['p-adanl']}>Entre com sua conta, para comprar esse produto!</p>
      </div>
      <div className={styles['content-page-detail']}>
        <div className={styles['left-side-container']}>
          <div className={styles['image-div-content-detail']}></div>
          <div className={styles['list-name-of-store']}>
            <div className={styles['imagem-of-store-of-cpd']}></div>
            <p className={styles['name-of-store-in-cpd']}>Nome da Loja</p>
            <a href="#" className={styles['button-see-store-cpd']}>Ver Loja</a>
          </div>
        </div>
        <div className={styles['div-of-content-right']}>
          <p className={styles['name-of-product-detail']}>Camisa Palmeiras X Kidsuper Puma Torcedor 25/26</p>
          <p className={styles['price-of-product-detail']}>R$ 629,99</p>
          <p className={styles['description-product']}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione cupiditate, corporis saepe placeat illum voluptas non vel itaque labore, ipsa, quisquam odio quos quibusdam veritatis eos nihil laborum molestias voluptate.
          </p>
          <a href="#" className={styles['button-buy-product-detail']}>Comprar esse produto</a>
          <div className={styles["cart-actions-container"]}>
            <Stepper />
            <a href="#" className={styles["button-add-to-cart"]}>Adicionar ao carrinho</a>
          </div>
        </div>
      </div>
      <div className={styles['related-products-section']}>
        <h2 className={styles['title']}>Produtos Relacionados</h2>
        <div className={styles['product-grid']}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles['card']}>
              <a href="#" className={styles['card-link']}>
                <div className={styles['card-photo']}>FOTO PRODUTO</div>
                <div className={styles['card-name']}>Nome produto</div>
                <div className={styles['card-price']}>R$ 14,20</div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailContent;