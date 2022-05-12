import React, {Component} from 'react';
import ToDodataService from "../../api/todo/ToDodataService";
import AuthenticationService from "./AuthenticationService";
import {resetFirstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";
import {useParams} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";




class ListTodoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            total: 0,
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.onToken = this.onToken.bind(this);
    }

    componentDidMount() {
       this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUsername()
        ToDodataService.retrieveAllToDo(username)
            .then(
                response => {
                    console.log(response.data)
                    this.setState({
                        todos : response.data
                    })

                }
            )

    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername()
        //console.log(id + " "+ username)
        ToDodataService.deleteToDo(username,id)
            .then(response => {
                this.setState({message: `Delete of todo ${id} successful`});
                this.refreshTodos();
            })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        // console.log(nextProps)
        // console.log(nextState)
        return true
    }

    updateTodoClicked(id){
        //console.log('update' + id)
        this.props.navigate(`/todos/${id}`);
    }

    addTodoClicked(){
        //console.log('update' + id)
        this.props.navigate(`/todos/-1`);
    }

    getTotal() {
        let total = 0;
        const rowTotals = this.state.todos.map((row) => {
            return (row.value * row.quantity)
        });
        if (rowTotals.length > 0) {
            total = rowTotals.reduce((acc, val) => acc + val);
        }
        return total;
    }


    onToken = (token) => {
        console.log(token)
        axios.post("http://localhost:8081/jpa/users/payment/charge","",{
            headers: {
                token: token.id,
                amount : this.getTotal()*100
            },
        })
            .then(() => {
                alert('payment successful')
            })
            .catch(()=>{
                alert('Payment failed')
            })
    }

    render() {
        return (
            <div>
                <h1>Add Bills to pay</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <section className="vh-100" style={{background_color: "#eee"}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-20">
                            <div className="col col-lg-9 col-xl-7">
                                <div className="card rounded-3">
                                    <div className="card-body">
                                        <h4 className="text-center my-3 pb-3"></h4>
                                        <table className="table mb-4">
                                            <thead>
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Item Name</th>
                                                <th scope="col">Value</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.todos.map(
                                                    todo =>
                                                        <tr key={todo.id}>
                                                            <td>{todo.id}</td>
                                                            <td>{todo.description}</td>
                                                            <td>{todo.value}</td>
                                                            <td>{todo.quantity}</td>
                                                            <td>{todo.amount}</td>
                                                            <td>
                                                                <button className="btn btn-success"
                                                                        onClick={() => this.updateTodoClicked(todo.id)}>Update
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-warning"
                                                                        onClick={() => this.deleteTodoClicked(todo.id)}>Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                        <div>
                                            <button className="btn btn-success" onClick={this.addTodoClicked}>Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4>Total Amount: {this.getTotal()} </h4>
                                </div>
                                <div>
                                    <StripeCheckout amount={this.getTotal()*100}
                                                    label="Pay Now"
                                                    name="Billing"
                                                    billingAddress
                                                    shippingAddress
                                                    // description={Your total is ${price}}
                                                        panelLabel="Pay Now"
                                                        token={this.onToken}
                                                        stripeKey="pk_test_51KyWA6SElEIcYj8icDnFOds8yoTtZGDVNcyabc0R1bjcc7V6J5XXU6Bx6Xhko7rtV4OUTnQTfwdwPpg1YZl095Nr00gww3lO9o"
                                                        currency="USD"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ListTodoComponent;