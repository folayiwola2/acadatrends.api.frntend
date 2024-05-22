import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import image from '../style/images/avatar.jpg'
import { withRouter } from 'react-router-dom';
import Moment from "react-moment";


class Dashboard extends Component {
  state = {
    admin: [], news: [], user: [], category: [], fakedata: [], data: JSON.parse(localStorage.getItem("admin"))
  }
  componentWillMount() {
    if (this.state.data === null) {
      this.props.history.push('/admin/login');
    }

  }

  componentDidMount() {
    let isDev = /localhost/.test(window.location.origin);
    let base_url = isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api"

    fetch(`${base_url}/admin/`).then((res) => {
      return res.json();
    }).then((data) => {
      // console.log("admins", data);
      this.setState({ admin: data })

      fetch(`${base_url}/news/`).then((res) => {
        return res.json();
      }).then((data) => {
        // console.log("News", data); 
        this.setState({ news: data });

        fetch(`${base_url}/category/`).then((res) => {
          return res.json();
        }).then((data) => {
          this.setState({ category: data })
        })

        fetch(`${base_url}/user/`).then((res) => {
          return res.json();
        }).then((data) => {
          this.setState({ user: data })
        })
      })

    })
  }

  handleEdit = (e) => {
    this.props.history.push(`/admin/edit-news/${e.target.id}`)
  }


