import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import '../style/datatable.css'
import swal from 'sweetalert';
import Moment from "react-moment";
import { deleteQuestionCategory } from "../store/actions/projectActions";
import { connect } from 'react-redux';


const $ = require('jquery');
$.DataTable = require("datatables.net")
let isDev = /localhost/.test(window.location.origin);
console.log("isdev", isDev)
let base_url = isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api"

class ViewQuestionCategory extends Component {

  state = { category: [], isLoading: false, isEdit: false }

  componentDidMount() {
    this.fetchCategory()
  }

  fetchCategory = async () => {

    fetch(`${base_url}/questionCategory/`).then((response) => {
      return response.json()
    }).then((categoryData) => {
      this.setState({ category: categoryData.data.length ? categoryData.data.reverse() : null });
      $("#example").DataTable()
    })

  }


  handleEdit = (e) => {
    this.setState({ isEdit: true })
    this.props.history.push(`/admin/edit-question-category/${e.target.id}`)
  }

  handleDelete = (e) => {
    e.preventDefault()
    console.log(e.target.id)
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

          fetch(`${base_url}/questionCategory/${id}`, {
            method: "DELETE",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-access-token": localStorage.getItem("admin") || ""
            },
          }).then((res) => {
            res.json()
          }).then((data) => {
            swal("Response", "Question Category successfully deleted", {
              icon: "success"
            });
            this.fetchCategory()
          })

        } else {
          console.log("Will not delete")
        }
      })
  }
  render() {
    if (this.state.isEdit) {

    }
    const mydata = this.state.category;

    let categoryList = mydata ? (
      mydata.map((o, i) => {
        return (
          <tr key={o._id}>
            <td>{i + 1}</td>
            <td>{o.name}</td>
            <td>{o.code}</td>
            <td><Moment fromNow>{o.createdAt}</Moment></td>
            <td><button className="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o._id}><i className="material-icons" id={o._id} style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
            <td><button className="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleDelete} id={o._id}><i className="material-icons" id={o._id} style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
          </tr>
        )
      })
    ) : (
        <div>No data to show</div>
      )
    return (
      <Preloader>
        <Placeholder>
          <span >Loading...</span>
        </Placeholder>
        <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
          <div className="card-body" style={{ background: "white" }}>
            <table id="example" className="table table-striped table-bordered table-hover" width="100%" >
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Category Name</th>
                  <th>Category Code</th>
                  <th>Date Created</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {categoryList}
              </tbody>
            </table>
          </div>
        </div>
      </Preloader>
    )
  }
}


const mapStateToProps = (state) => {
  // const { projectMessage, projectData, status } = state.project;
  // console.log("Scraa", projectMessage, projectData, status);
  // return {
  //   projectMessage,
  //   projectData,
  //   status
  // }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCategory: (categoryId) => {
      return new Promise((resolve) => {
        dispatch(deleteCategory(categoryId, (res) => {
          resolve(res);
        }))
      })
    }
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(ViewQuestionCategory);
