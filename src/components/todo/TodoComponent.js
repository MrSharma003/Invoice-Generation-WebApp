import React, {Component} from 'react';
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ToDodataService from "../../api/todo/ToDodataService";
import AuthenticationService from "./AuthenticationService";
class TodoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            description: 'Learn forms',
            targetdate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.checkValidation = this.checkValidation.bind(this)
    }

    checkValidation(values){
        let errors = {}
        if(!values.description){
            errors.description = 'Enter a Description'
        }
        else if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters'
        }

        if(!moment(values.targetdate).isValid()){
            errors.targetdate = 'Enter a valid'
        }
        // console.log(values)
        return errors
    }

    handleOnSubmit(values){
        //console.log(values)
        let username = AuthenticationService.getLoggedInUsername()

        if(this.state.id === -1){
            ToDodataService.createToDo(username,{
                id: this.state.id,
                description: values.description,
                targetdate: values.targetdate
            }).then( () => this.props.navigate('/todos'))
        }
        else{
            ToDodataService.updateToDo(username,this.state.id,{
                id: this.state.id,
                description: values.description,
                targetdate: values.targetdate
            }).then( () => this.props.navigate('/todos'))
        }
    }

    componentDidMount() {

        if(this.state.id === -1){
            return
        }

        let username = AuthenticationService.getLoggedInUsername()
        ToDodataService.retrieveToDo(username,this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetdate: response.data.targetdate
            }))
    }

    render() {
        // let description = this.state.description
        // let targetdate = this.state.targetdate
        return (
            <div>
                <h1>To DO</h1>
                <div className="container">
                   <Formik
                       initialValues={{
                           //one parenthisis indicates javascripts and other indicates object
                           //key:value
                           description : this.state.description,
                           targetdate: this.state.targetdate
                       }}
                       validate={this.checkValidation}
                       onSubmit={this.handleOnSubmit}
                       enableReinitialize={true}
                   >
                       {
                           (props) => (
                               <Form>
                                   <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                   <ErrorMessage name="targetdate" component="div" className="alert alert-warning"/>
                                   <fieldset className="form-group">
                                       <label>Description</label>
                                       <Field className="form-control" type="text" name="description"/>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <label>Target Date</label>
                                       <Field className="form-control" type="date" name="targetdate"/>
                                   </fieldset>
                                   <button className="btn btn-success" type="submit">Save</button>
                               </Form>
                           )
                       }
                   </Formik>

                </div>
            </div>
        );
    }
}

export default TodoComponent;