import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';





class RoleDropdown extends Component {

    state = {
        role: ""
    }
    componentDidMount() {
        const localData = JSON.parse(localStorage.getItem("admin"))
        console.log("Acada", localData.admin.role)
        const role = localData.admin.role
        this.setState({ role })
    }

    render() {
        const isAdminLink = this.state.role === "super_admin" ?
            <li className="nav-item" style={{ background: "#f5f5f5" }}>
                <NavLink to='/admin/add-admin'>
                    <Link to='/admin/add-admin' className="nav-link">
                        <i className="material-icons">note_add</i>
                        <span>Add  Admin</span>
                    </Link>
                </NavLink>
            </li> : null

        return (
            <ul className="nav flex-column">

                {
                    isAdminLink
                }


                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <Link to='/admin/view-admins' className="nav-link">
                        <i className="material-icons">note_add</i>
                        <span>View Admins</span>
                    </Link>
                </li>

                {/* <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/add-user'>
                        <Link className="nav-link">
                            <i className="material-icons">note_add</i>
                            <span>Add User</span>
                        </Link>
                    </NavLink>
                </li> */}

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <Link to='/admin/view-users' className="nav-link">
                        <i className="material-icons">note_add</i>
                        <span>View Users</span>
                    </Link>
                </li>


            </ul>
        )
    }
}



export default RoleDropdown
