import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {

    //passing props as parameter id good practise
    constructor(props) {
        super(props);
        this.state = {
            username: 'prashant',
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
        console.log(this.state);
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
        if(this.state.username === 'prashant' && this.state.password === 'dummy'){
            console.log('Successful')
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.navigate(`/welcome/${this.state.username}`)
            this.setState({showSuccessMessage: true,
                hasLoginFailed: false})
        }
        else{
            console.log('failed')
            this.setState({
                showSuccessMessage: false,
                hasLoginFailed: true
            })
        }

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
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClick}>Login</button>
                </div>
            </div>
        );
    }
}

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div className="alert alert-warning">Invalid Credentials</div>
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