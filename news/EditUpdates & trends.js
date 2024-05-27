


import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
// import { updateUpdates & trends } from '../store/actions/projectActions'
import image from '../style/images/avatar.jpg'
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux'
// import { NavLink, Link } from 'react-router-dom';
// import '../style/signIn.css';
import swal from 'sweetalert'

class EditUpdates & trends extends Component {

    state = { updates & trends: [], isLoading: false, title: "", banner: "", content: "", author: "", category: [], isUpdated: false }

    componentDidMount() {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api"

        let id = this.props.match.params.id

        fetch(`${base_url}/news/${id}`).then((response) => {
            return response.json()
        }).then((updates & trendsData) => {
            console.log(this.props)
            let data = updates & trendsData.data
            console.log("yes", updates & trendsData.data)
            this.setState({ title: data.title, content: data.content, category: data.category, author: data.author, banner: data.updates & trends_dp })

            fetch(`${base_url}/category/`).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(id)
                console.log(data)
                this.setState({ categoryDrp: data })
            })

        })
        console.log()
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    handleSubmit = (e) => {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "www.acadatrends.com/api"

        e.preventDefault()
        let id = this.props.match.params.id;
        let title = document.getElementById("title").value, category = document.getElementById("category").value;
        let content = document.getElementById("content").value; let author = document.getElementById("author").value;

        let obj = { title, category, content, author };

        fetch(`${base_url}/updates & trends/${id}`, {
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
                    swal("Response", "Successfully updated News", "success");
                    setTimeout(this.props.history.push('/admin/view-updates & trends'), 2000)

                } else {
                    return swal("Response", "Update Failed", "failed")
                }

            })
        })

    }

    previewFile = () => {
        var preview = document.getElementById("image-box");
        var file = document.querySelector("input[type=file]").files[0];
        var reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                preview.src = reader.result;
                let imgStr = reader.result;
                this.setState({ image: imgStr });
                console.log("My file result", imgStr);
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    render() {
        let state = this.state;
        console.log("this state", state)
        let catDrp = this.state.categoryDrp ? this.state.categoryDrp.data : [];
        console.log(catDrp)
        let dropList = catDrp ? (
            catDrp.map((o, i) =>
                <option id={o.id} key={o.id}> {o.name} </option>
            )
        ) : (
                <option value="2"></option>
            )

        return (
            <Preloader>
                <Placeholder>
                    <span >Loading...</span>
                </Placeholder>
                <div className="main-content-container container-fluid px-4" style={{ background: "" }}>
                    {/* <!-- Page Header --> */}
                    <div className="page-header row no-gutters py-4" style={{ height: "0px" }}>
                        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                            {/* <h6 className="page-title">Admin News</h6> */}
                        </div>
                    </div>

                    <div className="container" style={{ background: "white", height: "auto" }}><br /><br />
                        <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Edit  Updates & trends</p><br />
                        <form className="form-group" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-2">Updates & trends Title : </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={state ? state.title : ""} id="title" placeholder="News Title" onChange={this.handleChange} />
                                </div>
                            </div><br /><br />


                            <div className="row">
                                <div className="col-md-2"> Updates & trends Category: </div>
                                <div className="col-md-8">
                                    <select class="form-control">
                                        <option id="category" selected> {state ? state.category : ""}</option>
                                        {dropList}
                                    </select>
                                </div>
                            </div><br /><br />
                            <div className="row">
                                <div className="col-md-2">Updates & trends Content : </div>
                                <div className="col-md-8">
                                    <textarea type="text" wrap="on" className="form-control" value={state ? state.content : ""} id="content" rows="3" placeholder="Updates & trends Content" onChange={this.handleChange} style={{ height: "30vh" }}></textarea>

                                    {/* <input type="text" className="form-control" value={state ? state.content : ""} ref="content" id="content" placeholder="Updates & trends Content" onChange={this.handleChange} /> */}
                                </div>
                            </div><br /><br />
                            <div className="row">
                                <div className="col-md-2">News Author : </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={state ? state.author : ""} disabled="true" id="author" placeholder="Updates & trends Author" onChange={this.handleChange} />
                                </div>
                            </div><br /><br />


                            <div className="row">
                                <div className="col-md-2">Upload Image : </div>
                                <div className="col-md-8">
                                    <input type="file" className="form-control" id="images" placeholder="City" onChange={this.previewFile} /><br />
                                    <img src={state.banner === undefined ? image : state.banner} height="200" id="image-box" alt="" />
                                </div>
                            </div><br /><br />


                            <div className="row">
                                <div className="col-md-2"> </div>
                                <div className="col-md-8">
                                    <button className={this.state.isLoading ? "mb-2 btn btn-primary mr-2 col-md-12 disabled" : "mb-2 btn btn-primary mr-2 col-md-12"} >
                                        {this.state.isLoading ? "Updating Updates & trends..." : "Update Updates & trends"}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </Preloader>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUpdates & trends: (updates & trends) => dispatch(updateupdates & trends(updates & trends))
//     }
// }


export default EditUpdates & trends

