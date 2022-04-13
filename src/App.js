import React, { Component } from 'react';
import './App.css';
import Counter from "./components/counter/Counter";
import ToDoApp from "./components/todo/ToDoApp";
 
class App extends Component {
  render() {
    return (
        <div className="App">
          {/*<Counter/>*/}
          <ToDoApp/>
        </div>
    );
  }
}


export default App;