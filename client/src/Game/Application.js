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
            let state = this.state;
            state.login = loggedIn;
            state.profile.nickname = nickname;
            this.setState(state);
        }

    }

    render() {
        if(this.state.login) {
            return (
                <div id="main">
                    <Main nickname={this.state.profile.nickname}/>
                </div>
            );
        }

        return (
            <div id="main" style={{margin: '50 0 0 0'}}>
                <h4 style={{color: "black"}}>From the Spaghetti Coders:</h4>
                <Welcome
                updateLogin={this.updateLogin}/>
            </div>
        )//In case we want more space at the top: style={{margin: '50 0 0 0'}}
    }
}

export default Application;