import { Link } from 'react-router-dom';
import logoMobile from '../assets/logo.png';
import logo from '../assets/logo_long.png';
import { Search } from '.';

const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="Crypto Exchange Directory" className="logo" />
          <img src={logoMobile} alt="Crypto Exchange Directory" className="logo-mobile" />
        </Link>
        <Search />
      </div>
    </header>
  );
}

export default Header;
