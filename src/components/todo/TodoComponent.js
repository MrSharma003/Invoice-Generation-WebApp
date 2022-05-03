import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik, useField, useFormikContext} from "formik";
import ToDodataService from "../../api/todo/ToDodataService";
import AuthenticationService from "./AuthenticationService";


const MyField = (props) => {
    const {
        values: { value, quantity },
        touched: {quantity: quantity1, value: value1},
        setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    React.useEffect(() => {
        // set the value of textC, based on textA and textB
        if (
            value!== 0 &&
            quantity!== 0 &&
            value1 &&
            quantity1
        ) {
            setFieldValue(props.name, value*quantity);
        }
    }, [value, quantity, value1, quantity1, setFieldValue, props.name]);

    return (
        <>
            <input {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};


class TodoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            description: '',
            value: '',
            quantity:'',
            amount: 0
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

        if(values.value<=0){
            errors.value = 'Enter a valid'
        }
        // console.log(values)
        return errors
    }
    // addTodo(values){
    //     console.log(values)
    //     let username = AuthenticationService.getLoggedInUsername()
    //     ToDodataService.createToDo(username,{
    //         username: username,
    //         description: values.description,
    //         value: values.value,
    //         quantity: values.quantity,
    //         amount: values.amount
    //     }).then( () => alert("reached add todo"))
    // }
    handleOnSubmit(values){
        console.log(values)
        let username = AuthenticationService.getLoggedInUsername()
        alert(this.props.params.id)
        if(this.props.params.id === -1){
            console.log("reached")
            ToDodataService.createToDo(username,{
                username: username,
                description: values.description,
                value: values.value,
                quantity: values.quantity,
                amount: values.amount
            }).then( () => this.props.navigate("/todos"))
        }
        else{
            ToDodataService.updateToDo(username,this.state.id,{
                id: this.state.id,
                description: values.description,
                value: values.value,
                quantity: values.quantity,
                amount: values.amount
            }).then( () => this.props.navigate("/todos") )
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
                value: response.data.value,
                quantity: response.data.quantity,
                amount: response.data.amount
            }))
    }

    render() {

        // let description = this.state.description
        // let targetdate = this.state.targetdate
        return (
            <div>
                <h1>Add New Bills</h1>
                <div className="container">
                   <Formik
                       initialValues={{
                           //one parenthisis indicates javascripts and other indicates object
                           //key:value
                           description : this.state.description,
                           value: this.state.value,
                           quantity: this.state.quantity,
                           amount: this.state.amount
                       }}
                       validateOnChange={this.onChange}
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
                                       <Field className="form-control" type="text" placeholder="Item Name" name="description"/>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <Field className="form-control" type="text" placeholder="Value" name="value"/>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <Field className="form-control" type="text" placeholder="Quantity" name="quantity"/>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <MyField className="form-control" type="text" placeholder="Amount" name="amount"/>
                                   </fieldset>
                                   <button className="btn btn-success" type="button">Save</button>
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