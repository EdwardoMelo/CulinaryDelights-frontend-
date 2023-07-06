/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link  } from 'react-router-dom'; 
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Home from '../pages/Home';

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const [cookies, setCookies] = useCookies(["access_token"]);
  const isAuthenticated = cookies.access_token ? true : false;
  const items = [
    { name: 'Home', href: '/'},
    { name: 'Create Recipe', href: '/create-recipe'},
    { name: 'Login / Sign up', href: '/auth'},
    { name: 'Saved Recipes', href: '/saved-recipes'}
  ]
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate('/auth')
  }
  return (
    <div className='navbar'>
      <div className='navbarLinks'>
      <Link to="/">Home</Link>
      {isAuthenticated && <Link to="/create-recipe">Create Recipe</Link>}
      {!isAuthenticated ? (<Link to="/auth">Login/ Sing up</Link>) : (
        <><Link to="/saved-recipes">Saved Recipes</Link><button className='logout' onClick={logout} t>
            logout
          </button></>
        )}
      </div>
     

      <div className='navbarMenu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {
          toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul>{ }
                {items.map((item) => (
                  <li className='app__flex p-text' key={item.name}>
                    {item.href === '/auth' && isAuthenticated ?
                      (<button className='logout' onClick={logout} >
                        logout
                      </button>) : (<a href={item.href}>{item.name}</a>)}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        }
      </div>

    </div>
  )
}

export default Navbar