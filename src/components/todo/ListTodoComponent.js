import React, {Component} from 'react';
import ToDodataService from "../../api/todo/ToDodataService";
import AuthenticationService from "./AuthenticationService";
import moment from 'moment'
import {resetFirstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";

class ListTodoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : [
                // {id: 1, description: 'Learn React', done: false, targetdate: new Date()},
                // {id: 2, description: 'How to Learn React', done: false, targetdate: new Date()},
                // {id: 3, description: 'Learn React fast', done: false, targetdate: new Date()}
            ],
            message: null
        }
        this.deleteTodoClicled = this.deleteTodoClicled.bind(this);
        this.updateTodoClicled = this.updateTodoClicled.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }

    componentDidMount() {
       this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUsername()
        ToDodataService.retrieveAllToDo(username)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        todos : response.data
                    })
                }
            )
    }

    deleteTodoClicled(id){
        let username = AuthenticationService.getLoggedInUsername()
        console.log(id + " "+ username)
        ToDodataService.deleteToDo(username,id)
            .then(response => {
                this.setState({message: `Delete of todo ${id} successful`});
                this.refreshTodos();
            })
    }

    updateTodoClicled(id){
        let username = AuthenticationService.getLoggedInUsername()
        console.log(id + " "+ username)
        ToDodataService.deleteToDo(username,id)
            .then(response => {
                this.setState({message: `Delete of todo ${id} successful`});
                this.refreshTodos();
            })
    }

    render() {
        return (
            <div>
                <h1>List Todo Component</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Done</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetdate).format('YYYY-MM-DD')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicled(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicled(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListTodoComponent;