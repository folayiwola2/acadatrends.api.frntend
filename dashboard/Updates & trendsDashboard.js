import React from 'react'
import { Link } from 'react-router-dom'
const Updates & trendsDashboard = ({ updates & trendsList, buttonStyle }) => {
    return (
        <>

            <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <div className="row" >
                            <div className="col-md-6"><h6 className="m-0">Top 5 Recent Updates & trends</h6></div>
                            <div className="col-md-6">
                                <Link to="/view-updates & trends">
                                    <button className="btn btn-primary" style={buttonStyle}>
                                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                                    </button>
                                </Link>
                            </div>
                            <hr />
                        </div>
                        <table id="" className="table-responsive table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th className="">Banner</th>
                                    <th className="">Title</th>
                                    <th className="">Category</th>
                                    <th className="">Content</th>
                                    <th className="">Author</th>
                                    <th className="">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updates & trendsList}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className="">Banner</th>
                                    <th className="">Title</th>
                                    <th className="">Category</th>
                                    <th className="">Content</th>
                                    <th className="">Author</th>
                                    <th className="">Date</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Updates & trendsDashboard
