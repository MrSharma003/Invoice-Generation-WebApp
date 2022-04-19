import React, {Component} from 'react';
import {Link} from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";
import {logDOM} from "@testing-library/react";
class WelCome extends Component {

    constructor(props) {
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click her to get a customised welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        );
    }

    retrieveWelcomeMessage(){
        // console.log('retrive click')
        // HelloWorldService.executeHelloWorldService()
        //     .then(response => this.handleSuccessfulResponse(response)) //if succeed
        //     .catch() //if fails

        HelloWorldService.executeHelloWorldBeanService()
            .then(response => this.handleSuccessfulResponse(response))
    }

    handleSuccessfulResponse(response){
        console.log(response)
        this.setState({
            welcomeMessage: response.data.message
        })
        console.log(this.state.welcomeMessage)
    }
}

export default WelCome;