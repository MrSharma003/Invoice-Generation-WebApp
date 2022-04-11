import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './Counter.css'


class Counter extends Component {

    //state shold be initialised inside constructor
    constructor() {
        super();
        this.state={
            counter: 0
        }
        //to increment the counter variable we need to bind constructor and increment()
        //then only class can update the value of this.state.counter
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    // increment(by1) {
    //     console.log(`increment from child - ${by1}`);
    //     this.setState({
    //         counter: this.state.counter + by1
    //     });
    // }

    //Arrow Function
    increment(by1) {
        console.log(`increment from child - ${by1}`);
        this.setState(
            (prevState)=>{
            return {counter: prevState.counter + by1}
        });
    }

    decrement(by1) {
        console.log(`increment from child - ${by1}`);
        this.setState(
            (prevState)=>{
                return {counter: prevState.counter - by1}
            });
    }

    reset() {
        console.log('reset');
        this.setState(
            ()=>{
                return {counter: 0}
            });
    }


    render() {
        return (
            <div className="counter">
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <span className="count">{this.state.counter}</span>
                <div>
                    <button className="reset" onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Counter;


class CounterButton extends Component{
    //state shold be initialised inside constructor
    constructor() {
        super();
        this.state={
            counter: 0
        }
        //to increment the counter variable we need to bind constructor and increment()
        //then only class can increase the value of this.state.counter
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

        increment() {
            console.log('increment');
            // this.setState({
            //     counter: this.state.counter + this.props.by
            // });
            this.props.incrementMethod(this.props.by);
            }

    decrement() {
        console.log('decrement');
        // this.setState({
        //     counter: this.state.counter - this.props.by
        // });
        this.props.decrementMethod(this.props.by);
    }

    render() {
        return (
            <div className="count">
                <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>
            </div>
        );
    }
    }

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}
