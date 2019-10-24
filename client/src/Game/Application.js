import React, {Component} from 'react';
import Welcome from './Welcome';
import Main from './Main';

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false,
            profile: {
                nickname: ""
            }
        };

        this.updateLogin = this.updateLogin.bind(this);
    }

    updateLogin(loggedIn){
        if (this.state.login !== loggedIn) {
            this.setState({login: loggedIn});
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
                <Welcome
                updateLogin={this.updateLogin}/>
            </div>

        )
    }
}

export default Application