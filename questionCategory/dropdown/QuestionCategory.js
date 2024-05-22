import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class QuestionCategory extends Component {

    render() {
        return (
            <ul className="nav flex-column">

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/admin/add-question-category' className="nav-link">
                        <i className="material-icons">note_add</i>
                        <span>Add Question Category</span>
                    </NavLink>
                </li>


                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/admin/view-question-Category' className="nav-link " >
                        <i className="material-icons">note_add</i>
                        <span>View Question Category</span>
                    </NavLink>
                </li>
            </ul>


        )
    }
}



export default QuestionCategory
