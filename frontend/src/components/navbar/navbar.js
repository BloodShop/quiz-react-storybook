import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/auth';

export default function Navbar() {

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textdecoration: isActive ? 'none' : 'underline',
            fontSize: '27px',
        }
    }

    const auth = useAuth()

  return (
    <nav className='primary-nav'>
        <NavLink style={navLinkStyles} to='/'>
            Home
        </NavLink>
        <NavLink style={navLinkStyles} to='/exams'>
            Exams
        </NavLink>
        <NavLink style={navLinkStyles} to='/add-exam'>
            Add Exam
        </NavLink>
        <NavLink style={navLinkStyles} to='/users'>
            Users
        </NavLink>
        <NavLink style={navLinkStyles} to='/about'>
            About
        </NavLink>
        <NavLink style={navLinkStyles} to='/profile'>
            Profile
        </NavLink>
        {!auth.user && (
            <NavLink style={navLinkStyles} to='/login'>
                Login
            </NavLink>
            )
        }
    </nav>
  )
}
