import React, {Component} from 'react';

class ListTodoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : [
                {id: 1, description: 'Learn React', done: false, targetdate: new Date()},
                {id: 2, description: 'How to Learn React', done: false, targetdate: new Date()},
                {id: 3, description: 'Learn React fast', done: false, targetdate: new Date()}
            ]
        }
    }

    render() {
        return (
            <div>
                <h1>List Todo Component</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetdate.toString()}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListTodoComponent;