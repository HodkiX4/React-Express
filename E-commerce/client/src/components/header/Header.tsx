import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore"
import style from './header.module.css';
import { FaUser, FaHouse, FaShop, FaCartShopping, FaBars } from "react-icons/fa6";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLogout } from "../../hooks/useLogout";

const Header = () => {
  const { token, user } = useAuthStore();
  const { handleLogout } = useLogout();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className={style.navbar}>
      <div className={style.title}>
        <h2>My<span>Store</span></h2>
      </div>
      
      {/* Hamburger Menu Icon */}
      <div className={style.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`${style.public} ${menuOpen ? style.active : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home <FaHouse />
        </NavLink>
        <NavLink to="/store" onClick={() => setMenuOpen(false)}>
          Store <FaShop />
        </NavLink>
        {
          token ?
          <NavLink to="/protected/cart" onClick={() => setMenuOpen(false)}>
            Cart <FaCartShopping />
          </NavLink>
          :
          <>
          <NavLink to='/login' onClick={() => setMenuOpen(false)}>
            Login
            <FaUser/>
          </NavLink>
          <NavLink to='/signup' onClick={() => setMenuOpen(false)}>
            Signup
            <FaUser/>
          </NavLink>
          </>
        }
      </nav>
      <>
        {
          token ?
          <div className={style.session}>
            <span>
              {user?.email}
            </span>
            <NavLink to='/protected/profile'>
              <FaUser />
            </NavLink>
            <button
              className={style.logout}
              onClick={() => handleLogout(navigate)}
            >
              Logout
            </button>
          </div>
          :
          <div className={style.session}>
          
          </div>
        }
      </>

    </header>
  )
}

export default Header