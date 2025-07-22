import { Link } from 'react-router-dom';
import styles from '../productdetail/productDetail.module.css'
import Header from '../../components/Header/Index.jsx'
import Stepper from '../../components/Stepper/index.jsx'
import Footer from '../../components/Footer/index.jsx'

const ProductDetailContent = () => {

  return (
    <>
    
    <Header />
      <div className={styles['breadcrumb-detailpage-product']}>
        <Link to="/">
        <a href="#" className={styles['element-1-breadcrumb']}>Página Inicial</a>
        </Link>
      <p className={styles['div-contentegt-1']}>&gt;</p>
      <a href="#" className={styles['element-2-breadcrumb']}>Nome Produto</a>
      <p className={styles['lol']}>_</p>
    </div>
    <div className={styles['alert-div-account-not-logged']}>
      <p className={styles['p-adanl']}>Entre com sua conta, para comprar esse produto!</p>
    </div>
    <div className={styles['content-page-detail']}>
      <div className={styles['image-div-content-detail']}></div>
      <div className={styles['list-name-of-store']}>
        <div className={styles['imagem-of-store-of-cpd']}></div>
        <p className={styles['name-of-store-in-cpd']}>Nome da Loja</p>
        <a href="#" className={styles['button-see-store-cpd']}>Ver Loja</a>
      </div>
      <div className={styles['div-of-content-right']}>
        <p className={styles['name-of-product-detail']}>Camisa Palmeiras X Kidsuper Puma Torcedor 25/26</p>
        <p className={styles['price-of-product-detail']}>R$ 629,99</p>
        <p className={styles['description-product']}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione cupiditate, corporis saepe placeat illum voluptas non vel itaque labore, ipsa, quisquam odio quos quibusdam veritatis eos nihil laborum molestias voluptate.</p>
      </div>
        <a href="#" className={styles['button-buy-product-detail']}>Comprar esse produto</a>
        <Stepper />
        
        <a href="#" className={styles['button-add-to-cart']}>Adicionar ao carrinho</a>
    </div>
    <div className={styles['div-contents-in-pdp']}></div>
    <div className={styles['related-products-div']}>
      <h2 className={styles['h2-products-related']}>Produtos Relacionados</h2>
        <div className={styles["card-1-rpd"]}>
          <a href="#" className={styles['a-card-1-rpd']}>
            <div class={styles["photo-card-1-product-pd"]}></div>
            <div class={styles["name-product-card-1-pd"]}>Nome produto</div>
            <div class={styles["price-product-card-1-pd"]}>R$ 14,20</div>
          </a> 
        </div>
        <div className={styles["card-2-rpd"]}>
          <a href="#" className={styles['a-card-2-rpd']}>
            <div className={styles["photo-card-2-product-pd"]}></div>
            <div className={styles["name-product-card-2-pd"]}>Nome produto</div>
            <div className={styles["price-product-card-2-pd"]}>R$ 14,20</div>
          </a>
        </div>
        <div className={styles["card-3-rpd"]}>
          <a href="#" className={styles['a-card-3-rpd']}>
            <div className={styles["photo-card-3-product-pd"]}></div>
            <div className={styles["name-product-card-3-pd"]}>Nome produto</div>
            <div className={styles["price-product-card-3-pd"]}>R$ 14,20</div>
          </a>
        </div>
    </div>
      <Footer />
    </>
  );
};

export default ProductDetailContent;