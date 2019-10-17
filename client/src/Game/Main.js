import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false
        }
    }

    render() {
        if(!this.state.display) {
            return (<h5></h5>);
        }

        return (
            <h5>This is the home page.</h5>
        );
    }
}

export default Main;