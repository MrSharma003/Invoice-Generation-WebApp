import React, {Component} from 'react';
import {Link} from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";
class WelCome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            welcomeMessage : ""
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.params.name}. You can manage your payments <Link to="/todos">here</Link>
                </div>
                {/*<div className="container">*/}
                {/*    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>*/}
                {/*</div>*/}
                {/*<div className="container">*/}
                {/*   <h1> Message:  {this.state.welcomeMessage}</h1>*/}
                {/*</div>*/}
            </>
        );
    }

    retrieveWelcomeMessage(){
        console.log('retrieve click')
        // HelloWorldService.executeHelloWorldService()
        //     .then(response => this.handleSuccessfulResponse(response)) //if succeed
        //     .catch() //if fails

        // HelloWorldService.executeHelloWorldBeanService()
        //     .then(response => this.handleSuccessfulResponse(response))
        //     .catch()

        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch()
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