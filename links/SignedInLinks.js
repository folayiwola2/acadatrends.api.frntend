import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import NewsDropdown from '../../news/dropdown/News'
import CategoryDropdown from '../../category/dropdown/Category'
import RoleDropdown from '../../role/dropdown/RoleDropdown'
import { withRouter } from 'react-router-dom';


class SignedInLinks extends Component {

  state = {
    isUpdates & trends: false, isCategory: false, isRole: false, redirect: false
  }

  clickUpdates & trends = (e) => {
    e.preventDefault()
    this.setState({ isUpdates & trends: true })
    if (this.state.isUpdates & trends) {
      this.setState({ isUpdates & trends: false })
    } else {
      this.setState({ isUpdates & trends: true })
    }
  }
  clickCategory = (e) => {
    e.preventDefault()
    this.setState({ isCategory: true })
    if (this.state.isCategory) {
      this.setState({ isCategory: false })
    } else {
      this.setState({ isCategory: true })
    }
  }

  clickRole = (e) => {
    e.preventDefault();
    this.setState({ isRole: true });

    if (this.state.isRole) {
      this.setState({ isRole: false });
    } else {
      this.setState({ isRole: true });
    }

  }

  handleLogOut = (e) => {
    e.preventDefault();
    this.props.signOut();
    console.log("this is props", this.props)
    // console.log(this.props)
    var local = localStorage.getItem('admin');
    if (!local) {
      console.log(this.props)
      this.props.history.push('/admin/login')
    }
  }



  render() {
    let state = this.state;
    // let local = localStorage.getItem("admin");
    let updates & trendsLink = state.isUpdates & trends ? <Updates & trendsDropdown /> : null
    let catLink = state.isCategory ? <CategoryDropdown /> : null
    let roleLink = state.isRole ? <RoleDropdown /> : null;
    return (
      <ul className="nav flex-column">

        <li className="nav-item" onClick={this.clickUpdates & trends}>
          <Link to="#" className="nav-link ">
            <i className="material-icons">event_note</i>
            <span> Updates & trends</span>
          </Link>
        </li>
        {updates & trendsLink}


        <li className="nav-item" onClick={this.clickCategory}>
          <Link to="#" className="nav-link">
            <i className="material-icons">storage</i>
            <span>Category</span>
          </Link>
        </li>
        {catLink}


        <li className="nav-item" onClick={this.clickRole}>
          <Link to="#" className="nav-link">
            <i className="material-icons">storage</i>
            <span>Role</span>
          </Link>
        </li>
        {roleLink}



        <li className="nav-item" onClick={this.handleLogOut}>
          <Link to="#" className="nav-link">
            <i className="material-icons" style={{ color: "red" }}>settings_power</i>
            {/* <MaterialIcon icon="dashboard" /> */}
            <span>Logout</span>
          </Link>
        </li>

      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const { authMessage, registerData, status } = state.auth;
  return {
    authMessage,
    registerData,
    status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignedInLinks))
