import '../Header/Header.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/stock2sell-logo.png'
import iconsearch from '../../assets/icons/icon-search-header.png'
import cartIcon from '../../assets/icons/icon-cart-header.png'

const Header = () => {
  return (
    <header className="header-logged">
        <Link to="/">
          <img src={logo} alt="Logo do app" className="logo-header" />
        </Link>
        <div className="div-of-icon-header-logged">
          <img src={iconsearch} alt="Icon-search-header" className="icon-search-header" />
          <input type="text" placeholder="Busque por produtos, lojas..." className="input-search-header-logged" />
        </div>
        <div className="auth-section">
          <div className="create-account">
            <Link to="/myCart">
              <img src={cartIcon} alt="Carrinho" className="cart-icon" />
            </Link>
            <Link to="/signUp">
              <span className="create-account-link">Criar Conta</span>
            </Link>
          </div>
          <div className="divider" />
          <Link to="/login">
            <span className="login-text">Entrar</span>
          </Link>
        </div>   
    </header>
  );
};

export default Header;