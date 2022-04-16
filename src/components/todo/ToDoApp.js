import React, {Component} from 'react';
import WelCome from "./WelCome";
import {BrowserRouter as Router, Route, Routes,Link} from "react-router-dom";
import withNavigation from "./WithNavigation";
import ErrorComponent from "./ErrorComponent";
import withParams from "./WithParams";
import ListTodoComponent from "./ListTodoComponent";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent"
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";


class ToDoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeWithparams = withParams(WelCome);
        const ErrorComponentWithNavigation = withNavigation(ErrorComponent);
        const ListTodoComponentWithNavigation = withNavigation(ListTodoComponent);
        const LogoutComponentWithNavigation = withNavigation(LogoutComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

        return (
            <div className="ToDoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/login" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute>
                                <WelcomeWithparams/>
                            </AuthenticatedRoute>}/>

                        <Route path="*" element={
                                <AuthenticatedRoute>
                                    <ErrorComponentWithNavigation/>
                                </AuthenticatedRoute>}/>

                        <Route path="/todos" element={
                                <AuthenticatedRoute>
                                    <ListTodoComponentWithNavigation/>
                                </AuthenticatedRoute>}/>

                        <Route path="/logout" element={
                                <AuthenticatedRoute>
                                     <LogoutComponentWithNavigation/>
                                </AuthenticatedRoute>}/>

                    </Routes>
                    <FooterComponent/>
                </Router>
                {/*<LoginComponent/>*/}
                {/*<WelCome/>*/}
            </div>
        );
    }
}

export default ToDoApp;