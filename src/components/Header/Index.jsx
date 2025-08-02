import React, { useState } from 'react';
import '../Header/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/stock2sell-logo.png';
import iconsearch from '../../assets/icons/icon-search-header.png';
import cartIcon from '../../assets/icons/icon-cart-header.png';
import profileMobile from '../../assets/icons/account_circle.png';



const Header = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // PREVINE O RELOAD
    if (searchText.trim() !== '') {
      navigate(`/search_page?query=${encodeURIComponent(searchText)}`);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('access_token');

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert('Você saiu da sua conta.');
    navigate('/login');
  };

  return (
    <>
      <header className="header-logged">
        <Link to="/">
          <img src={logo} alt="Logo do app" className="logo-header" />
        </Link>

        <div className="div-of-icon-header-logged">
          <img src={iconsearch} alt="Icon-search-header" className="icon-search-header" />
          <form onSubmit={handleSearch}>
          <input type="text" placeholder="Buscar produtos..." value={searchText} onChange={(e) => setSearchText(e.target.value)}
            className="input-search-header-logged" /></form>
        </div>

        <div className="auth-section">
          <div className="create-account">
            <Link to="/myCart">
              <img src={cartIcon} alt="Carrinho" className="cart-icon" />
            </Link>
            {isLoggedIn ? (
              <Link to="/profile">
                <span className="create-account-link">Minha Conta</span>
              </Link>
            ) : (
              <Link to="/signUp">
                <span className="create-account-link">Criar Conta</span>
              </Link>
            )}
          </div>

          <div className="divider" />

          {isLoggedIn ? (
            <span className="login-text-logout-text" onClick={handleLogout}>
              Sair
            </span>
          ) : (
            <Link to="/login">
              <span className="login-text">Entrar</span>
            </Link>
          )}
        </div>

        <div className="user-icon-mobile" onClick={toggleModal}>
          <img src={profileMobile} alt="profile_mobile" className="user-icon-img" />
        </div>
      </header>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Bem-vindo!</h2>
            <p>O que você deseja fazer?</p>
            <div className="modal-options">
              {isLoggedIn ? (
                <>
                  <Link to="/profile">Minha Conta</Link>
                  <button onClick={handleLogout} className="logout-button">Sair</button>
                </>
              ) : (
                <>
                  <Link to="/login">Entrar</Link>
                  <Link to="/signUp">Criar Conta</Link>
                </>
              )}
            </div>
            <button onClick={toggleModal}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
