import React, {Component} from 'react';
import Welcome from './Welcome';
import Main from './Main';

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false
        }
    }



    render() {
        if(this.state.login) {
            return (
                <div id="main" style={{backgroundColor: 'gray'}}>
                    <Main/>
                </div>
            );
        }

        return (
            <div id="main" style={{backgroundColor: 'gray'}}>
                <h4>From the Spaghetti Coders:</h4>
                <Welcome/>
            </div>
        )
    }
}

export default Application