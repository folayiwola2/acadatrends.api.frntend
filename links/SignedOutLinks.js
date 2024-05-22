import React from 'react'
import { NavLink } from 'react-router-dom';


const SignedOutLinks = () => {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <NavLink to='/admin/login' className="nav-link ">
          <i className="material-icons">person</i>
          <span>Login</span>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/admin/register' className="nav-link ">
          <i className="material-icons">person</i>
          <span>Registration</span>
        </NavLink>
      </li>
    </ul>
  )
}

export default SignedOutLinks
