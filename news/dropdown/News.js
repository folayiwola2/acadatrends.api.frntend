import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class News extends Component {

    handleViewNews = (e) => {
        document.querySelector(".main-sidebar").display = "none"
    }

    render() {
        return (
            <ul className="nav flex-column">

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/admin/add-news' className="nav-link">
                        <i className="material-icons">note_add</i>
                        <span>Add  News</span>
                    </NavLink>
                </li>

                <li className="nav-item" style={{ background: "#f5f5f5" }} >
                    <NavLink to='/admin/view-news' className="nav-link">
                        <i className="material-icons">note_add</i>
                        <span>View News</span>
                    </NavLink>
                </li>


            </ul>
        )
    }
}



export default News
