import '../Header/Header.css'
import logo from '../../assets/stock2sell-logo.png'
import iconsearch from '../../assets/icons/icon-search-header.png'
import cartIcon from '../../assets/icons/icon-cart-header.png'

const Header = () => {
  return (
    <header className="header-logged">
        <img src={logo} alt="Logo do app" className="logo-header" />
        <div className="div-of-icon-header-logged">
          <img src={iconsearch} alt="Icon-search-header" className="icon-search-header" />
          <input type="text" placeholder="Busque por produtos, lojas..." className="input-search-header-logged" />
        </div>
        <div className="auth-section">
          <div className="create-account">
            <img src={cartIcon} alt="Carrinho" className="cart-icon" />
            <span className="create-account-link">Criar Conta</span>
          </div>
          <div className="divider" />
          <span className="login-text">Entrar</span>
        </div>   
    </header>
  );
};

export default Header;