import React, { useState, useEffect, useRef } from 'react';
import '../Header/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/stock2sell-logo.png';
import iconsearch from '../../assets/icons/icon-search-header.png';
import cartIcon from '../../assets/icons/icon-cart-header.png';
import accountIcon from '../../assets/icons/account_icon.png';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('access_token');
  const userType = localStorage.getItem('user_type');
  const isAdmin = isLoggedIn && userType === 'admin';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      navigate(`/search_page?query=${encodeURIComponent(searchText)}`);
    }
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_type');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  return (
    <>
      <header className="header-logged">
        <Link to="/">
          <img src={logo} alt="Logo do app" className="logo-header" />
        </Link>

        <div className="div-of-icon-header-logged">
          <img src={iconsearch} alt="Icon-search-header" className="icon-search-header" />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input-search-header-logged"
            />
          </form>
        </div>

        <div className="auth-section">
          <div className="account-actions">
            <Link to="/myCart">
              <img src={cartIcon} alt="Carrinho" className="cart-icon" />
            </Link>

            <div className="account-icon-wrapper" onClick={toggleModal}>
              <img src={accountIcon} alt="Conta" className="account-icon" />
              {isModalOpen && (
                <div className="dropdown-modal" ref={modalRef}>
                  <p className="dropdown-title">Bem-vindo!</p>
                  <hr />
                  <div className="dropdown-options">
                    {isLoggedIn ? (
                      <>
                        {isAdmin && (
                          <Link to="/control_panel/stores"><span className='span-control'>Painel de Controle</span></Link>
                        )}
                        <Link to="/profile"><span className='span-my-account'>Minha Conta</span></Link>
                        <Link to="/historico_pedidos"><span className='span-my-history'>Histórico de Pedidos</span></Link>
                        <button onClick={handleLogout}>Sair</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login"><span className='span-enter'>Entrar</span></Link>
                        <Link to="/signUp"><span className='span-register'>Criar Conta</span></Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
