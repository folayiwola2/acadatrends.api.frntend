import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { resetUserPassword } from '../store/actions/authActions'
import Logo from '../../components/style/images/logo-acada-black.svg';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert'
import '../style/signIn.css';


class UserResetPassword extends Component {


    componentDidMount() {
        this.setState({ token: this.props.match.params.id })
    }

    state = { password: "", c_password: "", isLoading: false, token: "" }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let { password, c_password, token } = this.state;
        if (password !== c_password) {
            return swal("Response", "Passwords do not match! Please try again...", "error");
        } else {
            this.setState({ isLoading: true })
            let obj = { password, token }
            await this.props.resetUserPassword(obj)
            if (this.props.status === "Success") {
                this.setState({ isLoading: false, password: "", c_password: "", token })
                return swal("Response", "Password updated Successful...", "success");
            } else {
                return swal("Response", "An error occurred, please retry", "error");
            }
        }

    }

    render() {
        let { password, c_password } = this.state;
        return (
            <div className="main-content-container container-fluid px-4" style={{ height: "100vh" }}>
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4">
                    <div className="d-flex justify-content-center w-100 text-center mb-0">
                        <img id="main-logo" className="d-inline-block align-top mr-1" style={{ maxWidth: "177px" }} src={Logo} alt="Shards Dashboard" />
                    </div>
                </div>


                <div className="">
                    <div className="container" style={{
                        background: "white", height: "85vh", display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>

                        <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Enter your new Account details</p>
                        <form className="form-group" autocomplete="off"
                            onSubmit={this.handleSubmit}>
                            <div className="row my-4">
                                <div className="col-md-2">Password: </div>
                                <div className="col-md-8">
                                    <input type="password" className="form-control"
                                        value={password} id="password" autocomplete="false"
                                        placeholder="password" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-md-2">Confirm Password: </div>
                                <div className="col-md-8">
                                    <input type="password" className="form-control" autoComplete="false"
                                        value={c_password} id="c_password" placeholder="Confirm Password"
                                        onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-md-2"> </div>
                                <div className="col-md-8">
                                    <button className="mb-2 btn btn-primary mr-2 col-md-12 glyphicons glyphicons-star"
                                        disabled={this.state.isLoading ? true : false}>
                                        {this.state.isLoading ?
                                            <span>
                                                <span className="spinner-grow spinner-grow-sm" role="status"
                                                    aria-hidden="true"></span> Loading...</span> : "Update Password"}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("down state", state)
    const { authMessage, registerData, status } = state.auth;
    return {
        authMessage,
        registerData,
        status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetUserPassword: (user) => {
            return new Promise((resolve) => {
                dispatch(resetUserPassword(user, function (res) {
                    resolve(res);
                }))
            })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserResetPassword))

