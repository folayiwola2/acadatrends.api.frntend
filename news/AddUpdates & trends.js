import React, { Component } from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import { connect } from "react-redux";
import { createUpdates & trends } from "../store/actions/projectActions";
import "../style/signIn.css";
import swal from "sweetalert";

class AddUpdates & trends extends Component {
  state = {
    title: "",
    category: "",
    content: "",
    author: "",
    image: "",
    data: "",
    isLoading: false
  };

  componentDidMount() {
    let isDev = /localhost/.test(window.location.origin);
    console.log("isdev", isDev);
    let base_url = isDev
      ? "http://localhost:4000/api"
      : "http://www.acadatrends.com/api";

    fetch(`${base_url}/category/`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ data: data });
      });
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });
    let updates & trendsDetails = this.state;
    // return console.log("state", this.state)
    let title = updates & trendsDetails.title,
      category = document.getElementById("category").value,
      content = updates & trendsDetails.content,
      author = document.getElementById("author").value,
      image = updates & trendsDetails.image;

    let obj = { title, category, content, author, image };
    console.log("my obj", obj);
    await this.props.createupdates & trends(obj);
    let props = this.props;
    console.log("Props status", this.props);
    if (props.status === "Success") {
      swal("Response", "Updates & trends Successful Created...", "success");
      this.props.history.push("/admin/view-updates & trends");
    } else {
      this.setState({ isLoading: false });
      return swal("Response", "Updates & trends creation failed...", "error");
    }
  };

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
    let state = this.state,
      drpData = state.data;
    console.log("drp data", drpData.data);

    console.log("Dropdowns", drpData);
    let localDb = JSON.parse(localStorage.getItem("admin"))
    let adminName = localDb === undefined ? "Some name" : `${localDb.admin.firstname}  ${localDb.admin.othernames}`
    console.log(adminName)
    return (
      <Preloader>
        <Placeholder>
          <span>Loading...</span>
        </Placeholder>
        <div
          className="main-content-container container-fluid px-4">
          {/* <!-- Page Header --> */}
          <div
            className="page-header row no-gutters py-4"
            style={{ height: "0px" }}
          >
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              {/* <h6 className="page-title">Admin News</h6> */}
            </div>
          </div>

          <div
            className="container"
            style={{ background: "white", height: "auto" }}
          >
            <br />
            <br />
            <p className="" style={{ textAlign: "center", fontSize: "25px" }}>
              Create Updates & trends
            </p>
            <br />
            <form className="form-group" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-2">Updates & trends Title : </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Updates & trends Title"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-md-2"> Updates & trends Category: </div>
                <div className="col-md-8">
                  <select className="custom-select" id="category">
                    <option>Select Category</option>

                    {
                      drpData.data ? (
                        drpData.data.map((o, i) => (
                          <option id={o.id} key={o.id}>
                            {" "}
                            {o.name}{" "}
                          </option>
                        ))
                      ) : (
                          <option value="2">Select 2</option>
                        )

                    }
                  </select>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-md-2">Updates & trends Content : </div>
                <div className="col-md-8">
                  <textarea type="text" wrap="on" className="form-control" id="content" rows="3" placeholder="Updates & trends Content" onChange={this.handleChange}></textarea>

                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-md-2">Updates & trends Author : </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control "
                    disabled={true}
                    id="author"
                    placeholder="Updates & trends Author"
                    value={adminName ? adminName : "Loading..."}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br />
              <br />

              {/* <img src="" height="200" id="image-box" alt="Hello" /> */}

              <div className="row">
                <div className="col-md-2">Upload Image : </div>
                <div className="col-md-8">
                  <input
                    type="file"
                    accept="image/*"
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
                  <button
                    className="mb-2 btn btn-primary mr-2 col-md-12 glyphicons glyphicons-star"
                    disabled={this.state.isLoading ? true : false}
                  >
                    {this.state.isLoading ? (
                      <span>
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        Creating Updates & trends...
                      </span>
                    ) : (
                        "Create Updates & trends"
                      )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Preloader>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Map props", state)
  const { projectMessage, projectData, status } = state.project;
  return {
    projectMessage,
    projectData,
    status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNews: updates & trends => {
      return new Promise(resolve => {
        dispatch(
          createUpdates & trends(updates & trends, res => {
            resolve(res);
          })
        );
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUpdates & trends);
