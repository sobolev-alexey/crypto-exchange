import { Link } from 'react-router-dom';
import logo from '../assets/logo_long.png';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <Link to="/">
          <img src={logo} alt="Crypto Exchange Directory" className="logo" />
        </Link>
        <div className="copyright">
          <a href="https://lexer.dev" target="_blank" rel="noopener noreferrer">
            © Alexey Sobolev (https://lexer.dev)
          </a>
          <span>
            Data provided by 
            <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">
              &nbsp;CoinGecko
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
