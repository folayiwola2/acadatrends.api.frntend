


import React, { Component } from 'react'
// import { Preloader, Placeholder } from 'react-preloading-screen';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
// import { NavLink, Link } from 'react-router-dom';
import { getAdminProfile } from '../store/actions/authActions'
import swal from 'sweetalert'

class AdminProfile extends Component {

    state = { admin: {}, isLoading: false, isUpdated: false, admin_id: "" }

    componentDidMount() {
        this.fetchData()

    }
    fetchData = async () => {
        let _data = await this.props.getAdminProfile();
        let { data } = _data.response;
        console.log("Data", data)
        // this.setState({ news: data.length ? data : null });
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    previewFile = () => {
        var preview = document.getElementById("image-box");
        var file = document.querySelector("input[type=file]").files[0];
        var reader = new FileReader();

        reader.addEventListener("load", () => {
            preview.src = reader.result;
            let imgStr = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
            this.setState({ image: imgStr })
            console.log("My file result", imgStr)
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    handleSubmit = (e) => {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "www.acadatrends.com/api"

        e.preventDefault()
        let id = this.props.match.params.id;
        let title = document.getElementById("title").value, category = document.getElementById("category").value,
            content = document.getElementById("content").value, author = document.getElementById("author").value;

        let obj = { title, category, content, author };
        console.log("obj", obj)
        fetch(`${base_url}/admin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("admin")).token
            },
            body: JSON.stringify(obj)
        }).then((res) => {
            res.json().then((response) => {
                console.log("Update response", response)
                if (response.statuscode === 200) {
                    return swal("Response", "Successfully updated", "success")
                } else {
                    return swal("Response", "Update Failed", "failed")
                }

            })
        })
    }

    render() {
        let state = this.state.admin;
        console.log("trial", state ? state.firstname : "hello")
        return (
            <div className="main-content-container container-fluid px-4" style={{ background: "" }}>
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4" style={{ height: "0px" }}>
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h6 className="page-title">Admin Profile</h6>
                    </div>
                </div><br />

                <div className="container" style={{ background: "white", height: "auto" }}><br />
                    <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Register</p>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-2">First Name : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="firstname" value={state ? state.firstname : ""} placeholder="First Name" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Other Names : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="othernames" value={state ? state.othernames : ""} placeholder="Other Names" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Email : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="email" value={state ? state.email : ""} placeholder="name@email.com" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Phone Number : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="phone" value={state ? state.phone : ""} placeholder="phone" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">School : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="school" placeholder="School" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />

                        <div className="row">
                            <div className="col-md-2">Upload Image : </div>
                            <div className="col-md-8">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="images"
                                    placeholder="City"
                                    onChange={this.previewFile}
                                />
                                <img src="" height="200" id="image-box" alt="" />
                            </div>
                        </div>
                        <br />
                        <br />

                        <div className="row">
                            <div className="col-md-2"> </div>
                            <div className="col-md-8">
                                <button className="mb-2 btn btn-primary mr-2 col-md-12 glyphicons glyphicons-star" disabled={this.state.isLoading ? true : false}>
                                    {this.state.isLoading ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Updating Profile...</span> : "Update Profile"}
                                </button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { adminProfileMessage, adminProfile, adminProfileStatus } = state.auth;
    console.log("Scraa", adminProfileMessage, adminProfile, adminProfileStatus);
    return {
        adminProfileMessage, adminProfile, adminProfileStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile() {
            return new Promise(resolve => {
                dispatch(
                    getAdminProfile(res => {
                        resolve(res)
                    })
                );
            });
        }
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(AdminProfile);

