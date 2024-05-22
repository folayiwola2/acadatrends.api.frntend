import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { Link } from 'react-router-dom';
import swal from 'sweetalert'
import '../style/signIn.css';
import ForgotPassword from './ForgotPassword'

class SignIn extends Component {


    componentDidMount() {

    }

    state = { email: "", password: "", isLoading: false, isResetLoading: false }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        // console.log(this.state)
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true })
        // console.log("my state", this.state)
        let loginDetails = this.state;
        let email = loginDetails.email, password = loginDetails.password;
        let obj = { email, password };
        await this.props.signIn(obj);

        let prop = this.props;
        if (prop.status === "Success") {
            this.setState({ isLoading: false })
            swal("Response", "Login Successful...", "success");
            this.props.history.push("/admin/");
        } else {
            this.setState({ isLoading: false })
            return swal("Response", "Login failed...", "error")
        }
    }
    handleResetPassword = async (e) => {
        this.setState({ isResetLoading: true })
        e.preventDefault();
        // console.log(this.state.resetEmail)
    }
    render() {
        return (
            <div className="main-content-container container-fluid px-4" >
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4" style={{ height: "0px" }}>
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h6 className="page-title">Admin Login</h6>
                    </div>
                </div><br />

                <div className="container" style={{ background: "white", height: "440px" }}><br /><br />
                    <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Login to your Account</p><br /><br />
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-2">Email: </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="email" placeholder="Email" onChange={this.handleChange} required />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Password: </div>
                            <div className="col-md-8">
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange} required />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2"> </div>
                            <div className="col-md-8">
                                <button className="mb-2 btn btn-primary mr-2 col-md-12 glyphicons glyphicons-star" disabled={this.state.isLoading ? true : false}>
                                    {this.state.isLoading ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...</span> : "Login"}
                                </button><br /><br />
                                <div className="row">
                                    {/* <div className="col-md-6">Not an <b>Admin</b> yet? <Link to='/admin/register'>Create an Account</Link></div> */}
                                    <div className="col-md-6">Forget Password?    <b style={{ textDecoration: "underline", color: "royalblue", cursor: "pointer" }} data-toggle="modal" data-target="#exampleModal">Reset here</b> </div>
                                </div>
                                <div></div>
                            </div>
                        </div><br /><br />
                    </form>

                </div>
                <ForgotPassword />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("down state", state)
    // this.setState({ propStatus: state })
    const { authMessage, registerData, status } = state.auth;
    return {
        authMessage,
        registerData,
        status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (admin) => {
            return new Promise((resolve) => {
                dispatch(signIn(admin, function (res) {
                    resolve(res);
                }))
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)