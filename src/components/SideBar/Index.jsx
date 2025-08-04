import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles['nav-container']}>
        <nav className={styles.nav}>
        <NavLink
            to="/control_panel/stores"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
            Lojas
        </NavLink>
        <NavLink
            to="/control_panel/stock"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
            Estoques
        </NavLink>
        <NavLink
            to="/control_panel/products"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
            Produtos
        </NavLink>
        <NavLink
            to="/control_panel/sales_report"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
            Relatório de Vendas
        </NavLink>
        </nav>
    </div>
  );
};

export default NavBar;
