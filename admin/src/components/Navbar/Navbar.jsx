import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 style={{ margin: 0, fontSize: '40px', color: 'red', fontFamily: 'Open Sans', /* Replace with your chosen font family */ }}>FOODIE</h1>  
      <img className='profile' src={assets.profile_image} alt="" />  
    </div>
  );
};

export default Navbar;



