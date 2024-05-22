import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { signUp } from "../store/actions/authActions";
import swal from "sweetalert";
import "../style/signIn.css";

class SignUp extends Component {
  componentDidMount() {
    let local = localStorage.getItem("admin");
    if (local) return <Redirect to="/admin/" />
    else return <Redirect to="/admin/login" />
  }
  state = {
    firstname: "",
    othernames: "",
    email: "",
    phone: "",
    password: "",
    image: "",
    isLoading: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    //  console.log(this.state)
  };

  handleSubmit = async e => {
    e.preventDefault();
    // console.log("Isloading", this.state.isLoading);
    this.setState({ isLoading: true });
    let regDetails = this.state;
    let firstname = regDetails.firstname,
      othernames = regDetails.othernames,
      email = regDetails.email,
      phone = regDetails.phone,
      image = regDetails.image,
      password = regDetails.password;

    let obj = { firstname, othernames, email, phone, image, password };
    // console.log("Objects", obj);
    await this.props.signUp(obj);
    let props = this.props;
    // console.log("props", props);
    if (props.status === "Success") {
      swal("Response", "Registration Successful...", "success");
      this.props.history.push("/admin");
    } else {
      this.setState({ isLoading: false });
      return swal("Response", "Registration failed... Please try Again!", "error");
    }
  };

  handleResetPassword = async (e) => {
    this.setState({ isResetLoading: true })
    e.preventDefault();
    // console.log(this.state.resetEmail)
  }

  previewFile = () => {
    var preview = document.getElementById("image-box");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result;
        // let imgStr = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        let imgStr = reader.result
        this.setState({ image: imgStr });
        // console.log("My file result", imgStr);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {

    return (
      <div
        className="main-content-container container-fluid px-4"
        style={{ background: "" }}
      >
        {/* <!-- Page Header --> */}
        <div
          className="page-header row no-gutters py-4"
          style={{ height: "0px" }}
        >
          <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
            <h6 className="page-title">Admin Registration</h6>
          </div>
        </div>
        <br />

        <div
          className="container"
          style={{ background: "white", height: "auto" }}
        >
          <br />
          <p className="" style={{ textAlign: "center", fontSize: "25px" }}>
            Register
          </p>
          <form className="form-group" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-2">First Name : </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="First Name"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-2">Other Names : </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  id="othernames"
                  placeholder="Other Names"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-2">Email : </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="name@email.com"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-2">Phone Number : </div>
              <div className="col-md-8">
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="phone"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-2">Password : </div>
              <div className="col-md-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="*************"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />
            <br />
            {/* 
                        <img src="" height="200" id="image-box" alt="img" /> */}

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
                      Registering User...
                    </span>
                  ) : (
                      "Register"
                    )}
                </button><br /> <br />
                <div className="row">
                  <div className="col-md-6">Already have an  <b>Admin</b> account?  <Link to='/admin/login'>  Sign In</Link></div>
                  <div className="col-md-6">Forget Password?    <b style={{ textDecoration: "underline", color: "royalblue", cursor: "pointer" }} data-toggle="modal" data-target="#exampleModal">Reset here</b> </div>
                </div>

              </div>
            </div>
          </form>
        </div>


        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center" id="exampleModalLabel">Enter your email</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <div htmlFor="recipient-name" className="alert alert-info text-center" role="alert">You will receive a confirmation mail after sending
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <input type="text" className="form-control" id="resetEmail" placeholder="example@gmail.com" onChange={this.handleChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.handleResetPassword}>
                  {this.state.isResetLoading ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Sending...</span> : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { authMessage, registerData, status } = state.auth;
  return {
    authMessage,
    registerData,
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: admin => {
      return new Promise(resolve => {
        dispatch(
          signUp(admin, res => {
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
)(SignUp);

