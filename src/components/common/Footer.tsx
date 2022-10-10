import { Link } from 'react-router-dom';
import logoMobile from '../../assets/logo.png';
import logo from '../../assets/logo_long.png';

const Footer = () => {
  return (
    <footer className='footer-wrapper'>
      <div className='footer-content'>
        <Link to='/'>
          <img src={logo} alt='Crypto Exchange Directory' className='logo' />
          <img src={logoMobile} alt='Crypto Exchange Directory' className='logo-mobile' />
        </Link>
        <div className='copyright'>
          <a
            href='https://lexer.dev'
            target='_blank'
            rel='noopener noreferrer'
            className='personal'
          >
            © Alexey Sobolev 🇺🇦 (https://lexer.dev)
          </a>
          <span>
            Data provided by
            <a href='https://www.coingecko.com/' target='_blank' rel='noopener noreferrer'>
              &nbsp;CoinGecko
            </a>
            &nbsp;|&nbsp;Design by
            <a
              href='https://coinmarketcap.com/rankings/exchanges/'
              target='_blank'
              rel='noopener noreferrer'
            >
              &nbsp;CoinMarketCap
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
