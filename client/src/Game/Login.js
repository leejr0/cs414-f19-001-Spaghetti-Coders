import React, {Component} from 'react';
import {Button, Input} from "reactstrap";

import {get, request} from '../api/api'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginInfo: {
                nickname: "",
                password: ""
            }
        };

        this.login = this.login.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    login() {
        if(this.validateCredentials()) {
            this.props.updateLogin(true);
        }
        else{
            //TODO: Display an error message that the credentials are incorrect
        }
    }

    validateCredentials() {
        //TODO: Hash given password
        //TODO: Communicate with backend to confirm correct username/password combination
        let result = false;
        request(this.state.loginInfo, "login").then(serverResponse => {
            result = serverResponse["validation"];
        });

        return result;
    }

    updateValue(id, value) {
        let state = this.state;
        state[id] = value;
        this.setState({state});
    }

    render() {
        return (
            <div id="Register">
                <h5>Login and continue playing!</h5>
                <Input type="text" placeholder="username" onChange={(input) => this.updateValue("nickname", input.target.value)}/>
                <Input type="password" placeholder="password" onChange={(input) => this.updateValue("password", input.target.value)}/>
                <Button onClick={this.login}>Login</Button>
            </div>
        );
    }
}

export default Login;