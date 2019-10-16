import React, {Component} from 'react';

class Application extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div id="main" style={{backgroundColor: 'gray'}}>
                <h4>The Spaghetti Coder roll call!</h4>
                <h5>EJ!</h5>
                <h5>Jeff!</h5>
                <h5>John!</h5>
                <h5>Sam!</h5>
                <h5>Vlad!</h5>
            </div>
        )
    }
}

export default Application