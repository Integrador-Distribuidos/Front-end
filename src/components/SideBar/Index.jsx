import React from 'react';
import { useState } from "react";
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

  return (
    <>
        <aside className={styles.sidebar}>
        <h2 className={styles.title}>Painel do Administrador</h2>
        <nav className={styles.nav}>
            <Link to="/control_panel/products" className={styles.link}>Produtos</Link>
            <Link to="/control_panel/stores" className={styles.link}>Lojas</Link>
            <Link to="/control_panel/stock" className={styles.link}>Estoques</Link>
        </nav>
        </aside>

        <div className={styles["topbar-mobile"]}> 
            <button onClick={toggleSidebar}>☰</button>
            <nav className={`${styles['top-nav']} ${isSidebarOpen ? styles.show : styles.hide}`}>
            <Link to="/control_panel/products" className={styles['element-nav-1']}>Produtos</Link>
            <Link to="/control_panel/stores" className={styles['element-nav-2']}>Lojas</Link>
            <Link to="/control_panel/stock" className={styles['element-nav-3']}>Estoques</Link>
            </nav>
        </div>
    </>
  );
};

export default Sidebar;
