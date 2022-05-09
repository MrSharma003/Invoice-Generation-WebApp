import React, {Component} from 'react';
import '../../Signup.css'
import ToDodataService from "../../api/todo/ToDodataService";
// import '/home/prashant/invoice/src/images'

class SignupComponent extends Component {

    handleChange(event){
        // console.log(event.target.value)
        this.setState(
            { [event.target.name]: event.target.value }
        )
    }

    LoginPage() {
        console.log('Login Clicked!');
        this.props.navigate(`/login`)
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.LoginPage = this.LoginPage.bind(this);
        this.register = this.register.bind(this);
    }

    //added register which returns id of user. Use it to get the services and bookings. pass it on to the next component
    register() {
        console.log('register button clicked');
        ToDodataService.createUser({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then(
            (response) => {
                alert(response.data);
                alert('Registered Successfully')
                this.props.navigate('/login')
                // console.log("Reached here")
            }
        ).catch(
            () => {
                alert('Error Registering. Try using different username or email');
                //this.props.navigate('/adminPage')

            }
        )
        //this.props.navigate('/servicesDetails')

    }

    render() {
        return (
            <div>
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign up</h2>
                                <form method="POST" className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" placeholder="Your Name" name="username" id="username"
                                               required value={this.state.username} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email" placeholder="Enter Email" name="email" id="email" required
                                               value={this.state.email} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" placeholder="Enter Password" name="password"
                                               value={this.state.password} onChange={this.handleChange}/>
                                    </div>
                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>*/}
                                    {/*    <input type="password" name="re_pass" id="re_pass"*/}
                                    {/*           placeholder="Repeat your password"/>*/}
                                    {/*</div>*/}


                                    <div className="form-group form-button">
                                        <input type="button" name="signup" id="signup" onClick={this.register}
                                               className="form-submit"
                                               value="Register"/>
                                        {/*<button type="button" className="registerbtn" onClick={this.register}>Register</button>*/}
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                                <img src="images/signup-image.jpg" alt="sing up image"/>
                                <a href="#" className="signup-image-link" onClick={this.LoginPage}>I am already member</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SignupComponent;