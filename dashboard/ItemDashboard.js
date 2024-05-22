import React from 'react'
import { Link } from 'react-router-dom'

const ItemDashboard = ({ buttonStyle, itemList }) => {
    return (
        <>
            <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <div className="row" >
                            <div className="col-md-6"><h6 className="m-0">Top 5 Recent Items</h6></div>
                            <div className="col-md-6">
                                <Link to="/view-admins">
                                    <button className="btn btn-primary" style={buttonStyle}>
                                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                                    </button>
                                </Link>
                            </div>
                            <hr />
                        </div>
                        <table id="dtBasicExample" className="table-responsive table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                                <tr>
                                    {/* <th>Picture</th> */}
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Creator</th>
                                    <th>Creator</th>
                                    <td>Date Created</td>
                                </tr>
                            </thead>
                            <tbody>

                                {itemList}

                            </tbody>
                            <tfoot>
                                <tr>
                                    {/* <th>Picture</th> */}
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Creator</th>
                                    <th>Creator</th>
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

export default ItemDashboard
