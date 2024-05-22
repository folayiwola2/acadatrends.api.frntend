import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import '../style/datatable.css'
import swal from 'sweetalert';
import Moment from "react-moment";

const $ = require('jquery');
$.DataTable = require("datatables.net")

class ViewAdmins extends Component {

    state = {
        admin: [], isLoading: false, isEdit: false, base_url: "",
        isDev: /localhost/.test(window.location.origin)
    }

    componentDidMount() {

        let base_url = this.state.isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api"
        this.setState({ base_url })
        this.fetchData()
    }
    fetchData = async () => {
        console.log("wunmi  ", this.state.base_url)
        let base_url = this.state.isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api"

        fetch(`${base_url}/admin/`).then((response) => {
            return response.json()
        }).then((adminData) => {
            console.log("yes", adminData.data)
            this.setState({ admin: adminData.data.length ? adminData.data : null });
            $("#example").DataTable()
        })
    }
    handleEdit = (e) => {
        console.log("target", e.target.id)
        this.setState({ isEdit: true })
        console.log("Id is", e.target)
        this.props.history.push(`/admin/edit-admin/${e.target.id}`)
    }

    handleDelete = (e) => {
        //       return console.log(e.target.id)
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
                    console.log("about deleting", id)
                    fetch(`${this.state.base_url}/admin/${id}`, {
                        method: "DELETE",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "x-access-token": localStorage.getItem("admin") || ""
                        },
                    }).then((res) => {
                        return res.json()
                    }).then((data) => {
                        if (data.statuscode === 200) {
                            console.log("data", data)
                            swal("Response", "File successfully deleted", {
                                icon: "success"
                            });
                            return this.fetchData()
                        } else {
                            return swal("Response", "Server error, please try again", {
                                icon: "error"
                            });
                        }

                    })

                }
            })
    }

    render() {

        let { adminData } = this.state
        if (this.state.isEdit) {

        }
        console.log("render", this.state)
        const mydata = this.state.admin;
        console.log("tunde", mydata)

        let adminList = mydata.length ? (
            mydata.map((o, i) => {
                console.log("my admin data", o);
                return (
                    <tr key={o.id}>
                        <td>{i + 1}</td>
                        <td>{o.firstname}</td>
                        <td>{o.othernames}</td>
                        <td>{o.email}</td>
                        <td>{o.phone}</td>
                        <td>{o.role.toUpperCase()}</td>
                        <td><Moment fromNow>{o.createdAt}</Moment></td>
                        <td><button className="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o._id}><i className="material-icons" id={o._id} style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
                        <td><button className="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleDelete} id={o._id}><i className="material-icons" id={o._id} style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
                    </tr>
                )
            })
        ) : (
                <td>No data to show</td>
            )
        return (
            <Preloader>
                <Placeholder>
                    <span fadeDuration={10000}>Loading...</span>
                </Placeholder>
                <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
                    <div className="card-body" style={{ background: "white" }}>
                        <table id="example" className="table table-striped table-bordered table-hover" width="100%" >
                            <thead>
                                <tr>
                                    <th>S/n</th>
                                    <th>FirstName</th>
                                    <th>OtherNames</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Date Joined</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adminList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Preloader>
        )
    }
}


export default ViewAdmins