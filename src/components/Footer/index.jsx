import React from 'react';
import styles from '../Footer/Footer.module.css'
import imageLogoFooter from '../../assets/stock2sell-logo.png'

const Footer = () => {

    return (
        <>
            <footer className={styles['footer-container']}>
              <div className={styles['footer-content']}>
                <div className={styles['footer-logo-wrapper']}>
                  <img
                    src={imageLogoFooter}
                    alt="image-logo-footer"
                    className={styles['logo-footer-image-in-pd']}
                  />
                  <h3 className={styles['footer-title']}>Stock2Sell</h3>
                </div>
                <nav className={styles['footer-nav']}>
                  <a href="#">Produtos</a>
                  <a href="#">Lojas</a>
                  <a href="#">Minha Conta</a>
                </nav>
                <p className={styles['footer-copy']}>&copy; 2025 - Stock2Sell</p>
              </div>
            </footer>

        </>
    )
}

export default Footer