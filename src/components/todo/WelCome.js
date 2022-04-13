import React, {Component} from 'react';

class WelCome extends Component {
    render() {
        return (
            <div>
                Welcome {this.props.params.name}
            </div>
        );
    }
}

export default WelCome;