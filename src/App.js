import React, { Component } from 'react';
import './App.css';
import ToDoApp from "./components/todo/ToDoApp";
 
class App extends Component {
  render() {
    return (
        <div className="App">
          <ToDoApp/>
        </div>
    );
  }
}


export default App;