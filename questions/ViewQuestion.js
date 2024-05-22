
import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import { connect } from "react-redux";
import { getQuestions } from "../store/actions/projectActions";
import '../style/datatable.css'
import '../style/news.css'
import swal from 'sweetalert';
import Moment from "react-moment";
import image from '../style/images/avatar.jpg'

const $ = require('jquery');
$.DataTable = require("datatables.net")
let isDev = /localhost/.test(window.location.origin);
let base_url = isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api"

class ViewQuestions extends Component {

  state = { news: [], isLoading: false, isEdit: false }

  componentDidMount() {
    console.log("yea", document.querySelector(".main-sidebar"))
    // document.querySelector(".main-sidebar").style.display = "none"
    this.fetchNews()
    // let x = document.querySelectorAll("select")[0]; x.className = 'form-control';
  }

  // fetchData = async () => {
  //   let _data = await this.props.getQuestions();
  //   console.log("_data", _data)
  //   let { data } = _data.response;
  //   this.setState({ news: data.length ? data : null });
  // }

  fetchNews = async () => {
    fetch(`${base_url}/questions/`).then((response) => {
      return response.json()
    }).then((newsData) => {
      console.log("yes", newsData.data)
      this.setState({ news: newsData.data.length ? newsData.data.reverse() : null });
      $("#example").DataTable()
    })

  }

  handleEdit = (e) => {
    this.props.history.push(`/admin/edit-questions/${e.target.id}`)
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

          fetch(`${base_url}/questions/${id}`, {
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
            swal("Response", "Questions successfully deleted", {
              icon: "success"
            });
            this.fetchNews()
          })

        } else {
          console.log("Will not delete")
        }
      })
  }

  render() {
    if (this.state.isEdit) {

    }
    const mydata = this.state.news;
    console.log(this.state.news)
    let newsList = mydata ? (
      mydata.map((o, i) => {
        return (
          <tr key={o._id}>
            <td>{i + 1}</td>
            <td style={{ width: "10%" }}>

              <img className="news-pic" src={o.news_dp === undefined ? image : o.news_dp} alt="news pic"
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
                  <th>S/n</th>
                  <th>Image</th>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {newsList}
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
    getQuestions() {
      return new Promise(resolve => {
        dispatch(
          getQuestions(res => {
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
)(ViewQuestions);