import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import your CSS file
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");            
  const {getTotalCartAmount,token,setToken}=useContext(StoreContext)  
  const navigate = useNavigate(); // Initializes the navigate function from the useNavigate hook

const logout = () => { // Defines a logout function
  localStorage.removeItem("token"); // Removes the token from localStorage
  setToken(""); // Clears the token in the context state
  navigate("/"); // Navigates the user to the specified route ("/" in this case)
}



  return (
    <div className='navbar'> 
       <h1 style={{ margin: 0, fontSize: '40px', color: 'red', fontFamily: 'Open Sans', /* Replace with your chosen font family */ }}>FOODIE</h1>  

     
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          Menu
        </a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>
          Mobile App
        </a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>
          Contact Us
        </a>
      </ul>
      <div className='navbar-right'>
       
        <div className='navbar-search-icon'>
        <Link to='/cart'>  <img src={assets.basket_icon} alt="" /> </Link>  
          <div className={getTotalCartAmount()==0?"":"dot"}></div>  
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>

:<div className='navbar-profile'>

<img src={assets.profile_icon} alt="" />  

<ul className="nav-profile-dropdown">

<li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>          

<hr />

<li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li> 

</ul>
</div>} 
  
        </div>  
    </div>
  );
};

export default Navbar;



