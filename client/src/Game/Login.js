import React, {Component} from 'react';
import {Button, Input} from "reactstrap";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            password: ""
        };

        this.login = this.login.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    login() {
        if(this.validateCredentials()) {
            //TODO: Render the home page
        }
        else{
            //TODO: Display an error message that the credentials are incorrect
        }
    }

    validateCredentials() {
        //TODO: Hash given password
        //TODO: Communicate with backend to confirm correct username/password combination
        return true;
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