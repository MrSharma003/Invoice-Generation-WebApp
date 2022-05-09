import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import '../../login.css';
import {Link} from "react-router-dom";
import ToDodataService from "../../api/todo/ToDodataService";

class LoginComponent extends Component {

    //passing props as parameter id good practise
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        // this.handleUsername = this.handleUsername.bind(this)
        // this.handlePassword = this.handlePassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClick = this.loginClick.bind(this)
    }

    handleChange(event){
        //console.log(this.state);
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    // handleUsername(event){
    //     console.log(event.target.value);
    //     this.setState({
    //         username: event.target.value
    //     })
    // }
    //
    // handlePassword(event){
    //     console.log(event.target.value);
    //     this.setState({
    //         password: event.target.value
    //     })
    // }

    loginClick(){

        ToDodataService.checkLoginStatus(this.state.username, this.state.password).then(
            (response) => {
                if(response.data === false){
                    alert('Wrong username and password. Try Again');
                    this.setState({
                                showSuccessMessage: false,
                                hasLoginFailed: true
                            })
                }
                else{
                    alert('Login Details Correct')
                    this.props.navigate(`/welcome/${this.state.username}`)
                    // console.log(user_id)
                    AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                    this.setState({showSuccessMessage: true,
                                hasLoginFailed: false})
                }

            }
        )

        // if(this.state.username === 'prashant.sharma@iiitb.ac.in' && this.state.password === 'dummy'){
        //     console.log('Successful')
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     this.props.navigate(`/welcome/${this.state.username}`)
        //     this.setState({showSuccessMessage: true,
        //         hasLoginFailed: false})
        // }
        // else{
        //     console.log('failed')
        //     this.setState({
        //         showSuccessMessage: false,
        //         hasLoginFailed: true
        //     })
        // }

        // console.log(this.state)
    }
    
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                    {/*{this.state.hasLoginFailed && <div>Invalid Credentials</div>}*/}
                    <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>
                    {/*{this.state.showSuccessMessage && <div>Login Successful</div>}*/}
                    <section className="vh-100">
                        <div className="container-fluid h-custom">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-md-9 col-lg-6 col-xl-5">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        className="img-fluid" alt="Sample image"/>
                                </div>
                                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                    <form>
                                        <div
                                            className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                            <button type="button" className="btn btn-primary btn-floating mx-1">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>

                                            <button type="button" className="btn btn-primary btn-floating mx-1">
                                                <i className="fab fa-twitter"></i>
                                            </button>

                                            <button type="button" className="btn btn-primary btn-floating mx-1">
                                                <i className="fab fa-linkedin-in"></i>
                                            </button>
                                        </div>

                                        <div className="divider d-flex align-items-center my-4">
                                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3" name="username"
                                                   className="form-control form-control-lg"
                                                   placeholder="Enter a valid email address" value={this.state.username}
                                                   onChange={this.handleChange}/>
                                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                                        </div>


                                        <div className="form-outline mb-3">
                                            <input type="password" id="form3Example4" name="password"
                                                   className="form-control form-control-lg"
                                                   placeholder="Enter password" value={this.state.password}
                                                   onChange={this.handleChange}/>
                                            <label className="form-label" htmlFor="form3Example4">Password</label>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="form-check mb-0">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                       id="form2Example3"/>
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Remember me
                                                </label>
                                            </div>
                                            <a href="#!" className="text-body">Forgot password?</a>
                                        </div>

                                        <div className="text-center text-lg-start mt-4 pt-2">
                                            <button type="button" className="btn btn-primary btn-lg"
                                                    style={{padding_left: "2.5rem", padding_right: "2.5rem"}} onClick={this.loginClick}>Login
                                            </button>
                                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link
                                                to="/signup"
                                                className="link-danger">Register</Link></p>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div
                            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                            <div className="text-white mb-3 mb-md-0">
                                Copyright © 2020. All rights reserved.
                            </div>
                            <div>
                                <a href="#!" className="text-white me-4">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#!" className="text-white me-4">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#!" className="text-white me-4">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="#!" className="text-white">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div classnameName="alert alert-warning">Invalid Credentials</div>
    }
    return null
}
function ShowLoginSuccessMessage(props){
    if(props.showSuccessMessage){
        return <div>Login Successful</div>
    }
    return null
}

export default LoginComponent