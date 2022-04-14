import React, {Component} from 'react';
import WelCome from "./WelCome";
import {BrowserRouter as Router, Route, Routes,Link} from "react-router-dom";
import withNavigation from "./WithNavigation";
import ErrorComponent from "./ErrorComponent";
import withParams from "./WithParams";
import ListTodoComponent from "./ListTodoComponent";

class ToDoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeWithparams = withParams(WelCome);
        const ErrorComponentWithNavigation = withNavigation(ErrorComponent);
        const ListTodoComponentWithNavigation = withNavigation(ListTodoComponent);
        const LogoutComponentWithNavigation = withNavigation(LogoutComponent);

        return (
            <div className="ToDoApp">
                <Router>
                    <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/login" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/welcome/:name" element={<WelcomeWithparams/>}/>
                        <Route path="*" element={<ErrorComponentWithNavigation/>}/>
                        <Route path="/todos" element={<ListTodoComponentWithNavigation/>}/>
                        <Route path="/logout" element={<LogoutComponentWithNavigation/>}/>
                    </Routes>
                    <FooterComponent/>
                </Router>
                {/*<LoginComponent/>*/}
                {/*<WelCome/>*/}
            </div>
        );
    }
}

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
                <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                {/*{this.state.hasLoginFailed && <div>Invalid Credentials</div>}*/}
                <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>
                {/*{this.state.showSuccessMessage && <div>Login Successful</div>}*/}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClick}>Login</button>
            </div>
        );
    }
}

class HeaderComponent extends Component{
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a className="navbar-brand" href="http://www.in28minutes.com">In 28 Minutes</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/welcome/prashant">Home</Link></li>
                        <li><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

class FooterComponent extends Component{
    render() {
        return(
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2022 @in28minutes</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render() {
        return(
            <div>
                <h1>You are logged out.</h1>
                <div className="container">
                    Thank you for using our application.
                </div>
            </div>
        )
    }
}

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div>Invalid Credentials</div>
    }
    return null
}
function ShowLoginSuccessMessage(props){
    if(props.showSuccessMessage){
        return <div>Login Successful</div>
    }
    return null
}

export default ToDoApp;