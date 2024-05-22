import React from 'react'
import { Link } from 'react-router-dom'

const UserDashboard = ({ buttonStyle, userList }) => {
    return (
        <>
            <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <div className="row" >
                            <div className="col-md-6"><h6 className="m-0">Top 5 Recent Users</h6></div>
                            <div className="col-md-6">
                                <Link to="/view-users">
                                    <button className="btn btn-primary" style={buttonStyle}>
                                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                                    </button>
                                </Link>
                            </div>
                            <hr />
                        </div>
                        <table id="" className="table table-responsive table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <td>Date Created</td>
                                </tr>
                            </thead>
                            <tbody>
                                {userList}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <td>Date Created</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserDashboard
