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

    updateLogin(loggedIn, nickname){
        if (this.state.login !== loggedIn) {
            this.setState({login: loggedIn, profile:{nickname: nickname}});
        }

    }

    render() {
        if(this.state.login) {
            return (
                <div id="main">
                    <Main nickname={this.state.nickname}/>
                </div>
            );
        }

        return (
            <div id="main">
                <h4 style={{color: "white"}}>From the Spaghetti Coders:</h4>
                <Welcome
                updateLogin={this.updateLogin}/>
            </div>

        )
    }
}

export default Application