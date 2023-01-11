import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textdecoration: isActive ? 'none' : 'underline',
        }
    }

  return (
    <nav className='primary-nav'>
        <NavLink style={navLinkStyles} to='/'>
            Home
        </NavLink>
        <NavLink style={navLinkStyles} to='/exams'>
            Exams
        </NavLink>
        {/* <NavLink style={navLinkStyles} to='/exam'>
            Exam Page
        </NavLink> */}
    </nav>
  )
}
