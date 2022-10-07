import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/header/logo.svg';
import { Search } from '.';

const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-middle-wrapper">
        <div className="header-content">
          {/* <Link to="/"><img src={logo} alt="Crypto Exchange Directory" className="logo"/></Link> */}
          <Search />
        </div>
      </div>
    </header>
  );
}

export default Header;
