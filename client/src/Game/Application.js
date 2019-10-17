import React, {Component} from 'react';
import Welcome from './Welcome';
import Main from './Main';

class Application extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div id="main" style={{backgroundColor: 'gray'}}>
                <h4>From the Spaghetti Coders:</h4>
                <Welcome/>
                <Main/>
            </div>
        )
    }
}

export default Application