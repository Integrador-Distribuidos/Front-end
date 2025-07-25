import React from 'react';
import styles from '../Footer/Footer.module.css'
import imageLogoFooter from '../../assets/stock2sell-logo.png'

const Footer = () => {

    return (
        <>
            <footer className={styles['site-footer-in-pd']}>
                  <div className={styles['div-of-content-footer-in-pd']}>
                    <img src={ imageLogoFooter } alt="image-logo-footer" className={styles['logo-footer-image-in-pd']} />
                    <p className={styles['p-in-footer-s2s-in-pd']}>Stock2Sell</p>
                    <div className={styles['div-of-links-of-footer-in-pd']}>
                      <a href="#" className={styles['link-of-footer-1-in-pd']}>Produtos</a>
                      <a href="#" className={styles['link-of-footer-2-in-pd']}>Lojas</a>
                      <a href="#" className={styles['link-of-footer-3-in-pd']}>Minha Conta</a>
                    </div>
                    <p className={styles['p-copyrigth-footer-in-pd']}>© 2025 - Stock2Sell</p>
                  </div>
            </footer>
        </>
    )
}

export default Footer