import React, {Component} from 'react';
import moment from "moment";
import {Field, Form, Formik} from "formik";

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

    handleOnSubmit(values){
        console.log(values)
    }

    checkValidation(values){
        let errors = {}
        console.log(values)
        return errors
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
                       onSubmit={this.handleOnSubmit}
                       validate={this.checkValidation}
                   >
                       {
                           (props) => (
                               <Form>
                                   <fieldset className="form-group">
                                       <label>Description</label>
                                       <Field className="form-control" type="text" name="description"/>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <label>Target Date</label>
                                       <Field className="form-control" type="date" name="targetDate"/>
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