  render() {
    let adminData = this.state.admin, newsData = this.state.news, userData = this.state.user, categoryData = this.state.category;

    let adminLength = adminData.data ? adminData.data.length : 0;
    let newsLength = newsData.data ? newsData.data.length : 0;
    let userLength = userData.data ? userData.data.length : 0;
    let categoryLength = categoryData.data ? categoryData.data.length : 0;

    let adminList = adminData.data ? (
      adminData.data.slice(0, 5).map((o, i) => {
        // console.log("myadmin data", o);
        return (
          <tr key={o._id}>
            <td><img alt="Some imgs" src={o.admin_dp === undefined ? image : o.admin_dp} style={{ height: "40px", width: " 40px", borderRadius: "50px" }} /></td>
            <td>{o.othernames}</td>
            <td>{o.email}</td>
            <td>{o.phone}</td>
            <td><Moment fromNow>{o.createdAt}</Moment></td>
          </tr>
        )
      })
    ) : (
        <tr className="text-center"><td>No data to show</td></tr>
      )

    let userList = userData.data ? (
      userData.data.slice(0, 5).map((o, i) => {
        return (
          <tr key={o._id}>
            <td><img alt="Some imgs" src={o.user_dp === undefined ? image : o.user_dp} style={{ height: "40px", width: " 40px", borderRadius: "50px" }} /></td>
            <td>{o.firstname + " " + o.othernames}</td>
            <td>{o.email}</td>
            <td>{o.phone}</td>
            <td><Moment fromNow>{o.createdAt}</Moment></td>
          </tr>
        )
      })
    ) : (
        <tr className="text-center"><td>No data to show</td></tr>
      )
    let newsList = newsData.data ? (
      newsData.data.slice(0, 5).reverse().map((o, i) => {
        return (
          <tr key={o._id}>
            <td style={{ width: "10%" }}>
              <img className="db-news-pic" alt="Some imgs" onClick={this.handleEdit} id={o._id}
                src={o.news_dp === undefined ? image : o.news_dp} style={{ height: "60px", cursor: 'pointer' }} /></td>
            <td style={{ width: "25%" }}>{o.title}</td>
            <td>{o.category}</td>
            <td style={{ width: "40%" }}>{o.content.slice(0, 200)} <span className="font-weight-bolder" onClick={this.handleEdit} id={o._id} style={{ cursor: "pointer" }}>Read more...</span></td>
            <td>{o.author}</td>
            <td><Moment fromNow>{o.createdAt}</Moment></td>
          </tr>
        )
      })
    ) : (
        <tr className="text-center"><td>No data to show</td></tr>
      )

    let categoryList = categoryData.data ? (
      categoryData.data.slice(0, 5).map((o, i) => {
        return (
          <tr key={o._id}>
            <td>{i + 1}</td>
            <td>{o.code}</td>
            <td style={{ width: "20%" }}>{o.name}</td>
            <td><Moment fromNow>{o.createdAt}</Moment></td>
          </tr>
        )
      })
    ) : (
        <tr className="text-center"><td>No data to show</td></tr>
      )
    return (
      <div className="main-content-container container-fluid px-4">
        {/* <!-- Page Header --> */}
        <div className="page-header row no-gutters py-4">
          <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
            <span className="text-uppercase page-subtitle">Dashboard</span>
            <h3 className="page-title">Blog Overview</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg col-md-6 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <NavLink to="/admin/login" style={{ cursor: "pointer" }}>
                    <div className="stats-small__data text-center">
                      <span className="stats-small__label text-uppercase">News</span>
                      <h6 className="stats-small__value count my-3">{newsLength}</h6>
                    </div>
                    <div className="stats-small__data">
                      {/* <span className="stats-small__percentage stats-small__percentage--increase">4.7%</span> */}
                    </div>
                  </NavLink>
                </div>

                <canvas height="120" className="blog-overview-stats-small-1"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-6 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <NavLink to='/register'>
                    <div className="stats-small__data text-center">
                      <span className="stats-small__label text-uppercase">Admins</span>
                      <h6 className="stats-small__value count my-3">{adminLength}</h6>
                    </div>
                    <div className="stats-small__data">
                      {/* <span className="stats-small__percentage stats-small__percentage--increase">12.4%</span> */}
                    </div>
                  </NavLink>
                </div>
                <canvas height="120" className="blog-overview-stats-small-2"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-4 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <div className="stats-small__data text-center">
                    <span className="stats-small__label text-uppercase">Users</span>
                    <h6 className="stats-small__value count my-3">{userLength}</h6>
                  </div>
                  <div className="stats-small__data">
                    {/* <span className="stats-small__percentage stats-small__percentage--decrease">3.8%</span> */}
                  </div>
                </div>
                <canvas height="120" className="blog-overview-stats-small-3"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-4 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <div className="stats-small__data text-center">
                    <span className="stats-small__label text-uppercase">Categories</span>
                    <h6 className="stats-small__value count my-3">{categoryLength}</h6>
                  </div>
                  <div className="stats-small__data">
                    {/* <span className="stats-small__percentage stats-small__percentage--increase">12.4%</span> */}
                  </div>
                </div>
                <canvas height="120" className="blog-overview-stats-small-4"></canvas>
              </div>
            </div>
          </div>
          {/* <div className="col-lg col-md-4 col-sm-12 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <div className="stats-small__data text-center">
                    <span className="stats-small__label text-uppercase">Visitors</span>
                    <h6 className="stats-small__value count my-3">0</h6>
                  </div>
                  <div className="stats-small__data">
                    <span className="stats-small__percentage stats-small__percentage--decrease">2.4%</span>
                  </div>
                </div>
                <canvas height="120" className="blog-overview-stats-small-5"></canvas>
              </div>
            </div>
          </div> */}
        </div>
        {/* <!-- End Small Stats Blocks --> */}
        <div className="row">
          {/* <!-- Users Stats --> */}

          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Recent Admin</h6></div>
                  <div className="col-md-6">
                    <Link to="/admin/view-admins">
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
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <td>Date Created</td>
                      {/* <th>Edit</th>
                    <th>Delete</th> */}
                    </tr>
                  </thead>
                  <tbody>

                    {adminList}



                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <td>Date Created</td>
                      {/* <th>Edit</th>
                      <th>Delete</th> */}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Recent Users</h6></div>
                  <div className="col-md-6">
                    <Link to="/admin/view-users">
                      <button className="btn btn-primary" style={buttonStyle}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>
                <table id="" style={{ tableStyle }} className="table table-responsive table-striped table-bordered" cellSpacing="0" width="100%">
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <td>Date Created</td>
                      {/* <th>Edit</th>
                      <th>Delete</th> */}
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
                      {/* <th>Edit</th>
                      <th>Delete</th> */}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* end row */}


          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Recent Categories</h6></div>
                  <div className="col-md-6">
                    <Link to="/admin/view-category">
                      <button className="btn btn-primary" style={buttonStyle}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>
                <table id="" style={{ tableStyle }} className="table table-responsive table-striped table-bordered" cellSpacing="0" width="100%">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category Code</th>
                      <th>Category Name</th>
                      <th>Date Created</th>
                      {/* <th>Edit</th>
                      <th>Delete</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Category Name</th>
                      <th>Category Code</th>
                      <th>Date Created</th>
                      {/* <th>Edit</th>
                      <th>Delete</th> */}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Recent News</h6></div>
                  <div className="col-md-6">
                    <Link to="/admin/view-news">
                      <button className="btn btn-primary" style={buttonStyle}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>
                <table id="" style={{ tableStyle }} className="table-responsive table table-striped table-bordered" cellSpacing="0" width="100%">
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
                    {newsList}
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



        </div>



        <div className="row">
          {/* <!-- Users Stats --> */}

          {/* <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Recent Visitors</h6></div>
                  <div className="col-md-6">
                    <Link to="/admin/view-category">
                      <button className="btn btn-primary" style={buttonStyle}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>

              </div>
            </div>
          </div> */}


          {/* end row */}
        </div>

      </div >
      // {/* <!-- End Top Referrals Component --> */ }

    )
  }
}


const buttonStyle = {
  float: "right", height: "25px", borderRadius: "50px", backgroundImage: "#007bff"
}

const tableStyle = {
  minHeight: "73vh"
}

export default withRouter(Dashboard)
