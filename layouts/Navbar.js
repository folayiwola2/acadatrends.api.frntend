import React, { Component } from 'react'
import Dp from '../style/images/avatar.jpg'
// import ProfileDropdown from '../../components/layouts/ProfileDropdown'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  state = {
    showProfileDrp: false
  }

  render() {

    let localDb = JSON.parse(localStorage.getItem("admin"));
    let adminName = !localDb || localDb.admin.firstname === null ? "Unregistered Admin" : `${localDb.admin.firstname}  ${localDb.admin.othernames}`

    let dp = !localDb || localDb.admin.admin_dp === undefined ? Dp : localDb.admin.admin_dp
    return (
      <div className="main-navbar sticky-top bg-white">
        {/* <!-- Main Navbar --> */}
        <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
          <form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
            <div className="input-group input-group-seamless ml-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <input className="navbar-search form-control text-center" type="text" value={`You are Welcome ${adminName}`} aria-label="Search" disabled={true} style={{ background: "white", fontSize: "25px" }} />
            </div>
          </form>
          <ul className="navbar-nav border-left flex-row ">


            <li className="nav-item border-right dropdown notifications">
              <Link to="/" className="nav-link nav-link-icon text-center" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="user-avatar rounded-circle mr-2" src={dp} alt="User Avatar" style={{ height: "42px" }} />
                {/* <span className="d-none d-md-inline-block">Acada Daniel</span> */}
              </Link>
              <div className="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">
                <b className="dropdown-item">
                  <div className="notification__icon-wrapper">
                    <div className="notification__icon">
                      {/* <i className="material-icons">&#xE6E1;</i> */}
                      <img className="user-avatar rounded-circle mr-2" src={dp} alt="User Avatar" style={{ height: "42px" }} />
                    </div>
                  </div>
                  <Link to="/admin-profile">
                    <div className="notification__content">
                      <span className="notification__category" style={{ fontSize: "14px", fontWeight: "600" }}>{adminName}</span>
                    </div>
                  </Link>
                </b>
                <Link to="" className="dropdown-item" >
                  {/* <div className="notification__icon-wrapper">
                    <div className="notification__icon">
                      <i className="material-icons">&#xE8D1;</i>
                    </div>
                  </div> */}
                  {/* <div className="notification__content">
                    <span className="notification__category">Coming details</span>
                  </div> */}
                </Link>
                {/* <Link className="dropdown-item notification__all text-center" > View all Notifications </Link> */}
              </div>
            </li>
            {/* <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-nowrap px-3" >
                    <img className="user-avatar rounded-circle mr-2" src={Dp} alt="User Avatar" />
                    <span className="d-none d-md-inline-block">Acada Daniel</span>
                  </Link>
                  {showProfileDrp}
                </li> */}
          </ul>
          <nav className="nav">
            <span to="" className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left" data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
              <i className="material-icons">&#xE5D2;</i>
            </span>
          </nav>
        </nav>
      </div>

    )
  }
}

export default Navbar
