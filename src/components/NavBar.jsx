import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Profile</Link></li>
        <li><Link to="/pokedex">Pokedex</Link></li>
        <li><Link to="/reviews">My Reviews</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;