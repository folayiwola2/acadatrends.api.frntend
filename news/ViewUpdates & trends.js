
import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import { connect } from "react-redux";
import { getUpdates & trends } from "../store/actions/projectActions";
import '../style/datatable.css'
import '../style/updates & trends.css'
import swal from 'sweetalert';
import Moment from "react-moment";
import image from '../style/images/avatar.jpg'

const $ = require('jquery');
$.DataTable = require("datatables.net")
let isDev = /localhost/.test(window.location.origin);
let base_url = isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api"

class ViewUpdates & trends extends Component {

  state = { updates & trends: [], isLoading: false, isEdit: false }

  componentDidMount() {
    console.log("yea", document.querySelector(".main-sidebar"))
    // document.querySelector(".main-sidebar").style.display = "none"
    this.fetchupdates & trends()
    // let x = document.querySelectorAll("select")[0]; x.className = 'form-control';
  }

  // fetchData = async () => {
  //   let _data = await this.props.getNews();
  //   console.log("_data", _data)
  //   let { data } = _data.response;
  //   this.setState({ updates & trends: data.length ? data : null });
  // }

  fetchUpdates & trends = async () => {
    fetch(`${base_url}/updates & trends/`).then((response) => {
      return response.json()
    }).then((updates & trendsData) => {
      console.log("yes", updates & trendsData.data)
      this.setState({ updates & trends: updates & trendsData.data.length ? updates & trendsData.data.reverse() : null });
      $("#example").DataTable()
    })

  }

  handleEdit = (e) => {
    this.props.history.push(`/admin/edit-updates & trends/${e.target.id}`)
  }

  handleDelete = (e) => {
    e.preventDefault()
    let id = e.target.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to retrieve",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          console.log("Will delete")

          fetch(`${base_url}/updates & trends/${id}`, {
            method: "DELETE",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-access-token": localStorage.getItem("admin") || ""
            },
          }).then((res) => {
            res.json()
          }).then((data) => {
            console.log("data", data)
            swal("Response", "Updates & trends successfully deleted", {
              icon: "success"
            });
            this.fetchUpdates & trends()
          })

        } else {
          console.log("Will not delete")
        }
      })
  }

  render() {
    if (this.state.isEdit) {

    }
    const mydata = this.state.updates & trends;
    console.log(this.state.updates & trends)
    let updates & trendsList = mydata ? (
      mydata.map((o, i) => {
        return (
          <tr key={o._id}>
            <td>{i + 1}</td>
            <td style={{ width: "10%" }}>

              <img className="updates & trends-pic" src={o.updates & trends_dp === undefined ? image : o.updates & trends_dp} alt="updates & trends pic"
                style={{ height: "60px" }} />
            </td>
            <td>{o.author}</td>
            <td>{o.title}</td>
            <td>{o.content}</td>
            <td><button class="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }}
              onClick={this.handleEdit} id={o._id}><i className="material-icons" id={o._id}
                style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
            <td><button class="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px", width: "10px" }}
              onClick={this.handleDelete} id={o._id}>
              <i className="material-icons" id={o._id}
                style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
          </tr>
        )
      })
    ) : (
        <div>No data to show</div>
      )
    return (
      <Preloader>
        <Placeholder>
          <span fadeDuration={10000}>Loading...</span>
        </Placeholder>
        <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
          <div className="card-body" style={{ background: "white" }}>
            <table id="example" class="table table-striped table-bordered table-hover" width="100%" style={{ overflow: "auto" }}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {Updates & trendsList}
              </tbody>
            </table>
          </div>
        </div>
      </Preloader>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("Map props", state)
  const { projectMessage, projectData, status } = state.project;
  console.log("Scraa", projectMessage, projectData, status);
  return {
    projectMessage,
    projectData,
    status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUpdates & trends() {
      return new Promise(resolve => {
        dispatch(
          getUpdates & trends(res => {
            $("#example").DataTable();
            resolve(res)

          })
        );
      });
    }
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ViewUpdates & trends);
